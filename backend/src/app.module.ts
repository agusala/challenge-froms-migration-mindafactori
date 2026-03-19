import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomotoresModule } from './modules/automotores/automotor.module';
import { SujetosModule } from './modules/sujetos/sujeto.module';
@Module({
  imports:[
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        type:'postgres',
        host: configService.get('DB_HOST'),
          port:configService.get('DB_PORT'),
          username:configService.get('DB_USER'),
          password:configService.get('DB_PASSWORD'),
          database:configService.get('DB_NAME'),
          autoLoadEntities:true,
          synchronize:false,
          logging:true
        
      })
    }),
    AutomotoresModule,
    SujetosModule,
  ]
})
export class AppModule {}
