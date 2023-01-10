import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';
import { Telefono } from './telefono.entity';

@Schema()
export class Persona extends Document {
    @Prop( { required: true} )
    identificacion:string;
    @Prop()
    nombres:string;
    @Prop()
    apellidos:string;
    @Prop( { type: Types.ObjectId, ref: Telefono.name} )
    telefono: Telefono | Types.ObjectId;
}

export const PersonaSchema = SchemaFactory.createForClass(Persona);