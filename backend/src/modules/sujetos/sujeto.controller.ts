import { Controller, Get, Post, Body, Query, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { SujetosService } from './sujeto.service';
import { Sujeto } from './sujeto.entity';

@Controller('api/sujetos')
export class SujetosController {
  constructor(private readonly sujetosService: SujetosService) {}

  @Get('by-cuit')
  async findByCuit(@Query('cuit') cuit: string){
    return this.sujetosService.findByCuit(cuit);
    }

  @Post()
  async create(@Body() createSujetoDto: any) {
    console.log('body recibiido:',createSujetoDto);
    if (!createSujetoDto){
      throw new Error('body is undefined');
    }
    return this.sujetosService.create(createSujetoDto.cuit, createSujetoDto.denominacion);
  }
}