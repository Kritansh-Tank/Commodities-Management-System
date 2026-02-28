// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const manager = await prisma.user.create({
    data: {
      email: 'manager@slooze.com',
      password: hashedPassword,
      name: 'Admin Manager',
      role: 'MANAGER',
      avatar: null,
    },
  });

  const storeKeeper = await prisma.user.create({
    data: {
      email: 'keeper@slooze.com',
      password: hashedPassword,
      name: 'Store Keeper',
      role: 'STORE_KEEPER',
      avatar: null,
    },
  });

  console.log(`✅ Created users: ${manager.email}, ${storeKeeper.email}`);

  // Create categories
  const categoryNames = ['Grains', 'Beverages', 'Spices', 'Dairy', 'Oils'];
  const categories: any[] = [];
  for (const name of categoryNames) {
    const cat = await prisma.category.create({ data: { name } });
    categories.push(cat);
  }
  console.log(`✅ Created ${categories.length} categories`);

  // Create products
  const productData = [
    { name: 'Premium Basmati Rice', category: 'Grains', price: 24.99, discount: 5, views: 14520, revenue: 164000, status: 'PUBLISHED' },
    { name: 'Organic Wheat Flour', category: 'Grains', price: 12.50, discount: 0, views: 8300, revenue: 52000, status: 'PUBLISHED' },
    { name: 'Brown Sugar', category: 'Grains', price: 8.99, discount: 10, views: 6200, revenue: 38000, status: 'PUBLISHED' },
    { name: 'Arabica Coffee Beans', category: 'Beverages', price: 34.99, discount: 15, views: 22100, revenue: 287000, status: 'PUBLISHED' },
    { name: 'Green Tea Leaves', category: 'Beverages', price: 18.75, discount: 0, views: 11400, revenue: 98000, status: 'PUBLISHED' },
    { name: 'Darjeeling Tea', category: 'Beverages', price: 42.00, discount: 8, views: 9800, revenue: 156000, status: 'PUBLISHED' },
    { name: 'Turmeric Powder', category: 'Spices', price: 15.50, discount: 0, views: 7600, revenue: 42000, status: 'PUBLISHED' },
    { name: 'Black Pepper Whole', category: 'Spices', price: 28.99, discount: 5, views: 5400, revenue: 67000, status: 'PUBLISHED' },
    { name: 'Cinnamon Sticks', category: 'Spices', price: 22.00, discount: 0, views: 4100, revenue: 31000, status: 'DRAFT' },
    { name: 'Cardamom Pods', category: 'Spices', price: 55.00, discount: 12, views: 3200, revenue: 89000, status: 'PUBLISHED' },
    { name: 'Full Cream Milk Powder', category: 'Dairy', price: 19.99, discount: 0, views: 12800, revenue: 112000, status: 'PUBLISHED' },
    { name: 'Organic Butter', category: 'Dairy', price: 9.50, discount: 0, views: 8700, revenue: 43000, status: 'PUBLISHED' },
    { name: 'Cottage Cheese', category: 'Dairy', price: 7.99, discount: 5, views: 5600, revenue: 28000, status: 'DRAFT' },
    { name: 'Ghee Clarified Butter', category: 'Dairy', price: 32.00, discount: 10, views: 14200, revenue: 198000, status: 'PUBLISHED' },
    { name: 'Extra Virgin Olive Oil', category: 'Oils', price: 38.99, discount: 0, views: 18500, revenue: 245000, status: 'PUBLISHED' },
    { name: 'Coconut Oil Cold Pressed', category: 'Oils', price: 16.50, discount: 8, views: 9200, revenue: 68000, status: 'PUBLISHED' },
    { name: 'Sunflower Oil', category: 'Oils', price: 11.99, discount: 0, views: 7800, revenue: 45000, status: 'PUBLISHED' },
    { name: 'Mustard Oil', category: 'Oils', price: 13.25, discount: 5, views: 6100, revenue: 35000, status: 'DRAFT' },
    { name: 'Saffron Threads', category: 'Spices', price: 120.00, discount: 0, views: 2800, revenue: 175000, status: 'PUBLISHED' },
    { name: 'Quinoa Seeds', category: 'Grains', price: 29.99, discount: 15, views: 4500, revenue: 62000, status: 'PUBLISHED' },
  ];

  for (const p of productData) {
    const cat = categories.find((c: any) => c.name === p.category)!;
    await prisma.product.create({
      data: {
        name: p.name,
        description: `High quality ${p.name.toLowerCase()} sourced from premium suppliers.`,
        tags: p.category.toLowerCase(),
        price: p.price,
        discount: p.discount,
        discountCategory: p.discount > 0 ? 'Percentage' : undefined,
        status: p.status,
        views: p.views,
        revenue: p.revenue,
        categoryId: cat.id,
      },
    });
  }

  console.log(`✅ Created ${productData.length} products`);
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
