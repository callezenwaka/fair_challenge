import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TokenService } from './token.service';
import { postTokenInput } from './dto/post.token.input';
import { updateTokenInput } from './dto/update.token.input';
import { subscribeTokenInput } from './dto/subscribe.token.input';
import { Token } from './entities/token.entity';
// import { Subscription } from './interfaces/subscription.interface';
import { DeleteResult } from 'typeorm';

@Resolver(() => Token)
export class TokenResolver {
  constructor(private tokenService: TokenService) {}

  @Query(() => [Token], { name: 'getTokens' })
  getTokens(): Promise<Token[]> {
    return this.tokenService.getTokens();
  }

  @Query(() => Token, { name: 'getToken' })
  getToken(@Args('id', { type: () => Int }) id: number): Promise<Token> {
    return this.tokenService.getToken(id);
  }

  @Mutation(() => Token, { name: 'postToken' })
  postToken(
    @Args('postTokenInput') postTokenInput: postTokenInput,
  ): Promise<Token> {
    return this.tokenService.postToken(postTokenInput);
  }

  @Mutation(() => Token, { name: 'updateToken' })
  updateToken(
    @Args('updateTokenInput') updateTokenInput: updateTokenInput,
  ): Promise<Token> {
    return this.tokenService.updateToken(updateTokenInput.id, updateTokenInput);
  }

  @Mutation(() => Token, { name: 'deleteToken' })
  deleteToken(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DeleteResult> {
    return this.tokenService.deleteToken(id);
  }

  @Mutation(() => Token, { name: 'subscribeToken' })
  subscribeToken(
    @Args('subscribeTokenInput') subscribeTokenInput: subscribeTokenInput,
  ): Promise<Token> {
    return this.tokenService.subscribeToken(
      subscribeTokenInput.id,
      subscribeTokenInput,
    );
  }
}
