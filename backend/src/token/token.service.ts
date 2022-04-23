import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  async getTokens(): Promise<Token[]> {
    // return this.tokenRepository.find();
    const token = new Token();
    token.id = 1;
    token.name = 'One';
    token.date = '23-04-2022';
    token.time = '14:00';

    return [token];
  }
}
