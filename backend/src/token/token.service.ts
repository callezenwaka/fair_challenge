import { Injectable, NotFoundException } from '@nestjs/common';
import { Args, Int } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { postTokenInput } from './dto/post.token.input';
import { updateTokenInput } from './dto/update.token.input';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
  ) {}

  async getTokens(): Promise<Token[]> {
    return this.tokenRepository.find();
  }

  async getToken(@Args('id', { type: () => Int }) id: number): Promise<Token> {
    return this.tokenRepository.findOne(id);
  }

  async postToken(postTokenInput: postTokenInput): Promise<Token> {
    const token = this.tokenRepository.create(postTokenInput);
    return this.tokenRepository.save(token);
  }

  async updateToken(
    @Args('id', { type: () => Int }) id: number,
    updateTokenInput: updateTokenInput,
  ): Promise<Token> {
    const token = await this.getToken(id);
    if (token === undefined) {
      throw new NotFoundException();
    }
    await this.tokenRepository.save(updateTokenInput);
    return this.tokenRepository.findOne(id);
  }

  async deleteToken(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DeleteResult> {
    const token = await this.getToken(id);
    if (token === undefined) {
      throw new NotFoundException();
    }
    return this.tokenRepository.delete(id);
  }
}
