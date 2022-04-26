import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Email } from 'src/email/entities/email.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Token {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  launch?: Date;

  @ManyToMany(() => Email, (email) => email.tokens, {
    cascade: true,
  })
  @JoinTable()
  @Field(() => [Email], { nullable: true })
  emails?: Email[];
}
