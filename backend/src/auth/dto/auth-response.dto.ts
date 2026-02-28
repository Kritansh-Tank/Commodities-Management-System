import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field()
  userId: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  role: string;

  @Field(() => String, { nullable: true })
  avatar?: string | null;
}
