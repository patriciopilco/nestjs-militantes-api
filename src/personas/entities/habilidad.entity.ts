import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Habilidad extends Document {
    @Prop({ type:String })
    nombre: string;
}

export const HabilidadSchema = SchemaFactory.createForClass(Habilidad);