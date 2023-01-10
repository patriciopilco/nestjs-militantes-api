import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePersonaDto } from '../dtos/personas.dtos';
import { Contacto } from '../entities/contacto.entity';
import { Persona } from '../entities/persona.entity';
import { Telefono } from '../entities/telefono.entity';
import { TelefonosService } from './telefonos.service';

@Injectable()
export class PersonasService {

    constructor(
        @InjectModel(Persona.name) private personaModel: Model<Persona>,
        private telefonoService: TelefonosService,
        
    ) {}

    findAll(){
        return this.personaModel.find().populate('telefono').exec();
    }

    async findByIdentificacion(identificacion: string){
        const persona = await this.personaModel.find({identificacion : identificacion} ).populate('telefono');
        if(!persona){
            throw new NotFoundException(`Persona #${identificacion} not foun`);
        }
        return persona;
    }

    create(data: CreatePersonaDto) {
        const newPersona = new this.personaModel(data);
        return newPersona.save();
    }

    async getTelefonoByPersona(identificacion: string) {
        const persona = await this.personaModel.find({identificacion : identificacion} );
        const telefonos = this.telefonoService.getAll()
        return {
            persona,
            telefonos
        }
        
    }
}