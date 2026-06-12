"use client";
import React from 'react';

import dynamic from "next/dynamic";

const ServicesManager = dynamic(() => import('./_components/ServicesManager'), {
  ssr: false,
});

export default function CustomerServicesPage() {
  return <ServicesManager />;
}
