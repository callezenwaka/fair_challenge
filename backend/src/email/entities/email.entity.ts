import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Token } from 'src/token/entities/token.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@ObjectType()
@Unique(['address'])
export class Email {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  address: string;

  // @ManyToOne(() => Token, (token) => token.emails)
  // @Field(() => Token)
  // tokens: Token[];

  // @ManyToMany(() => Token, (token) => token.emails, {
  //   cascade: true,
  // })
  // @JoinTable()
  // @Field(() => Token, { nullable: true })
  // tokens?: Token[];

  @ManyToMany(() => Token, (token) => token.emails)
  @Field(() => [Token], { nullable: true })
  tokens?: Token[];
  // @Field(() => [Email], { nullable: true })
  // emails?: Email[];
}
