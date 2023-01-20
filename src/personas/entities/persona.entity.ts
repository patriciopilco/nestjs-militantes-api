import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Type } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Habilidad } from './habilidad.entity';
import { Telefono } from './telefono.entity';

@Schema()
export class Persona extends Document {
    @Prop( { required: true } )
    identificacion:string;
    @Prop()
    nombres:string;
    @Prop()
    apellidos:string;
    @Prop()
    edad:number;
    @Prop( { type: Types.ObjectId, ref: Telefono.name} )
    telefono: Telefono | Types.ObjectId;

    @Prop(  { type: [ {type: Types.ObjectId, ref: Habilidad.name}]})
    habilidades: Types.Array<Habilidad>;
}

export const PersonaSchema = SchemaFactory.createForClass(Persona);