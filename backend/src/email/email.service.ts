import { Injectable } from '@nestjs/common';
import { Args, Int } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { postEmailInput } from './dto/post.email.input';
import { UpdateEmailInput } from './dto/update-email.input';
import { Email } from './entities/email.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email) private emailRepository: Repository<Email>,
  ) {}

  async postEmail(postEmailInput: postEmailInput): Promise<Email> {
    const email = await this.emailRepository.findOne({
      where: { address: postEmailInput.address },
    });
    if (email !== undefined) {
      return email;
    } else {
      const email = this.emailRepository.create(postEmailInput);
      return this.emailRepository.save(email);
    }
    // const email = this.emailRepository.create(postEmailInput);
    // return this.emailRepository.save(email);
  }

  async getEmails(): Promise<Email[]> {
    return this.emailRepository.find();
  }

  async getEmail(@Args('id', { type: () => Int }) id: number): Promise<Email> {
    return this.emailRepository.findOne(id, {
      relations: ['tokens'],
    });
  }

  update(id: number, updateEmailInput: UpdateEmailInput) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
