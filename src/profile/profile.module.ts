import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtRemoteStrategy } from 'src/jwt/jwt.strategy';
import { ProfileController } from './profile.controller';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    ClientsModule.register([{
      name: 'AUTH_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://0.0.0.0:5672'],
        queue: 'user.auth',
        noAck: false,
        queueOptions: {
          durable: true
        }
      }
    }])
  ],
  controllers: [ProfileController],
  providers: [ProfileService, JwtRemoteStrategy],
  exports: [TypeOrmModule],
})
export class ProfileModule {}