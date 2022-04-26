import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { Email } from './entities/email.entity';
import { postEmailInput } from './dto/post.email.input';
import { UpdateEmailInput } from './dto/update-email.input';

@Resolver(() => Email)
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => Email, { name: 'postEmail' })
  postEmail(
    @Args('postEmailInput') postEmailInput: postEmailInput,
  ): Promise<Email> {
    return this.emailService.postEmail(postEmailInput);
  }

  @Query(() => [Email], { name: 'getEmails' })
  getEmails(): Promise<Email[]> {
    return this.emailService.getEmails();
  }

  @Query(() => Email, { name: 'getEmail' })
  getEmail(@Args('id', { type: () => Int }) id: number): Promise<Email> {
    return this.emailService.getEmail(id);
  }

  @Mutation(() => Email)
  updateEmail(@Args('updateEmailInput') updateEmailInput: UpdateEmailInput) {
    return this.emailService.update(updateEmailInput.id, updateEmailInput);
  }

  @Mutation(() => Email)
  removeEmail(@Args('id', { type: () => Int }) id: number) {
    return this.emailService.remove(id);
  }
}
