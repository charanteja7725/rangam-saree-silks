import MainLayout from "../layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <section className="py-10">
      <h1 className="text-3xl font-bold underline">
          Welcome to Rangam Pure Silk Sarees
        </h1>
        <p className="mt-4 text-gray-600">
          Premium saree shopping experience with modern e-commerce features.
        </p>
      </section>
    </MainLayout>
  );
}