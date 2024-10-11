import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen bg-gradient-to-r from-slate-50 to-slate-300">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </section>
  );
}
