import MainLayout from "../layouts/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <h1 style={{
        fontSize: "1.875rem",
        fontWeight: "bold",
        color: "#7a1f3d",
        fontFamily: "'Cormorant Garamond', serif",
        letterSpacing: "0.02em"
      }}>
        404 - Page Not Found
      </h1>
    </MainLayout>
  );
}