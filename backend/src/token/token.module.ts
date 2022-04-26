import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenResolver } from './token.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Token } from './entities/token.entity';
import { Email } from 'src/email/entities/email.entity';
import { EmailResolver } from 'src/email/email.resolver';
import { EmailService } from 'src/email/email.service';
import { MailService } from 'src/mail/mail.service';
@Module({
  imports: [TypeOrmModule.forFeature([Token, Email]), ScheduleModule.forRoot()],
  providers: [
    TokenService,
    TokenResolver,
    EmailService,
    EmailResolver,
    MailService,
  ],
})
export class TokenModule {}
