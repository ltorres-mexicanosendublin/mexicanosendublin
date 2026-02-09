import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-semibold">MexicanosEnDublin.com</p>
            <p className="mt-2 text-sm text-gray-600">
              Guías, comunidad y servicios de confianza para mexicanos viviendo (o por llegar) a Dublín.
            </p>
            <p className="mt-3 text-xs text-gray-500">
              Aviso: No somos autoridad gubernamental. No manejamos depósitos de renta.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Explora</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link className="hover:underline" href="/guias">Guías</Link></li>
              <li><Link className="hover:underline" href="/directorio">Directorio</Link></li>
              <li><Link className="hover:underline" href="/recursos">Recursos</Link></li>
              <li><Link className="hover:underline" href="/comunidad">Comunidad</Link></li>
              <li><Link className="hover:underline" href="/productos">Productos</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Servicios</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link className="hover:underline" href="/renta-verificada">Renta verificada</Link></li>
              <li><Link className="hover:underline" href="/asesoria">Asesoría</Link></li>
              <li><Link className="hover:underline" href="/guias#premium">Guías premium</Link></li>
              <li><Link className="hover:underline" href="/contacto">Contacto</Link></li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-xs text-gray-500">
          © {new Date().getFullYear()} MexicanosEnDublin. Hecho con ❤️ en Irlanda.
        </p>
      </div>
    </footer>
  );
}
