import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true
    }),
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
          entites:[__dirname + '/**/*.entity{.ts,.js}'],
          synchronize:false,
          logging:true
        
      })
    })
  ]
})
export class AppModule {}
