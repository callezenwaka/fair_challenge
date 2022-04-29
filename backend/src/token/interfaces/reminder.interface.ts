import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class ReminderInterface {
  @Field(() => ID)
  id: number;

  @Field()
  address: string;
}
