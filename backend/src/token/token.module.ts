import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenResolver } from './token.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Token } from './entities/token.entity';
import { MailService } from '../mail/mail.service';
@Module({
  imports: [TypeOrmModule.forFeature([Token]), ScheduleModule.forRoot()],
  providers: [TokenService, TokenResolver, MailService],
})
export class TokenModule {}
