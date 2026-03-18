import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn,OneToMany} from 'typeorm'
import {Automotor} from './automotor.entity'
import {VinvuloSujetoObjeto} from './vinculo-sujeto-objeto.entity'

@Entity('Objeto_De_Valor')
export class ObjetoDEValor{
    @PrimaryGeneratedColumn()
    ovp_id:number;
    @Column({length:30,default:'AUTOMOTOR'})
    ovp_tipo:string
    @Column({length:64, unique:true})
    ovp_codigo:string
    @Column({length:240, nullable:true})
    ovp_descripcion:string
    @CreateDateColumn({type:'timestamptz'})
    created_at:Date
    @UpdateDateColumn({type:'timestamptz'})
    update_at:Date
    @OneToMany(()=> Automotor, auto => auto.objeto)
    automotores:Automotor[]
    @OneToMany(()=>VinvuloSujetoObjeto, vinculo=> vinclo.objeto)
    vinculos: VinvuloSujetoObjeto    
}
