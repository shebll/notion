"use client";
import { useUser } from "@clerk/clerk-react";
import Heading from "./_components/heading";
import Heros from "./_components/heros";

function MarketingPage() {
  const { user } = useUser();

  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex flex-col justify-center items-center gap-y-8 text-center flex-1 max-w-5xl mx-auto px-6">
        <Heading />
        <Heros />
      </div>
    </section>
  );
}

export default MarketingPage;
