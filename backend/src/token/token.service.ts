import { Injectable, NotFoundException } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { CronJob } from 'cron';
import { MailService } from '../mail/mail.service';
import { Args, Int } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { postTokenInput } from './dto/post.token.input';
import { updateTokenInput } from './dto/update.token.input';
import { reminderInput } from './dto/reminder.token.input';
import { Token } from './entities/token.entity';
import { tokens, emails } from '../database/database';
@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  private schedule(job: string): {
    _when: string;
    _address: string;
    _id: number;
  } {
    const _id = Number(job.split('_').pop());
    const _when = job.split('_')[0];
    const str = job.slice(0, job.lastIndexOf('_'));
    const _address = str.slice(str.indexOf('_') + 1);
    return { _id, _when, _address };
  }

  private scheduler(
    schedule: string,
    launch: Date,
  ): {
    when: string;
    job: string;
    time: number;
  } {
    const date = new Date(launch).getTime();
    if (schedule == 'day') {
      const day_ms = 1000 * 60 * 60 * 24;
      const time = Math.floor(date - day_ms);

      return { when: '1 day', time, job: `day` };
    } else if (schedule == 'hour') {
      const hour_ms = 1000 * 60 * 60;
      const time = Math.floor(date - hour_ms);

      return { when: '1 hour', time, job: `hour` };
    } else if (schedule == 'min') {
      const min_ms = 1000 * 60 * 30;
      const time = Math.floor(date - min_ms);

      return { when: '30 min', time, job: `min` };
    } else {
      const time = date;

      return { when: 'NOW', time, job: `now` };
    }
  }

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
    return tokens;
  }

  async getToken(@Args('id', { type: () => Int }) id: number): Promise<Token> {
    return (await tokens).find((i) => i.id == id);
  }

  async updateToken(
    @Args('id', { type: () => Int }) id: number,
    updateInput: updateTokenInput,
  ): Promise<Token> {
    const { launch } = updateInput;
    const token = (await tokens).find((i) => i.id == id);
    if (token === undefined) {
      throw new NotFoundException();
    }

    if (updateInput.name !== token.name) {
      // TODO: update name
      token.name = updateInput.name;
    }

    if (updateInput.launch !== token.launch) {
      // TODO: update reminder
      token.launch = updateInput.launch;
      this.getCrons(token, launch);
    }

    const index = (await tokens).findIndex((token) => token.id == 12);
    (await tokens).splice(index, 1, token);
    return token;
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

  async setReminder(
    @Args('id', { type: () => Int }) id: number,
    Input: reminderInput,
  ): Promise<Token> {
    const { address } = Input;
    const token = (await tokens).find((i) => i.id == id);

    if (token === undefined) {
      throw new NotFoundException();
    }

    const email = (await emails).some((email) => email.address == address);

    if (!email) {
      const input = { id: (await emails).length - 1, address };
      (await emails).push(input);
    }

    if (token.launch !== null) {
      const schedules: string[] = ['now', 'min', 'hour', 'day'];
      schedules.forEach((schedule) => {
        this.addCron(schedule, address, token.launch, token);
      });
    }

    return (await tokens).find((i) => i.id == id);
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
  }

  addCron(schedule: string, address: string, launch: Date, token: Token) {
    const { when, job, time } = this.scheduler(schedule, launch);
    const { id, name } = token;
    const jobName = `${job}_${address}_${id}`;
    const text =
      schedule == 'NOW!'
        ? `${name} IS LAUNCHING ${when}!`
        : `REMINDER - THE COLLECTION ${name} LAUNCHES IN ${when}`;

    // if (new Date(time).getTime() < new Date().getTime()) return;

    const task = new CronJob(new Date(time), () => {
      console.log(`${jobName} job at (${new Date(time)})!`);
      this.mailService.sendMail({
        from: this.configService.get<string>('EMAIL_USER'),
        to: address,
        subject: `Token Reminder`,
        text: `${text}`,
      });
    });
    this.schedulerRegistry.addCronJob(`${jobName}`, task);
    task.start();
    console.log(`Job ${jobName} scheduled for ${new Date(time)}.`);
  }

  getCrons(token: Token, date: Date) {
    const { id } = token;
    const Keys: string[] = [];
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key) => {
      if (id == Number(key.split('_').pop())) {
        Keys.push(key);
        this.deleteCron(key);
      }
    });
    Keys.forEach((key) => {
      const { _when, _address } = this.schedule(key);
      if (date != null) {
        this.addCron(_when, _address, date, token);
      }
    });
  }
}
