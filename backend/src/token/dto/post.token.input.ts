import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class postTokenInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  launch?: Date;
}
