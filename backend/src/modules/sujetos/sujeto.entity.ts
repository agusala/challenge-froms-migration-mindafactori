import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { VinculoSujetoObjeto } from '../automotores/vinculo-sujeto-objeto.entity';

@Entity('Sujeto') 
export class Sujeto {
  @PrimaryGeneratedColumn({ name: 'spo_id' })
  spo_id: number;
  @Column({ name: 'spo_cuit', length: 11, unique: true })
  spo_cuit: string;
  @Column({ name: 'spo_denominacion', length: 160 })
  spo_denominacion: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;
  @OneToMany(() => VinculoSujetoObjeto, vinculo => vinculo.sujeto)
  vinculos: VinculoSujetoObjeto[];
}