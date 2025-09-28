"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Narrival from "../components/Narrival";
import Footer from "../components/Footer";

export default function NewArrivalPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#A0937D] to-[#8a826b] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              New Arrivals
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Discover our latest furniture collection with exclusive designs
            </p>
            <div className="flex justify-center">
              <span className="bg-white/20 text-white text-lg font-bold px-6 py-2 rounded-md inline-block tracking-wider">
                FRESH COLLECTION
              </span>
            </div>
          </div>
        </section>

        {/* New Arrival Products */}
        <section className="py-12">
          <Narrival />
        </section>
      </main>
      <Footer />
    </div>
  );
}
