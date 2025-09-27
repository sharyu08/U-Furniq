"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Star, Plus, Minus, ShoppingCart, CreditCard, Heart } from "lucide-react";

export default function OrderModal({ product, isOpen, onClose, onAddToCart, onBuyNow }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!isOpen || !product) return null;

  const images = [product.image1, product.image2];
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity);
    onClose();
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Product Images */}
          <div className="lg:w-1/2 p-6">
            <div className="relative mb-4">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                width={500}
                height={400}
                className="w-full h-80 object-cover rounded-lg"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
              <button
                onClick={toggleWishlist}
                className={`absolute top-4 left-4 rounded-full p-2 shadow-lg transition-colors ${
                  isWishlisted ? 'bg-red-500 text-white' : 'bg-white hover:bg-gray-100'
                }`}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
            
            {/* Image Thumbnails */}
            <div className="flex gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-[#A0937D]' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 p-6 flex flex-col">
            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-[#A0937D]">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  You save {formatPrice(product.oldPrice - product.price)}
                </p>
              </div>

              {/* Product Attributes */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {product.material && (
                    <div>
                      <span className="text-gray-600">Material:</span>
                      <span className="ml-2 font-medium">{product.material}</span>
                    </div>
                  )}
                  {product.color && (
                    <div>
                      <span className="text-gray-600">Color:</span>
                      <span className="ml-2 font-medium">{product.color}</span>
                    </div>
                  )}
                  {product.style && (
                    <div>
                      <span className="text-gray-600">Style:</span>
                      <span className="ml-2 font-medium">{product.style}</span>
                    </div>
                  )}
                  {(product.seats || product.size || product.pieces) && (
                    <div>
                      <span className="text-gray-600">
                        {product.seats ? 'Seats:' : product.size ? 'Size:' : 'Pieces:'}
                      </span>
                      <span className="ml-2 font-medium">
                        {product.seats ? `${product.seats} Seater` : 
                         product.size ? product.size :
                         product.pieces ? `${product.pieces} Pieces` : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#A0937D] text-white py-3 px-6 rounded-lg hover:bg-[#8a826b] transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <CreditCard size={20} />
                  Buy Now
                </button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Total: <span className="font-semibold text-lg">{formatPrice(product.price * quantity)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
