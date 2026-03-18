import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import {ObjetoDeValor} from './objeto-de-valor.entity'


@Entity('Automotores')
export class Automotor {
    @PrimaryGeneratedColumn()
    art_id:number 
    @ManyToOne(()=> ObjetoDeValor, { nullable: false, onDelete:'CASCADE'})
    @JoinColumn({name:'art_ovp_id'})
    objeto:ObjetoDeValor
    @Column({length:8, unique:true} )
    art_dominio:string
    @Column({length:25, nullable:true})
    art_numero_chasis:string;
    @Column({length:25,nullable:true})
    art_numero_motor:string
    @Column ({length:25, nullable:true})
    art_color:string
    @Column({type:'int'})
    art_fecha_fabricacion:number
    @CreateDateColumn({type:'timestamptz'})
    art_facha_alta_registro:Date
}