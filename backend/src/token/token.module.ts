import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenResolver } from './token.resolver';

@Module({
  providers: [TokenService, TokenResolver]
})
export class TokenModule {}
