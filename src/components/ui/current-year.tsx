"use client";

import React, { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function CurrentYear() {
  const year = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear().toString(),
    () => "2026",
  );

  return <span>{year}</span>;
}
