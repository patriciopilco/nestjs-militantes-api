import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Persona, PersonaSchema } from './entities/persona.entity';
import { PersonasController } from './controllers/personas.controller';
import { PersonasService } from './services/personas.service';
import { TelefonosService } from './services/telefonos.service';
import { Telefono, TelefonoSchema } from './entities/telefono.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Persona.name,
        schema: PersonaSchema
      },
      {
        name: Telefono.name,
        schema: TelefonoSchema
      }
    ]
    )
  ],
  controllers: [PersonasController],
  providers: [PersonasService, TelefonosService],
})
export class PersonasModule {}
