import { postEmailInput } from './post.email.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmailInput extends PartialType(postEmailInput) {
  @Field(() => Int)
  id: number;
}
