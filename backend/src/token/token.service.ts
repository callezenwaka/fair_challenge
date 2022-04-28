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
import { Email } from 'src/email/entities/email.entity';
import { ScheduleInterface } from './interfaces/schedule.interface';
@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    @InjectRepository(Email) private emailRepository: Repository<Email>,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  private schedules(
    launch: Date,
    address: string,
    id: number,
  ): ScheduleInterface[] {
    const time = new Date(launch).getTime();
    const day_ms = 1000 * 60 * 60 * 24;
    const hour_ms = 1000 * 60 * 60;
    const min_ms = 1000 * 60 * 30;
    const day = Math.floor(time - day_ms);
    const hour = Math.floor(time - hour_ms);
    const min = Math.floor(time - min_ms);

    return [
      {
        time: min,
        name: `min_${address}_${id}`,
        when: '30 mins',
      },
      {
        time: hour,
        name: `hour_${address}_${id}`,
        when: '1 hour',
      },
      {
        time: day,
        name: `day_${address}_${id}`,
        when: '1 day',
      },
    ];
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
    return this.tokenRepository.find({ relations: ['emails'] });
  }

  async getToken(@Args('id', { type: () => Int }) id: number): Promise<Token> {
    return this.tokenRepository.findOne(id, {
      relations: ['emails'],
    });
  }

  async updateToken(
    @Args('id', { type: () => Int }) id: number,
    updateInput: updateTokenInput,
  ): Promise<Token> {
    const { launch } = updateInput;
    const token = await this.getToken(id);
    if (token === undefined) {
      throw new NotFoundException();
    }
    console.log(token.launch === updateInput.launch);
    if (updateInput.launch && updateInput.launch !== token.launch) {
      // TODO: update reminder
      const isNew = token.launch === null ? true : false;
      this.getCronJobs(token, launch, isNew);
    }
    await this.tokenRepository.save(updateInput);
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

  async setReminder(
    @Args('id', { type: () => Int }) id: number,
    Input: reminderInput,
  ): Promise<Token> {
    const { address } = Input;
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
      console.log('Add new job', address, token.launch, token.id);
      this.addNewJob(address, token.launch, token);
    }

    await this.tokenRepository.save(token);
    return this.tokenRepository.findOne(id, {
      relations: ['emails'],
    });
  }

  addNewJob(address: string, launch: Date, token: Token) {
    const { id, name } = token;
    const schedules = this.schedules(launch, address, id);
    schedules.forEach((schedule) => {
      console.log('schedule: ', schedule.time);
      // TODO: Check if date is in the past
      const job = new CronJob(new Date(schedule.time), () => {
        console.log(`${schedule.name} job at (${new Date(schedule.time)})!`);
        this.mailService.sendMail({
          from: this.configService.get<string>('EMAIL_USER'),
          to: address,
          subject: `Token Reminder`,
          text: `REMINDER - THE COLLECTION ${name} LAUNCHES IN ${schedule.when}`,
        });
      });
      this.schedulerRegistry.addCronJob(`${schedule.name}`, job);
      job.start();
      console.log(
        `Job ${schedule.name} scheduled for ${new Date(schedule.time)}.`,
      );
    });
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
      this.addNewJob(email.address, time, token);
    });
  }
}
