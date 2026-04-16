export default function Footer() {
  return (
    <footer className="mt-16 bg-[#7a1f3d] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        
        {/* Top Section */}
        <div className="mb-6 flex flex-col items-center justify-between gap-6 md:flex-row">
          <h2 className="text-2xl font-bold tracking-wide">
            RANGAM
          </h2>

          <div className="flex gap-6 text-sm">
            <p className="hover:text-[#f3d27a] cursor-pointer transition">Home</p>
            <p className="hover:text-[#f3d27a] cursor-pointer transition">Products</p>
            <p className="hover:text-[#f3d27a] cursor-pointer transition">Cart</p>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 h-[1px] w-full bg-white/20"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/80 md:flex-row">
          <p>© 2026 Rangam Saree Silks. All rights reserved.</p>

          <p className="text-[#f3d27a]">
            Crafted with elegance ✨
          </p>
        </div>
      </div>
    </footer>
  );
}