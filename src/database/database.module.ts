import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import config from '../config'

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory:(configService: ConfigType<typeof config>)=>{
            const { 
                connection, 
                user, 
                password, 
                host, 
                port, 
                dbName 
            } = configService.mongo;
           return{
            uri: `${connection}://${host}`,
            user,
            pass: password,
            dbName,
            w: 'majority',
            retryWrites: true
           }
        },
        inject: [config.KEY],
    }),
    ],
    providers: [
        {
            provide: 'MONGO',
            useFactory: async ( configService: ConfigType<typeof config>) => {
                const { connection, user, password, host, port, dbName } = configService.mongo;
                const uri = `${connection}://${user}:${password}@${host}/?retryWrites=true&w=majority`;
                const client = new MongoClient(uri);
                await client.connect();
                const database = client.db(dbName);
                return database;
            },
            inject: [config.KEY]
        },
    ],
    exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}

