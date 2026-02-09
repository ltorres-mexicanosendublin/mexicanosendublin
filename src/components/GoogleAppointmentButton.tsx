"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

type Props = {
  url: string;
  label?: string;
  color?: string;
};

export default function GoogleAppointmentButton({
  url,
  label = "Reservar una cita",
  color = "#039BE5",
}: Props) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // por si el script ya cargó antes
    const tryLoad = () => {
      // @ts-ignore
      if (typeof window !== "undefined" && window.calendar?.schedulingButton?.load && targetRef.current) {
        // @ts-ignore
        window.calendar.schedulingButton.load({
          url,
          color,
          label,
          target: targetRef.current,
        });
      }
    };

    tryLoad();
  }, [url, label, color]);

  return (
    <>
      {/* CSS oficial del botón */}
      <link
        href="https://calendar.google.com/calendar/scheduling-button-script.css"
        rel="stylesheet"
      />

      {/* Script oficial */}
      <Script
        src="https://calendar.google.com/calendar/scheduling-button-script.js"
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-ignore
          if (window.calendar?.schedulingButton?.load && targetRef.current) {
            // @ts-ignore
            window.calendar.schedulingButton.load({
              url,
              color,
              label,
              target: targetRef.current,
            });
          }
        }}
      />

      {/* Aquí se inyecta el botón */}
      <div ref={targetRef} />
    </>
  );
}
