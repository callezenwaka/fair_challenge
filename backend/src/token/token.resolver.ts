import { Resolver, Query } from '@nestjs/graphql';
import { Token } from './entities/token.entity';
import { TokenService } from './token.service';

@Resolver(() => Token)
export class TokenResolver {
  constructor(private tokenService: TokenService) {}

  @Query(() => [Token], { name: 'getTokens' })
  findAll() {
    return this.tokenService.findAll();
  }
}
