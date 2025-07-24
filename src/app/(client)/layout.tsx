import ClientOnlyHeader from "../components/clients/ClientOnlyHeader";
import Footer from "../components/clients/Footer";
import FloatingWhatsApp from "../components/clients/FloatingWhatsAppButton";
import { CartProvider } from "@/app/context/CartContext";
import { AuthProvider } from "@/app/context/AuthContext";
import { Toaster } from "sonner";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <ClientOnlyHeader/>
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </CartProvider>
      </AuthProvider>
      <Toaster position="top-center" />
    </>
  );
}
