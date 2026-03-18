import {Entity, Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm'
import {VinculoSujetoOjeto} from '../automotores/vinculo-sujeto-objeto.entity'


@Entity('Sujeto')
export class Sujeto{
    @PrimaryGeneratedColumn()
    spo_id:number;
    @Column({length:11, unique:true})
    spo_cuit:string;
    @Column({length:160})
    spo_deniminacion:string
    @CreateDateColumn({type:'timestamptz'})
    created_at:Date
    @OneToMany(()=> VinculoSujetoOjeto,vinculo => vinculo.sujeto)
    vincullo: VinculoSujetoOjeto[];
}