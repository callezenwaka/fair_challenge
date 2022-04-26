import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenResolver } from './token.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Token } from './entities/token.entity';
import { EmailResolver } from 'src/email/email.resolver';
import { EmailService } from 'src/email/email.service';
import { Email } from 'src/email/entities/email.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Token, Email]), ScheduleModule.forRoot()],
  providers: [TokenService, TokenResolver, EmailService, EmailResolver],
})
export class TokenModule {}
