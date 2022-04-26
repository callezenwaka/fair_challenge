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
// import { Subscription } from './interfaces/subscription.interface';
@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
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
    return this.tokenRepository.find();
  }

  async getToken(@Args('id', { type: () => Int }) id: number): Promise<Token> {
    return this.tokenRepository.findOneOrFail(id);
  }

  async updateToken(
    @Args('id', { type: () => Int }) id: number,
    updateTokenInput: updateTokenInput,
  ): Promise<Token> {
    const token = await this.getToken(id);
    if (token === undefined) {
      throw new NotFoundException();
    }
    console.log(token.launch === updateTokenInput.launch);
    if (updateTokenInput.launch && updateTokenInput.launch !== token.launch) {
      // update reminder
      // if (token.launch.getTime() !== updateTokenInput.launch.getTime())
      this.getCronJobs(token);
    }
    this.getCronJobs(token);
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

  async subscribeToken(
    @Args('id', { type: () => Int }) id: number,
    subscribeTokenInput: subscribeTokenInput,
  ): Promise<Token> {
    const { address } = subscribeTokenInput;
    const token = await this.getToken(id);
    if (token === undefined) {
      throw new NotFoundException();
    }

    // const time = '2022-04-27T05:00:00.765Z';
    const date_ms =
      token.launch !== null
        ? new Date(token.launch).getTime()
        : new Date().getTime();
    const day_ms = 1000 * 60 * 60 * 24;
    const hour_ms = 1000 * 60 * 60;
    const min_ms = 1000 * 60 * 30;
    const day = Math.floor((date_ms - day_ms) / 1000);
    const hour = Math.floor((date_ms - hour_ms) / 1000);
    const min = Math.floor((date_ms - min_ms) / 1000);

    this.addNewJob(`day_${address}_${id}`, day, address);
    this.addNewJob(`hour_${address}_${id}`, hour, address);
    this.addNewJob(`min_${address}_${id}`, min, address);

    return this.tokenRepository.findOne(id);
  }

  addNewJob(jobName: string, time: number, address: string) {
    console.log(jobName, time, address);
    const job = new CronJob(new Date(time * 1000), () => {
      console.log(`time (${new Date(time * 1000)}) for job ${jobName} to run!`);
    });

    this.schedulerRegistry.addCronJob(jobName, job);
    job.start();

    console.log(
      `Job ${jobName} added for every ${new Date(time * 1000)} seconds`,
    );
  }

  getCronJobs(token: Token) {
    console.log('Id:', token.id);
    const jobs = this.schedulerRegistry.getCronJobs();
    console.log(jobs.values.length);
    jobs.forEach((value, key, map) => {
      console.log('Value:', value);
      // let next;
      // try {
      //   next = value.nextDates().toDate();
      // } catch (e) {
      //   next = 'error: next fire date is in the past!';
      // }
      // this.logger.log(`job: ${key} -> next: ${next}`);
    });
  }
}
