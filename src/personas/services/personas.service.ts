import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { CreatePersonaDto, FilterPersonaDto, UpdatePersonaDto } from '../dtos/personas.dtos';
import { Persona } from '../entities/persona.entity';
import { TelefonosService } from './telefonos.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class PersonasService {

    constructor(
        @InjectModel(Persona.name) private personaModel: Model<Persona>,
        private telefonoService: TelefonosService,
        
    ) {}

    findAll(params?: FilterPersonaDto){
        if(params){
            const filters: FilterQuery<Persona> = {}
            const { limit, offset } = params;
            const { minEdad, maxEdad } = params;
            Logger.log(`${minEdad}`)
            Logger.log(`${maxEdad}`)
            if (minEdad && maxEdad) {
                filters.edad = { $gte: minEdad, $lte: maxEdad}
            }
            return this.personaModel.find(filters).populate('telefono').skip(offset).limit(limit).exec();
        }
        Logger.log('fdsfhdskjfhdskjfhdsjkfh')
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

    update(id: string, changes: UpdatePersonaDto){
        const persona = this.personaModel.findByIdAndUpdate(id, { $set: changes}, { new: true}).exec();        
        if (!persona) {
            throw new NotFoundException(`Persona #${id} not found`);
        }
        return persona;
    }

    remove(id: string) {
        return this.personaModel.findByIdAndRemove(id);
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
