import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#b88917]">
            Pure Elegance
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-[#7a1f3d] md:text-6xl">
            Rangam Pure Silk Sarees
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-8 text-[#5c4033]">
            Discover timeless sarees crafted with tradition, elegance, and
            premium quality. Designed for weddings, celebrations, and every
            graceful moment.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="rounded-xl bg-[#7a1f3d] px-6 py-3 font-medium text-white transition hover:bg-[#5f1730]"
            >
              Shop Collection
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-[#b88917] px-6 py-3 font-medium text-[#b88917] transition hover:bg-[#b88917] hover:text-white"
            >
              Login
            </Link>
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
            alt="Silk Saree"
            className="h-[520px] w-full rounded-3xl object-cover shadow-2xl"
          />
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">
            <h3 className="mb-2 text-xl font-semibold text-[#7a1f3d]">
              Premium Quality
            </h3>
            <p className="text-[#5c4033]">
              Carefully selected silk sarees with rich texture, elegant finish,
              and luxurious feel.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">
            <h3 className="mb-2 text-xl font-semibold text-[#7a1f3d]">
              Timeless Designs
            </h3>
            <p className="text-[#5c4033]">
              Traditional craftsmanship blended with modern styling for every
              special occasion.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">
            <h3 className="mb-2 text-xl font-semibold text-[#7a1f3d]">
              Trusted Elegance
            </h3>
            <p className="text-[#5c4033]">
              A curated collection made to bring confidence, beauty, and grace
              to your wardrobe.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl bg-[#7a1f3d] px-8 py-12 text-white shadow-xl md:px-12">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#f3d27a]">
            Exclusive Collection
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Celebrate Tradition with Luxury
          </h2>
          <p className="mb-6 max-w-2xl text-white/90">
            Explore premium silk sarees perfect for weddings, festive moments,
            and elegant celebrations.
          </p>

          <Link
            to="/products"
            className="inline-block rounded-xl bg-white px-6 py-3 font-medium text-[#7a1f3d] transition hover:bg-gray-100"
          >
            Explore Products
          </Link>
        </div>
      </section>
    </div>
  );
}