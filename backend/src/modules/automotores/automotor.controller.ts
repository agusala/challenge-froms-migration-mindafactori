import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { AutomotoresService } from './automotor.service';

@Controller('api/automotores')
export class AutomotoresController {
  constructor(private readonly automotoresService: AutomotoresService) {}

  @Get()
  async findAll() {
    return this.automotoresService.findAll();
  }

  @Get(':dominio')
  async findByDominio(@Param('dominio') dominio: string) {
    return this.automotoresService.findByDominio(dominio);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAutomotorDto: any) {
    return this.automotoresService.create(createAutomotorDto);
  }

  @Put(':dominio')
  async update(@Param('dominio') dominio: string, @Body() updateAutomotorDto: any) {
    return this.automotoresService.update(dominio, updateAutomotorDto);
  }

  @Delete(':dominio')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('dominio') dominio: string) {
    return this.automotoresService.remove(dominio);
  }
}