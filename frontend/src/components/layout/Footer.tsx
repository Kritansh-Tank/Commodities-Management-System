import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-auto rounded-t-xl px-16 py-6">
      <div className="max-w-7xl mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rotate-45 rounded-sm bg-orange-500 flex items-center justify-center">
                <div className="w-3 h-3 rounded-xs bg-white dark:bg-slate-900"></div>
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white ml-4">Opion</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              Ease of shopping is our main focus. With powerful search features and customizable filters, you can easily find the products you are looking for.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                <Facebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                <Linkedin size={14} />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Subscribe to Newsletter</p>
              <div className="flex">
                <button className="px-3 py-2 rounded-l-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                  ✉
                </button>
                <input
                  type="email"
                  placeholder="Enter Your Email Here"
                  className="px-3 py-2 text-sm rounded-r-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none w-fit"
                />
              </div>
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Get Started", links: ["Service", "Contact Us", "Affiliate Program", "About Us"] },
            { title: "Get Started", links: ["Dashboard", "Platform", "Workout Library", "App Design"] },
            { title: "Get Started", links: ["About Us"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-400">2026 MaxFit</p>
          <div className="flex gap-4 text-sm text-gray-400">
            <a href="#" className="hover:underline">Twitter</a>
            <span>—</span>
            <a href="#" className="hover:underline">Instagram</a>
            <span>—</span>
            <a href="#" className="hover:underline">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
