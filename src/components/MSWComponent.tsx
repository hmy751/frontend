"use client";

import { useEffect } from "react";
import { worker } from "@/mocks/browser";

export const MSWComponent = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MSW) {
      worker.start({ quiet: false });
    }
  }, []);

  return null;
};
