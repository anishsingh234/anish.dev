import Navbar from "@/components/Navbar";

export default function SubPagesLayout({ children }) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#0a0a0f] pt-0 mb-0 px-0">
      <Navbar />
      <div className="w-full">
        {children}
      </div>
    </main>
  );
}