import { Field, ObjectType, ID, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class CategoryType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}

@ObjectType()
export class ProductType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String, { nullable: true })
  tags?: string | null;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  discount: number;

  @Field(() => String, { nullable: true })
  discountCategory?: string | null;

  @Field()
  status: string;

  @Field(() => Int)
  views: number;

  @Field(() => Float)
  revenue: number;

  @Field(() => String, { nullable: true })
  thumbnailUrl?: string | null;

  @Field(() => String, { nullable: true })
  previewUrl?: string | null;

  @Field()
  categoryId: string;

  @Field(() => CategoryType)
  category: CategoryType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class PaginatedProducts {
  @Field(() => [ProductType])
  items: ProductType[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;
}
