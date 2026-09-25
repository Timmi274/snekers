import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">
                Stay in the loop
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Get exclusive drops and early access to limited releases.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-0">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-900 border border-gray-700 text-white px-4 py-3 text-sm flex-1 md:w-64 outline-none"
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {[
                ["Sneakers", "/products?category=sneakers"],
                ["Clothing", "/products?category=clothing"],
                ["New Arrivals", "/products?new=true"],
                ["Sale", "/products?sale=true"],
                ["All Products", "/products"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Brands
            </h4>
            <ul className="space-y-3">
              {["Nike", "Jordan", "Adidas", "New Balance", "Converse", "Vans"].map(
                (brand) => (
                  <li key={brand}>
                    <Link
                      href={`/brands?brand=${brand}`}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {brand}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Help
            </h4>
            <ul className="space-y-3">
              {[
                "Size Guide",
                "Shipping & Returns",
                "Authenticity",
                "Track Order",
                "FAQ",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {["Instagram", "TikTok", "Twitter", "YouTube"].map((platform) => (
                <div
                  key={platform}
                  className="w-8 h-8 bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors"
                  title={platform}
                >
                  <span className="text-xs font-bold">
                    {platform[0]}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                We Accept
              </h4>
              <div className="flex gap-2 flex-wrap">
                {["Visa", "MC", "Amex", "PayPal"].map((card) => (
                  <div
                    key={card}
                    className="bg-gray-800 px-2 py-1 text-xs text-gray-300 font-mono"
                  >
                    {card}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-white text-black font-black text-sm px-2 py-0.5 tracking-widest">
              SOLE
            </div>
            <span className="text-white font-black text-sm tracking-widest">
              &amp; STYLE
            </span>
          </div>
          <p className="text-gray-500 text-xs">
            © 2024 Sole &amp; Style. All rights reserved. All products are authentic.
          </p>
          <div className="flex gap-4">
            <span className="text-gray-500 text-xs cursor-pointer hover:text-white">
              Privacy Policy
            </span>
            <span className="text-gray-500 text-xs cursor-pointer hover:text-white">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
