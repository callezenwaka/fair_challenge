import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class updateTokenInput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  launch?: Date;
}
