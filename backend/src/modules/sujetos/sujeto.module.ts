import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sujeto } from './sujeto.entity';
import { SujetosService } from './sujeto.service';
import { SujetosController } from './sujeto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sujeto])], 
  providers: [SujetosService],
  controllers: [SujetosController],
  exports: [SujetosService],
})
export class SujetosModule {}