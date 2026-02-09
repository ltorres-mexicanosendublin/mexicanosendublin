import Link from "next/link";

export const metadata = {
  title: "IRP en Irlanda: qué es y cómo tramitarlo | Mexicanos en Dublín",
  description:
    "Guía práctica para mexicanos: qué es el IRP, qué significa Stamp 2, costos, documentos, solvencia económica y pasos para tramitarlo en Irlanda.",
};

export default function IrpGuidePage() {
  
  return (
    
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* Top nav */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/guias" className="text-sm underline text-gray-600">
          ← Volver a guías
        </Link>

        <div className="flex items-center gap-3 text-sm">
          <Link href="/" className="underline text-gray-600">
            Home
          </Link>
          <Link href="/unirme" className="underline text-gray-600">
            Unirme
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="mt-6 rounded-3xl border bg-white p-6 sm:p-10">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="pill">Trámites</span>
          <span className="text-xs text-gray-500">Lectura: 10–12 min</span>
          <span className="text-xs text-gray-500">Actualizado: 2026</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          IRP en Irlanda: qué es y cómo tramitarlo (Stamp 2)
        </h1>

        <p className="mt-3 text-gray-600">
          Si vienes a Irlanda a estudiar, trabajar o vivir por un tiempo, el{" "}
          <strong>IRP</strong> es uno de los trámites más importantes. Aquí te
          explicamos qué es, cuánto cuesta, qué documentos necesitas y cómo
          planear tu solvencia económica para evitar errores comunes.
        </p>

        <div className="mt-8 space-y-10 text-gray-800">
  {/* Para quién es / Para quién NO */}
  <section className="grid gap-4 md:grid-cols-2">
    <div className="rounded-3xl border bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">¿Para quién es esta guía?</h2>
      <p className="mt-2 text-sm text-gray-700">
        Para estudiantes de <strong>América Latina</strong> que vienen a Irlanda a estudiar inglés y quieren
        tramitar <strong>Stamp 2</strong> (permiso de estudiante) al llegar.
      </p>

      <div className="mt-4 rounded-2xl border bg-gray-50 p-4 text-sm text-gray-700">
        <p className="font-semibold text-gray-900">Aplica especialmente si:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Vienes de un país con <strong>exención de visa</strong> (ej: México, Chile, Argentina, Uruguay, etc.).</li>
          <li>Entrarás sin visa previa y después harás el registro.</li>
          <li>Tu curso es de <strong>mínimo 25 semanas</strong>.</li>
        </ul>
      </div>

      <div className="mt-4 rounded-2xl border bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Importante:</strong> normalmente debes llegar con tu curso <strong>pagado</strong> y
        carta oficial de la escuela para poder registrarte sin problemas.
      </div>
    </div>

    <div className="rounded-3xl border bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">¿Para quién NO es esta guía?</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
        <li>
          Ciudadanos de la <strong>Unión Europea</strong> (o LATAM con pasaporte UE): no necesitan Stamp 2 para vivir/trabajar.
        </li>
        <li>
          Personas que viajan con <strong>cursos cortos (3 meses o menos)</strong>.
        </li>
        <li>
          Si tu nacionalidad <strong>requiere visa</strong>, esta guía no cubre el proceso de visa de entrada (aunque sí puedes
          recibir Stamp 2 después de registrarte en Irlanda).
        </li>
      </ul>

      <div className="mt-4 rounded-2xl border bg-gray-50 p-4 text-sm text-gray-700">
        <p className="font-semibold text-gray-900">Tip:</p>
        <p className="mt-1">
          Si no estás seguro si tu caso aplica, conviene validar tu situación antes de pagar cosas “a ciegas”.
        </p>
      </div>
    </div>
  </section>

  {/* Stamp 2 en simple */}
  <section className="rounded-3xl border bg-white p-6 sm:p-8">
    <h2 className="text-xl font-semibold text-gray-900">¿Qué es el Permiso Stamp 2? (en simple)</h2>
    <p className="mt-3 text-gray-700">
      El <strong>Stamp 2</strong> es el permiso de estudiante para no-EEE que te permite
      <strong> estudiar legalmente</strong> y <strong>trabajar con límites</strong>.
      Mucha gente le dice “visa de estudiante”, pero en la práctica es un <strong>permiso de residencia</strong> que obtienes
      al registrarte con inmigración en Irlanda.
    </p>

    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border bg-gray-50 p-5">
        <p className="font-semibold text-gray-900">Con Stamp 2 normalmente puedes</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>Estudiar en un curso elegible.</li>
          <li>Trabajar hasta <strong>20 horas/semana</strong> en periodo lectivo.</li>
          <li>Trabajar hasta <strong>40 horas/semana</strong> en periodos oficiales de vacaciones.</li>
        </ul>
      </div>

      <div className="rounded-2xl border bg-gray-50 p-5">
        <p className="font-semibold text-gray-900">Y ojo con esto</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>El permiso está ligado a tu curso/escuela.</li>
          <li>La asistencia importa (mucho).</li>
          <li>No es “trabajo full-time todo el año”.</li>
        </ul>
      </div>
    </div>
  </section>

  {/* Tabla pro */}
  <section className="rounded-3xl border bg-white p-6 sm:p-8">
    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="text-xl font-semibold text-gray-900">Stamp 2: resumen rápido</h2>
      <p className="text-xs text-gray-500">*Dato guía: puede cambiar según actualizaciones oficiales.</p>
    </div>

    <div className="mt-4 grid overflow-hidden rounded-2xl border bg-white sm:grid-cols-2">
      {[
        ["Estatus legal", "Permiso de residencia temporal (no es visa)."],
        ["Curso requerido", "Curso a tiempo completo, normalmente 25 semanas (según elegibilidad)."],
        ["Derechos de trabajo", "20h/sem (clases) · 40h/sem (vacaciones oficiales)."],
        ["Tasa de registro", "€300 (en el registro)."],
        ["Prueba de fondos", "Se puede pedir evidencia de fondos disponibles al llegar (según lineamientos)."],
        ["Primer registro", "Centralizado en Dublín (Burgh Quay) para primeros registros."],
      ].map(([k, v]) => (
        <div key={k} className="border-b p-4 sm:border-b-0 sm:border-r last:border-r-0">
          <p className="text-xs font-semibold text-gray-500">{k}</p>
          <p className="mt-1 text-sm font-medium text-gray-900">{v}</p>
        </div>
      ))}
    </div>
  </section>

  {/* Pasos */}
  <section className="rounded-3xl border bg-white p-6 sm:p-8">
    <h2 className="text-xl font-semibold text-gray-900">Proceso paso a paso (primera vez)</h2>

    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {[
        ["1", "Antes de viajar", "Inscríbete en un curso elegible y lleva tu carta de aceptación + comprobante de pago."],
        ["2", "Llegada a Irlanda", "Entra al país y guarda evidencia de tu entrada/estancia (sellos/correos/confirmaciones)."],
        ["3", "Cuenta en el portal", "Creas tu cuenta en el portal oficial y solicitas tu cita de registro."],
        ["4", "Prepara documentos", "Pasaporte, carta de escuela, seguro médico, fondos, cita confirmada, etc."],
        ["5", "Asistes a la cita", "Presentas documentos, pagas tasa, biométricos (foto/huellas)."],
        ["6", "Recibes Stamp 2", "Te sellan el permiso y después llega tu tarjeta IRP por correo."],
      ].map(([n, t, d]) => (
        <div key={n} className="rounded-2xl border bg-gray-50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border bg-white text-sm font-bold">
              {n}
            </div>
            <p className="font-semibold text-gray-900">{t}</p>
          </div>
          <p className="mt-2 text-sm text-gray-700">{d}</p>
        </div>
      ))}
    </div>

    {/* Tu botón al portal (mejor colocado) */}
    <div className="mt-6 rounded-2xl border bg-gray-50 p-5">
      <p className="text-sm font-semibold text-gray-900">Portal oficial</p>
      <p className="mt-1 text-sm text-gray-700">
        Usa el portal para crear cuenta, solicitar cita y dar seguimiento.
      </p>

      <a
        href="https://portal.irishimmigration.ie/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
      >
        Ir al portal oficial de inmigración →
      </a>

      <p className="mt-2 text-xs text-gray-500">
        Tip: mejor link corto (evita URLs gigantes en tu código).
      </p>
    </div>
  </section>

  {/* Documentos */}
  <section className="rounded-3xl border bg-white p-6 sm:p-8">
    <h2 className="text-xl font-semibold text-gray-900">Checklist de documentos (para tu cita)</h2>
    <p className="mt-2 text-gray-700">
      Lleva todo <strong>impreso</strong> cuando sea posible (reduce estrés).
    </p>

    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {[
        "Pasaporte vigente",
        "Carta oficial de la escuela (aceptación)",
        "Comprobante de pago del curso",
        "Seguro médico (evidencia en inglés)",
        "Prueba de fondos (según lineamientos vigentes)",
        "Confirmación de cita / correo del sistema",
      ].map((x) => (
        <div key={x} className="flex items-start gap-3 rounded-2xl border bg-gray-50 p-4">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border bg-white text-xs">
            ✓
          </span>
          <p className="text-sm text-gray-700">{x}</p>
        </div>
      ))}
    </div>

    <div className="mt-5 rounded-2xl border bg-emerald-50 p-4 text-sm text-emerald-900">
      Tip real: muchas escuelas te ayudan a imprimir en recepción si lo pides con tiempo.
    </div>
  </section>

  {/* Trabajo */}
  <section className="rounded-3xl border bg-white p-6 sm:p-8">
    <h2 className="text-xl font-semibold text-gray-900">¿Puedo trabajar con Stamp 2?</h2>
    <p className="mt-2 text-gray-700">
      Sí, pero con límites. En general:
    </p>

    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border bg-gray-50 p-5">
        <p className="font-semibold text-gray-900">Durante clases</p>
        <p className="mt-2 text-sm text-gray-700">
          Hasta <strong>20 horas por semana</strong>.
        </p>
      </div>

      <div className="rounded-2xl border bg-gray-50 p-5">
        <p className="font-semibold text-gray-900">Vacaciones oficiales</p>
        <p className="mt-2 text-sm text-gray-700">
          Hasta <strong>40 horas por semana</strong>.
        </p>
      </div>
    </div>

    <div className="mt-5 rounded-2xl border bg-amber-50 p-4 text-sm text-amber-900">
      <strong>Ojo:</strong> para trabajar vas a necesitar PPS y cumplir reglas fiscales/laborales.
    </div>
  </section>

  {/* Renovación */}
  <section className="rounded-3xl border bg-white p-6 sm:p-8">
    <h2 className="text-xl font-semibold text-gray-900">Renovación del IRP</h2>
    <p className="mt-2 text-gray-700">
      La renovación muchas veces se hace <strong>en línea</strong> (según el flujo vigente).
      Normalmente tendrás que:
    </p>

    <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
      <li>Inscribirte a un nuevo curso elegible.</li>
      <li>Mantener asistencia (ej. 85%+ si aplica en tu programa).</li>
      <li>Contar con seguro médico vigente.</li>
      <li>Pagar la tasa correspondiente.</li>
    </ul>

    <div className="mt-4 rounded-2xl border bg-gray-50 p-4 text-sm text-gray-700">
      Importante: el proceso puede cambiar. Siempre revisa el flujo oficial actualizado.
    </div>
  </section>

  {/* CTA final */}
  <section>
    <div className="rounded-3xl border bg-gray-50 p-6">
      <h2 className="text-lg font-semibold text-gray-900">Nota importante (sin humo)</h2>
      <p className="mt-2 text-sm text-gray-700">
        Esta guía es informativa y está hecha para ayudarte a entender el proceso.
        <strong> No somos inmigración ni una agencia</strong>. Las reglas pueden cambiar y la decisión final depende de las autoridades.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Link href="/guias" className="btn btn-outline text-center">
          Ver más guías
        </Link>
        <Link href="/unirme" className="btn btn-primary text-center">
          Unirme a la comunidad
        </Link>
      </div>
    </div>
  </section>

  {/* Mapa (tu bloque, solo con más aire) */}
  <section className="mt-2">
    <div className="rounded-3xl border bg-white p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">📍 Burgh Quay (referencia)</h2>
          <p className="text-sm text-gray-600">
            Úsalo para medir tiempos reales desde posibles habitaciones/zonas.
          </p>
        </div>

        <a
          href="https://maps.app.goo.gl/zv3tCB38kFydTJJM7"
          target="_blank"
          rel="noreferrer"
          className="text-sm underline text-gray-600"
        >
          Abrir en Google Maps →
        </a>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border">
        <iframe
          title="Ubicación en Dublín"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2381.772193849196!2d-6.2561619!3d53.347334!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e856b125f6f%3A0xe9816e79fec1ec94!2sImmigration%20Service%20Delivery!5e0!3m2!1ses!2sie!4v1770075361194!5m2!1ses!2sie"
          width="100%"
          height="420"
          loading="lazy"
          style={{ border: 0 }}
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Tip real: compara tiempos en bus/Luas caminando antes de elegir zona.
      </p>
    </div>
  </section>
</div>

      </article>
    </main>
  );
}