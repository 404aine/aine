"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestorer() {
  const pathname = usePathname();

  // Evita que el navegador haga restauración brusca
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // Guarda y restaura scroll por ruta
  useEffect(() => {
    const key = `scroll:${pathname}`;

    // Restaurar cuando entras en la ruta
    const saved = sessionStorage.getItem(key);
    if (saved) {
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(saved, 10));
      });
    }

    // Guardar cuando haces scroll
    const onScroll = () => {
      sessionStorage.setItem(key, String(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
