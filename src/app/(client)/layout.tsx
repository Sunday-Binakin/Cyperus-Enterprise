import Footer from "../components/clients/Footer";
import FloatingWhatsApp from "../components/clients/FloatingWhatsAppButton";
import { Toaster } from "sonner";
import { geist } from '@/app/fonts';
import Providers from "../components/clients/Providers";
import ClientOnlyHeader from "../components/clients/ClientOnlyHeader";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={geist.className}>
      <Providers>
        <ClientOnlyHeader/>
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <Toaster position="top-center" />
      </Providers>
    </div>
  );
}
