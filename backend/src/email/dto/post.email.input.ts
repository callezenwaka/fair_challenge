import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class postEmailInput {
  @Field()
  address: string;
}
