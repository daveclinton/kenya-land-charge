import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen bg-gradient-to-r from-sky-50 to-sky-200">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </section>
  );
}
