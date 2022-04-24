import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenResolver } from './token.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
// import { TokenController } from './token.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [TokenService, TokenResolver],
  // controllers: [TokenController],
})
export class TokenModule {}
