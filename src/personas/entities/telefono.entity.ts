import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Persona } from './persona.entity'
import { Document } from 'mongoose';

@Schema()
export class Telefono extends Document {
    @Prop( {required : true, unique: true} )
    numero: string;
}

export const TelefonoSchema = SchemaFactory.createForClass(Telefono);