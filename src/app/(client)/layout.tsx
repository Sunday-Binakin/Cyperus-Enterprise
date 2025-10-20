import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/shared/FloatingWhatsAppButton";
import { Toaster } from "sonner";
import { geist } from '@/app/fonts';
import Providers from "@/components/shared/Providers";
import ClientOnlyHeader from "@/components/shared/ClientOnlyHeader";

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
