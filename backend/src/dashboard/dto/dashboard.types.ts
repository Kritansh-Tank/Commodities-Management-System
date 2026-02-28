import { Field, ObjectType, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class StatsCard {
  @Field()
  title: string;

  @Field()
  value: string;

  @Field(() => Float)
  change: number;

  @Field()
  changeLabel: string;
}

@ObjectType()
export class ChartDataPoint {
  @Field()
  label: string;

  @Field(() => Float)
  value: number;
}

@ObjectType()
export class ChartDataset {
  @Field()
  label: string;

  @Field(() => [ChartDataPoint])
  data: ChartDataPoint[];
}

@ObjectType()
export class RecentSale {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  amount: string;

  @Field({ nullable: true })
  avatar?: string;
}

@ObjectType()
export class TopProduct {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  amount: string;
}

@ObjectType()
export class PaymentRecord {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  amount: string;
}

@ObjectType()
export class DashboardStats {
  @Field(() => [StatsCard])
  cards: StatsCard[];

  @Field(() => ChartDataset)
  overviewChart: ChartDataset;

  @Field(() => [RecentSale])
  recentSales: RecentSale[];

  @Field(() => [ChartDataset])
  statsCharts: ChartDataset[];

  @Field(() => Int)
  subscriptionPerformers: number;

  @Field(() => [TopProduct])
  topProducts: TopProduct[];

  @Field(() => [PaymentRecord])
  paymentHistory: PaymentRecord[];
}
