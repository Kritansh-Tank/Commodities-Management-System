"use client";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCT, UPDATE_PRODUCT, GET_CATEGORIES } from "@/graphql/queries";
import { useRouter, useParams } from "next/navigation";
import { ImageIcon } from "lucide-react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: productData, loading: productLoading } = useQuery(GET_PRODUCT, { variables: { id } });
  const { data: catData } = useQuery(GET_CATEGORIES);
  const [updateProduct, { loading: updating }] = useMutation(UPDATE_PRODUCT, {
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

  useEffect(() => {
    if (productData?.product) {
      const p = productData.product;
      setForm({
        name: p.name || "",
        categoryId: p.categoryId || "",
        description: p.description || "",
        tags: p.tags || "",
        price: String(p.price),
        discount: String(p.discount),
        discountCategory: p.discountCategory || "",
        status: p.status || "PUBLISHED",
      });
    }
  }, [productData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct({
      variables: {
        id,
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

  if (productLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Edit Product Details</h2>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push("/products")}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-6 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors font-medium"
              >
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">General Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Product Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Product Category</label>
                    <select name="categoryId" value={form.categoryId} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                      <option value="">Select Category</option>
                      {catData?.categories?.map((cat: any) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Tags</label>
                    <input type="text" name="tags" value={form.tags} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">Pricing</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Price</label>
                    <input type="number" name="price" value={form.price} onChange={handleChange} step="0.01" className="w-full px-4 py-3 border border-purple-300 dark:border-purple-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Discount</label>
                      <input type="number" name="discount" value={form.discount} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Discount Category</label>
                      <select name="discountCategory" value={form.discountCategory} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                        <option value="">Select</option>
                        <option value="Percentage">Percentage</option>
                        <option value="Fixed">Fixed Amount</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1">Preview Product</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Drag And Your Image Here</p>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-purple-400 transition-colors cursor-pointer min-h-[180px]">
                  <ImageIcon size={40} className="mb-3 text-gray-300 dark:text-gray-600" />
                  <p className="text-sm">Drag and drop here</p>
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1">Thumbnail Product</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Drag And Your Image Here</p>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-purple-400 transition-colors cursor-pointer min-h-[180px]">
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
