import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePersonaDto, FilterPersonaDto, UpdatePersonaDto } from '../dtos/personas.dtos';
import { PersonasService } from '../services/personas.service';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';
import { ApiOperation } from '@nestjs/swagger';

@Controller('personas')
export class PersonasController {

    constructor(
        private readonly personasService:PersonasService
    ){}

    @Get()
    @ApiOperation({ summary: 'Lista de Personas'})
    getAllPersons(@Query() params:FilterPersonaDto) {
        return this.personasService.findAll(params);
    }

    @Get(':identificacion')
    getByIdentificacion(@Param('identificacion') identificacion:string) {
        return this.personasService.findByIdentificacion(identificacion);
    }

    
    @Get(':identificacion/telefonos')
    getTelefonosByIdentificacion(@Param('identificacion') identificacion:string) {
        return this.personasService.getTelefonoByPersona(identificacion);
    }
    

    @Post()
    create(@Body() payload: CreatePersonaDto){
        return this.personasService.create(payload);
    }

    @Put(':id')
    update(@Param('id', MongoIdPipe) id:string, @Body() payload:UpdatePersonaDto){
        return this.personasService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.personasService.remove(id);
    }

    @Delete(':id/habilidad/:productId')
    removeHabilidad(@Param('id') id:string, @Param('productId') productId: string){
        return this.personasService.removeHabilidad(id,productId);
    }
}
