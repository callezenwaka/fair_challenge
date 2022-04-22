import { Query } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';

@Resolver()
export class TokenResolver {
  @Query()
  findAll() {
    
  }
}
