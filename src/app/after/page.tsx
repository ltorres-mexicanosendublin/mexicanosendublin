import type { Metadata } from "next";
import AfterClient from "./AfterClient";

export const metadata: Metadata = {
  title: "Tacos en Dublín | After Mexicano (10pm–3am)",
  description:
    "Comida mexicana en Dublín: tacos al pastor, burritos, trompitos, refrescos y opciones de desayuno. Pedido por WhatsApp.",
  alternates: { canonical: "https://mexicanosendublin.com/after" },
};

export default function Page() {
  return <AfterClient />;
}
