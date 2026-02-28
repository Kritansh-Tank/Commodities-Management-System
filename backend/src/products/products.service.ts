import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateProductInput,
  UpdateProductInput,
  ProductFilterInput,
} from './dto/product.inputs';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    page: number = 1,
    limit: number = 15,
    filter?: ProductFilterInput,
  ) {
    const where: any = {};

    if (filter?.status) {
      where.status = filter.status;
    }
    if (filter?.categoryId) {
      where.categoryId = filter.categoryId;
    }
    if (filter?.search) {
      where.OR = [
        { name: { contains: filter.search } },
        { description: { contains: filter.search } },
        { tags: { contains: filter.search } },
      ];
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async create(input: CreateProductInput) {
    return this.prisma.product.create({
      data: input,
      include: { category: true },
    });
  }

  async update(id: string, input: UpdateProductInput) {
    return this.prisma.product.update({
      where: { id },
      data: input,
      include: { category: true },
    });
  }

  async delete(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async getCategories() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
