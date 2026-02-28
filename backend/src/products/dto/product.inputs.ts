import { Field, InputType, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  tags?: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => Float, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @Field({ nullable: true })
  @IsOptional()
  discountCategory?: string;

  @Field({ nullable: true, defaultValue: 'PUBLISHED' })
  @IsOptional()
  status?: string;

  @Field()
  @IsNotEmpty()
  categoryId: string;

  @Field({ nullable: true })
  @IsOptional()
  thumbnailUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  previewUrl?: string;
}

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  tags?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  price?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @Field({ nullable: true })
  @IsOptional()
  discountCategory?: string;

  @Field({ nullable: true })
  @IsOptional()
  status?: string;

  @Field({ nullable: true })
  @IsOptional()
  categoryId?: string;

  @Field({ nullable: true })
  @IsOptional()
  thumbnailUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  previewUrl?: string;
}

@InputType()
export class ProductFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  search?: string;

  @Field({ nullable: true })
  @IsOptional()
  status?: string;

  @Field({ nullable: true })
  @IsOptional()
  categoryId?: string;
}
