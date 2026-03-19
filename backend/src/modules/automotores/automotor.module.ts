import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Automotor } from './automotor.entity';
import { ObjetoDeValor } from './objeto-de-valor.entity';
import { VinculoSujetoObjeto } from './vinculo-sujeto-objeto.entity';
import { AutomotoresService } from './automotor.service';
import { AutomotoresController } from './automotor.controller';
import { SujetosModule } from '../sujetos/sujeto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Automotor, ObjetoDeValor, VinculoSujetoObjeto]),
    SujetosModule,
  ],
  controllers: [AutomotoresController],
  providers: [AutomotoresService],
})
export class AutomotoresModule {}