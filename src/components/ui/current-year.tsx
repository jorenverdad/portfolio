'use client';

import React, { useState, useEffect } from 'react';

export function CurrentYear() {
  const [year, setYear] = useState('2026');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return <span>{year}</span>;
}
