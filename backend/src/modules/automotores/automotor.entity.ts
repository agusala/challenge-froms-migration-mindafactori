import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { ObjetoDeValor } from './objeto-de-valor.entity';

@Entity('Automotores')
export class Automotor {
  @PrimaryGeneratedColumn({ name: 'atr_id' })
  atr_id: number;
  @Column({ name: 'atr_ovp_id' })
  atr_ovp_id: number;
  @Column({ name: 'atr_dominio', length: 8, unique: true })
  atr_dominio: string;
  @Column({ name: 'atr_numero_chasis', length: 25, nullable: true })
  atr_numero_chasis: string;
  @Column({ name: 'atr_numero_motor', length: 25, nullable: true })
  atr_numero_motor: string;
  @Column({ name: 'atr_color', length: 40, nullable: true })
  atr_color: string;
  @Column({ name: 'atr_fecha_fabricacion', type: 'integer' })
  atr_fecha_fabricacion: number; // YYYYMM
  @Column({ name: 'atr_fecha_alta_registro', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  atr_fecha_alta_registro: Date;
  @OneToOne(() => ObjetoDeValor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'atr_ovp_id' })
  objetoDeValor: ObjetoDeValor;
}