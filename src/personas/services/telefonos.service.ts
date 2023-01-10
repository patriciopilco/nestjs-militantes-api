import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Persona } from 'src/personas/entities/persona.entity';
import { Telefono } from 'src/personas/entities/telefono.entity';

@Injectable()
export class TelefonosService {

    constructor(
        @InjectModel(Telefono.name) private telefonoModel: Model<Telefono>
    ){}

    getAll(){
        this.telefonoModel.find().exec();
    }

    findByPersona(persona: Persona) {
        const telefono = this.telefonoModel.find({persona});
        if(!telefono){
            throw new NotFoundException(`telefono #${persona.identificacion} not found`);
        }
        return telefono;
    }

}
