import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductType, PaginatedProducts, CategoryType } from './dto/product.types';
import {
  CreateProductInput,
  UpdateProductInput,
  ProductFilterInput,
} from './dto/product.inputs';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => ProductType)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => PaginatedProducts)
  @UseGuards(GqlAuthGuard)
  async products(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 15 }) limit: number,
    @Args('filter', { nullable: true }) filter?: ProductFilterInput,
  ): Promise<PaginatedProducts> {
    return this.productsService.findAll(page, limit, filter);
  }

  @Query(() => ProductType, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async product(@Args('id') id: string): Promise<ProductType | null> {
    return this.productsService.findOne(id);
  }

  @Query(() => [CategoryType])
  @UseGuards(GqlAuthGuard)
  async categories(): Promise<CategoryType[]> {
    return this.productsService.getCategories();
  }

  @Mutation(() => ProductType)
  @UseGuards(GqlAuthGuard)
  async createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<ProductType> {
    return this.productsService.create(input);
  }

  @Mutation(() => ProductType)
  @UseGuards(GqlAuthGuard)
  async updateProduct(
    @Args('id') id: string,
    @Args('input') input: UpdateProductInput,
  ): Promise<ProductType> {
    return this.productsService.update(id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteProduct(@Args('id') id: string): Promise<boolean> {
    await this.productsService.delete(id);
    return true;
  }
}
