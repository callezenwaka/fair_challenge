import { Field, Int, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class ScheduleInterface {
  @Field(() => Int)
  time: number;

  @Field()
  name: string;

  @Field()
  when: string;
}
