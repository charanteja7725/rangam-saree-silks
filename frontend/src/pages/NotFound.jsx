import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex min-h-[70vh] items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl rounded-3xl bg-white p-10 text-center shadow-xl">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#b88917]">
            Oops
          </p>

          <h1 className="mb-4 text-5xl font-bold text-[#7a1f3d] md:text-6xl">
            404
          </h1>

          <h2 className="mb-4 text-2xl font-semibold text-[#4b2e2e]">
            Page Not Found
          </h2>

          <p className="mb-8 text-[#5c4033]">
            The page you are looking for does not exist or may have been moved.
          </p>

          <Link
            to="/"
            className="inline-block rounded-xl bg-[#7a1f3d] px-6 py-3 font-medium text-white shadow-md transition hover:bg-[#5f1730] hover:shadow-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}