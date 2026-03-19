import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sujeto } from './sujeto.entity';

@Injectable()
export class SujetosService {
  constructor(
    @InjectRepository(Sujeto)
    private sujetoRepository: Repository<Sujeto>,
  ) {}

  async findByCuit(cuit: string): Promise<Sujeto | null> {
    return this.sujetoRepository.findOne({ where: { spo_cuit: cuit } });
  }

  async create(cuit: string, denominacion: string): Promise<Sujeto> {
    const sujeto = this.sujetoRepository.create({ spo_cuit: cuit, spo_denominacion: denominacion });
    return this.sujetoRepository.save(sujeto);
  }
}