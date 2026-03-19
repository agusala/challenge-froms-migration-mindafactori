import { Controller, Get, Post, Body, Query, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { SujetosService } from './sujeto.service';
import { Sujeto } from './sujeto.entity';

@Controller('api/sujetos')
export class SujetosController {
  constructor(private readonly sujetosService: SujetosService) {}

  @Get('by-cuit')
  async findByCuit(@Query('cuit') cuit: string){
    const sujeto= await this.sujetosService.findByCuit(cuit);
    if(!sujeto){
      throw new NotFoundException('Sujeto no enciontrado') 
    }
    return sujeto;
    }

  @Post()
  async create(@Body() createSujetoDto: {cuit:string; denominacion:string}) {
    return this.sujetosService.create(createSujetoDto.cuit, createSujetoDto.denominacion);
  }
}