//import Features from "./sections/features";
'use client'

import { Hero } from "./sections/hero";

export default function Page() {
  return (
    <main className={`min-h-screen bg-background text-foreground`}>
      <Hero />
    </main>
  );
}
