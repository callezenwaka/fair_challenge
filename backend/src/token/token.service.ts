import { Injectable, NotFoundException } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Args, Int } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { postTokenInput } from './dto/post.token.input';
import { updateTokenInput } from './dto/update.token.input';
import { subscribeTokenInput } from './dto/subscribe.token.input';
import { Token } from './entities/token.entity';
import { Email } from 'src/email/entities/email.entity';
// import { Subscription } from './interfaces/subscription.interface';
@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    @InjectRepository(Email) private emailRepository: Repository<Email>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  /**
   * add token
   * @param postTokenInput
   * @returns
   */
  async postToken(postTokenInput: postTokenInput): Promise<Token> {
    const token = this.tokenRepository.create(postTokenInput);
    return this.tokenRepository.save(token);
  }

  async getTokens(): Promise<Token[]> {
    return this.tokenRepository.find({ relations: ['emails'] });
  }

  async getToken(@Args('id', { type: () => Int }) id: number): Promise<Token> {
    return this.tokenRepository.findOne(id, {
      relations: ['emails'],
    });
  }

  async updateToken(
    @Args('id', { type: () => Int }) id: number,
    updateTokenInput: updateTokenInput,
  ): Promise<Token> {
    const { launch } = updateTokenInput;
    const token = await this.getToken(id);
    if (token === undefined) {
      throw new NotFoundException();
    }
    console.log(token.launch === updateTokenInput.launch);
    if (updateTokenInput.launch && updateTokenInput.launch !== token.launch) {
      // TODO: update reminder
      const isNew = token.launch === null ? true : false;
      this.getCronJobs(token, launch, isNew);
    }
    await this.tokenRepository.save(updateTokenInput);
    return this.tokenRepository.findOne(id, {
      relations: ['emails'],
    });
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

  async subscribeToken(
    @Args('id', { type: () => Int }) id: number,
    subscribeTokenInput: subscribeTokenInput,
  ): Promise<Token> {
    const { address } = subscribeTokenInput;
    const token = await this.getToken(id);
    if (token === undefined) {
      throw new NotFoundException();
    }
    let email = await this.emailRepository.findOne({
      where: { address },
    });
    console.log(email);
    if (email === undefined) {
      email = this.emailRepository.create({ address });
    }
    const item = token.emails.some((item) => item.address == email.address);
    if (!item) {
      token.emails = [email, ...token.emails];
    }

    if (token.launch !== null) {
      this.addNewJob(address, token.launch, token.id);
    }

    await this.tokenRepository.save(token);
    return this.tokenRepository.findOne(id, {
      relations: ['emails'],
    });
  }

  addNewJob(address: string, launch: Date, id: number) {
    const time = new Date(launch).getTime();
    console.log(address, time, id);
    const day_ms = 1000 * 60 * 60 * 24;
    const hour_ms = 1000 * 60 * 60;
    const min_ms = 1000 * 60 * 30;
    const day = Math.floor((time - day_ms) / 1000);
    const hour = Math.floor((time - hour_ms) / 1000);
    const min = Math.floor((time - min_ms) / 1000);
    const job1 = new CronJob(new Date(day * 1000), () => {
      console.log(`time (${new Date(day * 1000)}) for job ${address} to run!`);
    });
    const job2 = new CronJob(new Date(hour * 1000), () => {
      console.log(`time (${new Date(hour * 1000)}) for job ${address} to run!`);
    });
    const job3 = new CronJob(new Date(min * 1000), () => {
      console.log(`time (${new Date(min * 1000)}) for job ${address} to run!`);
    });

    this.schedulerRegistry.addCronJob(`day_${address}_${id}`, job1);
    job1.start();
    this.schedulerRegistry.addCronJob(`hour_${address}_${id}`, job2);
    job2.start();
    this.schedulerRegistry.addCronJob(`min_${address}_${id}`, job3);
    job3.start();

    console.log(`Job ${address} added for time ${new Date(time)}.`);
  }

  deleteCronJob(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
  }

  getCronJobs(token: Token, time: Date, isNew: boolean) {
    const { id, emails } = token;
    if (!emails.length) return;
    emails.forEach((email) => {
      if (!isNew) {
        const job1 = this.schedulerRegistry.getCronJob(
          `day_${email.address}_${id}`,
        );
        const job2 = this.schedulerRegistry.getCronJob(
          `hour_${email.address}_${id}`,
        );
        const job3 = this.schedulerRegistry.getCronJob(
          `min_${email.address}_${id}`,
        );
        if (job1) {
          this.deleteCronJob(`day_${email.address}_${id}`);
        }
        if (job2) {
          this.deleteCronJob(`hour_${email.address}_${id}`);
        }
        if (job3) {
          this.deleteCronJob(`min_${email.address}_${id}`);
        }
      }
      console.log('Add new job', email.address, time, id);
      this.addNewJob(email.address, time, id);
    });
  }
}
