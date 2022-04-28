import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class reminderInput {
  @Field(() => Int)
  id: number;

  @Field()
  address: string;
}
