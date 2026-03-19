import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { Automotor } from './automotor.entity';
import { VinculoSujetoObjeto } from './vinculo-sujeto-objeto.entity';

@Entity('Objeto_De_Valor')
export class ObjetoDeValor {
  @PrimaryGeneratedColumn({ name: 'ovp_id' })
  ovp_id: number;
  @Column({ name: 'ovp_tipo', length: 30, default: 'AUTOMOTOR' })
  ovp_tipo: string;
  @Column({ name: 'ovp_codigo', length: 64, unique: true })
  ovp_codigo: string; 
 @Column({ name: 'ovp_descripcion', length: 240, nullable: true })
  ovp_descripcion: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;
  @OneToOne(() => Automotor, automotor => automotor.objetoDeValor)
  automotor: Automotor;
  @OneToMany(() => VinculoSujetoObjeto, vinculo => vinculo.objetoDeValor)
  vinculos: VinculoSujetoObjeto[];
}