import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePersonaDto } from '../dtos/personas.dtos';
import { PersonasService } from '../services/personas.service';

@Controller('personas')
export class PersonasController {

    constructor(
        private readonly personasService:PersonasService
    ){}

    @Get()
    getAllPersons() {
        return this.personasService.findAll();
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
}
