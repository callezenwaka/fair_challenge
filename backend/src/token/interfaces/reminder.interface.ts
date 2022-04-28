import { Field, ID, InterfaceType } from '@nestjs/graphql';

// @InterfaceType({
//   resolveType(subscription) {
//     // if (subscription.address) {
//     //   return subscription;
//     // }
//     return subscription;
//   },
// })
@InterfaceType()
export abstract class ReminderInterface {
  @Field(() => ID)
  id: number;

  @Field()
  address: string;
}
