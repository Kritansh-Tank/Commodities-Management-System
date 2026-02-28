"use client";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_DASHBOARD_STATS } from "@/graphql/queries";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, PointElement, LineElement,
  Title, Tooltip, Legend, Filler, ArcElement
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { TrendingUp, TrendingDown, Eye, ShoppingCart, Users, DollarSign } from "lucide-react";
import Link from "next/link";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

export default function DashboardPage() {
  const { isManager } = useAuth();
  const router = useRouter();
  const { data, loading } = useQuery(GET_DASHBOARD_STATS);

  useEffect(() => {
    if (!isManager) {
      router.push("/products");
    }
  }, [isManager, router]);

  if (!isManager) return null;

  const stats = data?.dashboardStats;
  const iconMap: Record<string, React.ReactNode> = {
    "Total Earning": <DollarSign size={20} className="text-purple-600" />,
    "Views": <Eye size={20} className="text-blue-600" />,
    "Total Sales": <ShoppingCart size={20} className="text-green-600" />,
    "Subscriptions": <Users size={20} className="text-orange-600" />,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <Link
          href="/products/add"
          className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium"
        >
          + Add New Product
        </Link>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="stat-card animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats?.cards?.map((card: any, i: number) => (
            <div key={i} className="stat-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{card.title}</span>
                {iconMap[card.title] || <DollarSign size={20} className="text-gray-500" />}
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">{card.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {card.change >= 0 ? (
                  <TrendingUp size={14} className="text-green-500" />
                ) : (
                  <TrendingDown size={14} className="text-red-500" />
                )}
                <span className={`text-xs ${card.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {card.changeLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Overview + Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 chart-card">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Overview</h3>
          {stats?.overviewChart && (
            <Bar
              data={{
                labels: stats.overviewChart.data.map((d: any) => d.label),
                datasets: [{
                  label: "Revenue",
                  data: stats.overviewChart.data.map((d: any) => d.value),
                  backgroundColor: stats.overviewChart.data.map((_: any, i: number) =>
                    i === 3 || i === 4 ? "#6C5CE7" : "#E8E5FF"
                  ),
                  borderRadius: 4,
                  barThickness: 32,
                }],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" }, ticks: { color: "#9ca3af" } },
                  x: { grid: { display: false }, ticks: { color: "#9ca3af" } },
                },
              }}
            />
          )}
        </div>

        <div className="chart-card">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Recent Sales</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">You made 350 sales this month</p>
          <div className="space-y-4">
            {stats?.recentSales?.map((sale: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-200 flex items-center justify-center text-gray-400 dark:text-gray-400 text-xs font-bold">
                    {sale.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{sale.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{sale.email}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-green-600">{sale.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Charts */}
      <div className="flex items-center gap-3 flex-wrap">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Stats</h3>
        <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
          {["Yearly", "Aug 12th - Aug 25th", "comparedTo", "Previous", "2014"].map((t, i) => (
            <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">{t}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats?.statsCharts?.slice(0, 4).map((chart: any, i: number) => (
          <div key={i} className="chart-card">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{chart.label}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">$112,893.00</p>
              </div>
            </div>
            {i % 2 === 0 ? (
              <Bar
                data={{
                  labels: chart.data.map((d: any) => d.label),
                  datasets: [{
                    label: chart.label,
                    data: chart.data.map((d: any) => d.value),
                    backgroundColor: chart.data.map((_: any, idx: number) =>
                      idx % 3 === 0 ? "#6C5CE7" : idx % 3 === 1 ? "#38D9A9" : "#FFC078"
                    ),
                    borderRadius: 4,
                  }],
                }}
                options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" } }, x: { grid: { display: false } } } }}
              />
            ) : (
              <Line
                data={{
                  labels: chart.data.map((d: any) => d.label),
                  datasets: [{
                    label: chart.label,
                    data: chart.data.map((d: any) => d.value),
                    borderColor: i === 3 ? "#FFC078" : "#6C5CE7",
                    backgroundColor: i === 3 ? "rgba(255,192,120,0.1)" : "rgba(108,92,231,0.1)",
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2,
                  }],
                }}
                options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" } }, x: { grid: { display: false } } } }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["Total Earning", "Total Sales", "Total Views"].map((title, i) => (
          <div key={i} className="chart-card">
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">+112,893</p>
            <div className="mt-4 h-16">
              <Line
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  datasets: [{
                    data: [30, 45, 30, 50, 35, 55].map((v) => v + i * 10),
                    borderColor: ["#6C5CE7", "#38D9A9", "#FFC078"][i],
                    tension: 0.4,
                    pointRadius: 0,
                    borderWidth: 2,
                  }],
                }}
                options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { display: false } } }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Subscription + Top Sales + Payment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subscriptions Performers */}
        <div className="chart-card">
          <p className="text-lg font-semibold text-gray-800 dark:text-white">Subscriptions Performers</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Follower This Years</p>
          <p className="text-5xl font-bold text-gray-800 dark:text-white mb-4">+{stats?.subscriptionPerformers || 500}</p>
          <div className="h-24">
            <Bar
              data={{
                labels: Array(12).fill(""),
                datasets: [{
                  data: [40, 60, 35, 70, 50, 55, 45, 65, 30, 75, 55, 40],
                  backgroundColor: "rgba(255, 165, 0, 1)",
                  borderRadius: 6 ,
                }],
              }}
              options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { display: false } } }}
            />
          </div>
          <button className="mt-3 w-full py-2.5 bg-green-500 text-white rounded-2xl font-medium text-sm hover:bg-green-600 transition-colors">
            Get Started
          </button>
        </div>

        {/* Top Sales Product */}
        <div className="chart-card">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Top Sales Product</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Manage your payments.</p>
          <div className="space-y-3">
            {stats?.topProducts?.map((p: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-xs">
                    👤
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{p.email}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800 dark:text-white">{p.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="chart-card">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Payment History</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Manage your payments.</p>
          <div className="space-y-3">
            {stats?.paymentHistory?.map((p: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-xs">
                    👤
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{p.email}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800 dark:text-white">{p.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
