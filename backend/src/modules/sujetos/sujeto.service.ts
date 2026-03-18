import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sujeto } from './sujeto.entity';
import { validateCUIT } from '../../common/validators';

@Injectable()
export class SujetosService {
  constructor(
    @InjectRepository(Sujeto)
    private sujetoRepository: Repository<Sujeto>,
  ) {}

  async findByCuit(cuit: string): Promise<Sujeto | null> {
    return this.sujetoRepository.findOne({ where: { spo_cuit: cuit } });
  }

  async create(cuit: string, denominacion: string): Promise<Sujeto> {
    if (!validateCUIT(cuit)) {
      throw new ConflictException('CUIT inválido');
    }
    const existe = await this.findByCuit(cuit);
    if (existe) {
      throw new ConflictException('El CUIT ya existe');
    }
    const sujeto = this.sujetoRepository.create({ spo_cuit: cuit, spo_denominacion: denominacion });
    return this.sujetoRepository.save(sujeto);
  }
}