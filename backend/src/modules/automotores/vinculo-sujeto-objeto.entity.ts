import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjetoDeValor } from './objeto-de-valor.entity';
import { Sujeto } from '../sujetos/sujeto.entity';

@Entity('Vinculo_Sujeto_Objeto')
export class VinculoSujetoObjeto {
  @PrimaryGeneratedColumn({ name: 'vso_id' })
  vso_id: number;
  @Column({ name: 'vso_ovp_id' })
  vso_ovp_id: number;
  @Column({ name: 'vso_spo_id' })
  vso_spo_id: number;
  @Column({ name: 'vso_tipo_vinculo', length: 30, default: 'DUENO' })
  vso_tipo_vinculo: string;
  @Column({ name: 'vso_porcentaje', type: 'numeric', precision: 5, scale: 2, default: 100 })
  vso_porcentaje: number;
  @Column({ name: 'vso_responsable', length: 1, default: 'S' })
  vso_responsable: string;
  @Column({ name: 'vso_fecha_inicio', type: 'date', default: () => 'CURRENT_DATE' })
  vso_fecha_inicio: Date;
  @Column({ name: 'vso_fecha_fin', type: 'date', nullable: true })
  vso_fecha_fin: Date;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;
  @ManyToOne(() => ObjetoDeValor, objeto => objeto.vinculos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vso_ovp_id' })
  objetoDeValor: ObjetoDeValor;
  @ManyToOne(() => Sujeto, sujeto => sujeto.vinculos, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'vso_spo_id' })
  sujeto: Sujeto;
}