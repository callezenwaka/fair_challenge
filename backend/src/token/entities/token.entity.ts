import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Token {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  date?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  time?: string;
}
