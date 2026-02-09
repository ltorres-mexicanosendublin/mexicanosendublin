import "./globals.css";
import CartProvider from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-zinc-50 text-gray-900">

        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
