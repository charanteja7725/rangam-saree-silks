import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
      <Navbar />

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#b88917]">
            Pure Elegance
          </p>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-[#7a1f3d]">
            Rangam Pure Silk Sarees
          </h1>
          <p className="mb-8 text-lg text-[#5c4033]">
            Discover timeless sarees crafted with tradition, elegance, and premium quality.
          </p>

          <div className="flex gap-4">
            <Link
              to="/products"
              className="rounded bg-[#7a1f3d] px-6 py-3 font-medium text-white transition hover:bg-[#5f1730]"
            >
              Shop Now
            </Link>
            <Link
              to="/login"
              className="rounded border border-[#b88917] px-6 py-3 font-medium text-[#b88917] transition hover:bg-[#b88917] hover:text-white"
            >
              Login
            </Link>
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
            alt="Silk Saree"
            className="h-[500px] w-full rounded-2xl object-cover shadow-xl"
          />
        </div>
      </section>
    </div>
  );
}