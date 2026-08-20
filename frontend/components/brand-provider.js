"use client";

import { useEffect } from "react";
import { applyBrand, getBrand } from "@/lib/branding";

export function BrandProvider({ children }) {
  useEffect(() => {
    applyBrand(getBrand());
  }, []);

  return children;
}
