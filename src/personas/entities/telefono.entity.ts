import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose';

@Schema()
export class Telefono extends Document {
    @Prop( {required : true, unique: true} )
    numero: string;
}

export const TelefonoSchema = SchemaFactory.createForClass(Telefono);