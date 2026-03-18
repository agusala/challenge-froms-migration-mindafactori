import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ObjetoDeValor } from './objeto-de-valor.entity';
import { Sujeto } from '../sujetos/sujeto.entity';

@Entity('Vinculo_Sujeto_Objeto')
export class VinculoSujetoObjeto {
  @PrimaryGeneratedColumn()
  vso_id: number;
  @ManyToOne(() => ObjetoDeValor, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vso_ovp_id' })
  objeto: ObjetoDeValor;
  @ManyToOne(() => Sujeto, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'vso_spo_id' })
  sujeto: Sujeto;
  @Column({ length: 30, default: 'DUENO' })
  vso_tipo_vinculo: string;
  @Column({ type: 'numeric', precision: 5, scale: 2, default: 100 })
  vso_porcentaje: number;
  @Column({ length: 1, default: 'S' })
  vso_responsable: string;
  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  vso_fecha_inicio: Date;
  @Column({ type: 'date', nullable: true })
  vso_fecha_fin: Date;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}