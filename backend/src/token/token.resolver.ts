import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TokenService } from './token.service';
import { postTokenInput } from './dto/post.token.input';
import { updateTokenInput } from './dto/update.token.input';
import { reminderInput } from './dto/reminder.token.input';
import { Token } from './entities/token.entity';
import { DeleteResult } from 'typeorm';

@Resolver(() => Token)
export class TokenResolver {
  constructor(private tokenService: TokenService) {}

  @Query(() => [Token], { name: 'tokens' })
  getTokens(): Promise<Token[]> {
    return this.tokenService.getTokens();
  }

  @Query(() => Token, { name: 'token' })
  getToken(@Args('id', { type: () => Int }) id: number): Promise<Token> {
    return this.tokenService.getToken(id);
  }

  @Mutation(() => Token, { name: 'postToken' })
  postToken(@Args('postTokenInput') postInput: postTokenInput): Promise<Token> {
    return this.tokenService.postToken(postInput);
  }

  @Mutation(() => Token, { name: 'updateToken' })
  updateToken(
    @Args('updateTokenInput') updateInput: updateTokenInput,
  ): Promise<Token> {
    return this.tokenService.updateToken(updateInput.id, updateInput);
  }

  @Mutation(() => Token, { name: 'deleteToken' })
  deleteToken(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DeleteResult> {
    return this.tokenService.deleteToken(id);
  }

  @Mutation(() => Token, {
    name: 'setReminder',
    description: 'This resolves email reminder mutation.',
  })
  setReminder(@Args('reminderInput') input: reminderInput): Promise<Token> {
    return this.tokenService.setReminder(input.id, input);
  }
}
