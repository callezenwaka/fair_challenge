import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class subscribeTokenInput {
  @Field(() => Int)
  id: number;

  @Field()
  address: string;
}
