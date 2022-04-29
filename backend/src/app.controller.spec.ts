import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { TokenService } from './token/token.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, TokenModule, MailModule],
      controllers: [AppController],
      providers: [AppService, ConfigService, TokenService, MailService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
