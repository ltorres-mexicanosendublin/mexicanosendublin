import { Suspense } from "react";
import FormClient from "./FormClient";

export const dynamic = "force-dynamic"; // ✅ ahora sí sirve

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Cargando formulario...</div>}>
      <FormClient />
    </Suspense>
  );
}
