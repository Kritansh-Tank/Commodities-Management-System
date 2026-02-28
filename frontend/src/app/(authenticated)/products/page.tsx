"use client";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCTS, DELETE_PRODUCT } from "@/graphql/queries";
import Link from "next/link";
import { Eye, TrendingUp } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const limit = 15;

  const { data, loading, refetch } = useQuery(GET_PRODUCTS, {
    variables: { page, limit, filter: { status: activeTab } },
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => refetch(),
  });

  const products = data?.products?.items || [];
  const totalPages = data?.products?.totalPages || 1;
  const total = data?.products?.total || 0;

  const totalViews = products.reduce((sum: number, p: any) => sum + p.views, 0);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct({ variables: { id } });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Product</h1>
        <Link
          href="/products/add"
          className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium"
        >
          + Add New Product
        </Link>
      </div>

      <div className="flex gap-6">
        {/* Main Table */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          {/* Tabs & Filters */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex gap-4">
              <button
                onClick={() => { setActiveTab("PUBLISHED"); setPage(1); }}
                className={`text-sm font-medium pb-1 border-b-2 transition-colors ${activeTab === "PUBLISHED"
                  ? "border-purple-600 text-purple-600 dark:text-purple-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700"
                  }`}
              >
                Published
              </button>
              <button
                onClick={() => { setActiveTab("DRAFT"); setPage(1); }}
                className={`text-sm font-medium pb-1 border-b-2 transition-colors ${activeTab === "DRAFT"
                  ? "border-purple-600 text-purple-600 dark:text-purple-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700"
                  }`}
              >
                Draft
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Filter ▾
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Download ▾
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="w-10 p-3"></th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400">Product Name</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Views <span className="inline-block ml-1">↕</span>
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Pricing <span className="inline-block ml-1">↕</span>
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Revenue <span className="inline-block ml-1">↕</span>
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Manage <span className="inline-block ml-1">↕</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="border-b border-gray-50 dark:border-gray-700/50">
                      <td className="p-3"><div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div></td>
                      <td className="p-3"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div></td>
                      <td className="p-3"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div></td>
                      <td className="p-3"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div></td>
                      <td className="p-3"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div></td>
                      <td className="p-3"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div></td>
                    </tr>
                  ))
                ) : (
                  products.map((product: any) => (
                    <tr key={product.id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-white transition-colors">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(product.id)}
                          onChange={() => toggleSelect(product.id)}
                          className="w-4 h-4 appearance-none rounded-xs border-2 border-gray-300 bg-transparent cursor-pointer transition-all duration-200 checked:bg-blue-500 checked:border-blue-500 relative after:content-[''] after:absolute after:left-[4px] after:top-[0px] after:w-[5px] after:h-[10px] after:border-white after:border-r-2 after:border-b-2 after:rotate-45 after:opacity-0 checked:after:opacity-100"
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-purple-600 text-xs">
                            📦
                          </div>
                          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{product.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{product.views.toLocaleString()}</td>
                      <td className="p-3 text-sm text-gray-600 dark:text-gray-400">${product.price.toFixed(3)}</td>
                      <td className="p-3 text-sm text-gray-600 dark:text-gray-400">${product.revenue.toLocaleString()}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/products/${product.id}/edit`}
                            className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end p-4 gap-1">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              &lt;
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 text-sm rounded border transition-colors ${p === page
                  ? "border-purple-600 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                  : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Total Views Sidebar */}
        <div className="w-64 hidden lg:block">
          <h1 className="text-2xl text-gray-800 dark:text-white mb-4">Relate Data</h1>
          <div className="chart-card">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Total Views</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">+{totalViews.toLocaleString()}</p>
            <div className="mt-4 h-32">
              <Line
                data={{
                  labels: ["Nov 20th", "", "", "", "", "", "", "Dec 20th"],
                  datasets: [
                    {
                      data: [20, 35, 25, 50, 30, 45, 35, 55],
                      borderColor: "#6C5CE7",
                      tension: 0.4,
                      pointRadius: 0,
                      borderWidth: 2,
                    },
                    {
                      data: [15, 25, 20, 35, 25, 40, 30, 45],
                      borderColor: "#38D9A9",
                      tension: 0.4,
                      pointRadius: 0,
                      borderWidth: 2,
                    },
                    {
                      data: [10, 15, 12, 20, 15, 25, 18, 30],
                      borderColor: "#FFC078",
                      tension: 0.4,
                      pointRadius: 0,
                      borderWidth: 2,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: { display: false },
                    x: { grid: { display: false }, ticks: { color: "#9ca3af", font: { size: 10 } } },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
