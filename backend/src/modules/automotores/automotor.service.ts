import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Automotor } from './automotor.entity';
import { ObjetoDeValor } from './objeto-de-valor.entity';
import { VinculoSujetoObjeto } from './vinculo-sujeto-objeto.entity';
import { SujetosService } from '../sujetos/sujeto.service';
import { validateDominio, validateCUIT, validateFechaFabricacion } from '../../common/validators';

@Injectable()
export class AutomotoresService {
  constructor(
    @InjectRepository(Automotor)
    private automotorRepository: Repository<Automotor>,
    @InjectRepository(ObjetoDeValor)
    private objetoRepository: Repository<ObjetoDeValor>,
    @InjectRepository(VinculoSujetoObjeto)
    private vinculoRepository: Repository<VinculoSujetoObjeto>,
    private sujetosService: SujetosService,
    private dataSource: DataSource,
  ) {}

  async findAll() {
    // Usamos query builder para obtener dueño actual
    return this.automotorRepository
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.objeto', 'o')
      .leftJoin('o.vinculos', 'v', 'v.vso_responsable = :resp AND v.vso_fecha_fin IS NULL', { resp: 'S' })
      .leftJoinAndSelect('v.sujeto', 's')
      .select([
        'a.atr_dominio as dominio',
        'a.atr_numero_chasis as numero_chasis',
        'a.atr_numero_motor as numero_motor',
        'a.atr_color as color',
        'a.atr_fecha_fabricacion as fecha_fabricacion',
        's.spo_cuit as cuit_duenio',
        's.spo_denominacion as denominacion_dueno',
      ])
      .orderBy('a.atr_dominio')
      .getRawMany();
  }

  async findByDominio(dominio: string) {
    const automotor = await this.automotorRepository.findOne({
      where: { atr_dominio: dominio },
      relations: ['objeto', 'objeto.vinculos', 'objeto.vinculos.sujeto'],
    });
    if (!automotor) throw new NotFoundException('Automotor no encontrado');
    const vinculoActual = automotor.objeto.vinculos.find(v => v.vso_responsable === 'S' && !v.vso_fecha_fin);
    return {
      ...automotor,
      cuit_duenio: vinculoActual?.sujeto.spo_cuit,
      denominacion_dueno: vinculoActual?.sujeto.spo_denominacion,
    };
  }

  async create(data: any) {
    // Validaciones de negocio
    if (!validateDominio(data.dominio)) {
      throw new UnprocessableEntityException('Dominio inválido');
    }
    if (!validateFechaFabricacion(data.fecha_fabricacion)) {
      throw new UnprocessableEntityException('Fecha de fabricación inválida');
    }
    if (!validateCUIT(data.cuit_duenio)) {
      throw new UnprocessableEntityException('CUIT inválido');
    }
    const sujeto = await this.sujetosService.findByCuit(data.cuit_duenio);
    if (!sujeto) {
      throw new UnprocessableEntityException('No existe sujeto con ese CUIT');
    }

    // Usar transacción para asegurar consistencia
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Buscar o crear ObjetoDeValor
      let objeto = await queryRunner.manager.findOne(ObjetoDeValor, { where: { ovp_codigo: data.dominio } });
      if (!objeto) {
        objeto = queryRunner.manager.create(ObjetoDeValor, {
          ovp_tipo: 'AUTOMOTOR',
          ovp_codigo: data.dominio,
          ovp_descripcion: `Automotor ${data.dominio}`,
        });
        objeto = await queryRunner.manager.save(objeto);
      }

      // Buscar o crear Automotor
      let automotor = await queryRunner.manager.findOne(Automotor, { where: { atr_dominio: data.dominio } });
      if (!automotor) {
        automotor = queryRunner.manager.create(Automotor, {
          atr_dominio: data.dominio,
          atr_numero_chasis: data.numero_chasis,
          atr_numero_motor: data.numero_motor,
          atr_color: data.color,
          atr_fecha_fabricacion: data.fecha_fabricacion,
          objeto: objeto,
        });
      } else {
        // actualizar
        automotor.atr_numero_chasis = data.numero_chasis;
        automotor.atr_numero_motor = data.numero_motor;
        automotor.atr_color = data.color;
        automotor.atr_fecha_fabricacion = data.fecha_fabricacion;
      }
      automotor = await queryRunner.manager.save(automotor);

      // Cerrar vínculo anterior si existe
      await queryRunner.manager.update(
        VinculoSujetoObjeto,
        {
          objeto: { ovp_id: objeto.ovp_id },
          vso_responsable: 'S',
          vso_fecha_fin: null,
        },
        { vso_fecha_fin: new Date() },
      );

      // Crear nuevo vínculo
      const vinculo = queryRunner.manager.create(VinculoSujetoObjeto, {
        objeto,
        sujeto,
        vso_tipo_vinculo: 'DUENO',
        vso_porcentaje: 100,
        vso_responsable: 'S',
        vso_fecha_inicio: new Date(),
      });
      await queryRunner.manager.save(vinculo);

      await queryRunner.commitTransaction();
      return { message: 'Automotor guardado con dueño asignado' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async update(dominio: string, data: any) {
    // Similar a create, pero primero verifica que existe
    const existe = await this.automotorRepository.findOne({ where: { atr_dominio: dominio } });
    if (!existe) throw new NotFoundException('Automotor no encontrado');
    // Reutilizar create (porque hace upsert) pero podría refinar
    return this.create(data);
  }

  async remove(dominio: string) {
    const automotor = await this.automotorRepository.findOne({
      where: { atr_dominio: dominio },
      relations: ['objeto'],
    });
    if (!automotor) throw new NotFoundException('Automotor no encontrado');
    // Eliminar en cascada: las relaciones están con ON DELETE CASCADE, así que basta con eliminar el objeto
    await this.objetoRepository.delete(automotor.objeto.ovp_id);
    return { message: 'Automotor eliminado' };
  }
}