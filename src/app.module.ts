import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersonasModule } from './personas/personas.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
  }),
    PersonasModule, DatabaseModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
