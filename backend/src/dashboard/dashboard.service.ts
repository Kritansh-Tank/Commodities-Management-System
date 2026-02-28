import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardStats } from './dto/dashboard.types';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(): Promise<DashboardStats> {
    const products = await this.prisma.product.findMany();

    const totalEarnings = products.reduce((sum, p) => sum + p.revenue, 0);
    const totalViews = products.reduce((sum, p) => sum + p.views, 0);
    const totalSales = products.filter((p) => p.revenue > 0).length;
    const subscriptions = Math.floor(totalViews * 0.08);

    const cards = [
      {
        title: 'Total Earning',
        value: `$${totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        change: 2.14,
        changeLabel: 'total inc +2.14%',
      },
      {
        title: 'Views',
        value: `+${totalViews.toLocaleString()}`,
        change: 1.8,
        changeLabel: 'monthly +1.8%',
      },
      {
        title: 'Total Sales',
        value: `+${totalSales.toLocaleString()}`,
        change: -0.5,
        changeLabel: 'weekly -0.5%',
      },
      {
        title: 'Subscriptions',
        value: `+${subscriptions.toLocaleString()}`,
        change: 3.2,
        changeLabel: 'monthly +3.2%',
      },
    ];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const overviewChart = {
      label: 'Overview',
      data: months.map((m) => ({
        label: m,
        value: Math.floor(Math.random() * 5000) + 1000,
      })),
    };

    const recentSales = [
      { name: 'Neha Mzahone', email: 'neha.mzahone@mail.com', amount: '+$1800.00', avatar: undefined },
      { name: 'Neha Mzahone', email: 'hi.abhishekdayal@mail.com', amount: '+$1800.00', avatar: undefined },
      { name: 'Neha Mzahone', email: 'neha.mzahone@mail.com', amount: '+$1800.00', avatar: undefined },
      { name: 'Neha Mzahone', email: 'neha.mzahone@mail.com', amount: '+$1800.00', avatar: undefined },
      { name: 'Neha Mzahone', email: 'neha.mzahone@mail.com', amount: '+$1800.00', avatar: undefined },
    ];

    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const earningChart = {
      label: 'Total Earning',
      data: months.map((m) => ({
        label: m,
        value: Math.floor(Math.random() * 120000) + 50000,
      })),
    };

    const barChart = {
      label: 'Weekly Overview',
      data: days.map((d) => ({
        label: d,
        value: Math.floor(Math.random() * 500) + 100,
      })),
    };

    const subscriptionChart = {
      label: 'Subscriptions',
      data: months.slice(0, 6).map((m) => ({
        label: m,
        value: Math.floor(Math.random() * 120000) + 30000,
      })),
    };

    const earningLineChart = {
      label: 'Total Earning Line',
      data: months.map((m) => ({
        label: m,
        value: Math.floor(Math.random() * 120000) + 50000,
      })),
    };

    const statsCharts = [earningChart, earningLineChart, barChart, subscriptionChart];

    const topProducts = [
      { name: 'Yourname@Email.com', email: 'yourname@email.com', amount: '$100' },
      { name: 'Yourname@Email.com', email: 'yourname@email.com', amount: '$100' },
      { name: 'Yourname@Email.com', email: 'yourname@email.com', amount: '$100' },
      { name: 'Yourname@Email.com', email: 'yourname@email.com', amount: '$100' },
      { name: 'Yourname@Email.com', email: 'yourname@email.com', amount: '$100' },
    ];

    const paymentHistory = [
      { name: 'Yourname@Email.com', email: 'yourname@email.com', amount: '$500' },
      { name: 'Yourname@Email.com', email: 'yourname@email.com', amount: '$500' },
      { name: 'Yourname@Email.com', email: 'yourname@email.com', amount: '$500' },
      { name: 'Yourname@Email.com', email: 'yourname@email.com', amount: '$500' },
      { name: 'Yourname@Email.com', email: 'yourname@email.com', amount: '$500' },
    ];

    return {
      cards,
      overviewChart,
      recentSales,
      statsCharts,
      subscriptionPerformers: 500,
      topProducts,
      paymentHistory,
    };
  }
}
