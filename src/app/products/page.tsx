"use client";
import ProductImages from "../components/ProductImages";
import ProductAccordion from "../components/ProductAccordion";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
        {/*IMG */}
        <div className=" w-full lg:w-1/2 lg:sticky top-20 h-max ">
          <ProductImages />
        </div>
        {/* TEXTS */}
        <div className="flex flex-col gap-6">
          {/* Title */}
          <h1 className="text-2xl font-semibold">
            Miraya Modern 2pc Book End Polyresin Hand Finished Terracotta 26cm
            by Living Essence
          </h1>

          {/* Brand */}
          <p className="text-gray-500">HomeTown</p>

          {/* Price Section */}
          <div>
            <p className="line-through text-gray-400 text-lg">₹1,895</p>
            <p className="text-2xl font-bold text-black">
              ₹1,137 <span className="text-red-600 text-lg">40% off</span>
            </p>
            <p className="text-sm text-gray-600">
              (Inclusive of all prices). Tax included.{" "}
              <span className="underline cursor-pointer">Shipping</span>{" "}
              calculated at checkout.
            </p>
          </div>

          {/* Quantity + Stock */}
          {/* <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={decreaseQty}
                  className="px-3 py-1 border-r hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={increaseQty}
                  className="px-3 py-1 border-l hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-red-600 text-sm">Low stock</p>
          </div>

          <div className="flex gap-4">
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-semibold">
              Buy It Now
            </button>
            <button className="bg-[#ab886d] hover:bg-[#8b6d55] text-white px-6 py-3 rounded-md font-semibold">
              Add To Cart
            </button>
          </div> */}

          <Heart className="cursor-pointer hover:text-red-600" size={22} />

          {/* Warranty + Delivery Info */}
          <div className="flex gap-6 mt-6">
            <div className="text-center">
              <p className="font-medium">1 year warranty</p>
            </div>
            <div className="text-center">
              <p className="font-medium">Free delivery</p>
            </div>
            <div className="text-center">
              <p className="font-medium">Free installation</p>
            </div>
          </div>

          {/* ✅ Product Detail section */}
          {/* <DeliveryInfo /> */}
          {/* ✅ Product Accordion */}
          <ProductAccordion />
        </div>
      </div>
    </>
  );
}
