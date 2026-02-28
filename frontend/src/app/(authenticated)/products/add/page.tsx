"use client";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PRODUCT, GET_CATEGORIES } from "@/graphql/queries";
import { useRouter } from "next/navigation";
import { ImageIcon, Upload } from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
  const router = useRouter();
  const { data: catData } = useQuery(GET_CATEGORIES);
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT, {
    onCompleted: () => router.push("/products"),
  });

  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    description: "",
    tags: "",
    price: "",
    discount: "",
    discountCategory: "",
    status: "PUBLISHED",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProduct({
      variables: {
        input: {
          name: form.name,
          categoryId: form.categoryId,
          description: form.description,
          tags: form.tags,
          price: parseFloat(form.price) || 0,
          discount: parseFloat(form.discount) || 0,
          discountCategory: form.discountCategory || undefined,
          status: form.status,
        },
      },
    });
  };

  const handleDiscard = () => {
    setForm({
      name: "",
      categoryId: "",
      description: "",
      tags: "",
      price: "",
      discount: "",
      discountCategory: "",
      status: "PUBLISHED",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add Product</h1>
        <Link
          href="/products/add"
          className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium"
        >
          + Add New Product
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Add New Product</h2>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDiscard}
                className="px-4 py-2 border border-red-400 text-red-500 text-sm rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
              >
                Discard Change
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors font-medium"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* General Information */}
              <div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">General Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Product Name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Product Category</label>
                    <select
                      name="categoryId"
                      value={form.categoryId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="">Product Category</option>
                      {catData?.categories?.map((cat: any) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Descriptions</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Description"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Tag Keyword</label>
                    <textarea
                      name="tags"
                      value={form.tags}
                      onChange={handleChange}
                      placeholder="Tag Keyword"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">Pricing</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="Pricing"
                      step="0.01"
                      className="w-full px-4 py-3 border border-purple-300 dark:border-purple-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Discount</label>
                      <input
                        type="number"
                        name="discount"
                        value={form.discount}
                        onChange={handleChange}
                        placeholder="Discount"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Discount Category</label>
                      <select
                        name="discountCategory"
                        value={form.discountCategory}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Discount Category</option>
                        <option value="Percentage">Percentage</option>
                        <option value="Fixed">Fixed Amount</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Image Uploads */}
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1">Preview Product</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Drag And Your Image Here</p>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer min-h-[180px]">
                  <ImageIcon size={40} className="mb-3 text-gray-300 dark:text-gray-600" />
                  <p className="text-sm">Drag and drop here</p>
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1">Thumbnail Product</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Drag And Your Image Here</p>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer min-h-[180px]">
                  <ImageIcon size={40} className="mb-3 text-gray-300 dark:text-gray-600" />
                  <p className="text-sm">Drag and drop here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
