"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const products = [
  {
    id: 1,
    name: "Waddington Fabric Sofa",
    price: "₹14,900",
    oldPrice: "₹36,900",
    discount: "59% Off",
    image1: "/images/14 image.webp",
    image2: "/images/15 image.webp",
    description: "Premium fabric sofa with modern design and comfortable seating",
    material: "Premium Fabric",
    color: "Beige",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    stockCount: 15,
  },
  {
    id: 2,
    name: "Garcia Fabric Sofa",
    price: "₹18,500",
    oldPrice: "₹32,000",
    discount: "42% Off",
    image1: "/images/16 image.webp",
    image2: "/images/17 image.webp",
    description: "Elegant fabric sofa with contemporary styling",
    material: "Premium Fabric",
    color: "Gray",
    rating: 4.3,
    reviews: 95,
    inStock: true,
    stockCount: 8,
  },
  {
    id: 3,
    name: "Zyra Fabric Sofa",
    price: "₹25,999",
    oldPrice: "₹41,999",
    discount: "38% Off",
    image1: "/images/22 image.webp",
    image2: "/images/18 image.webp",
    description: "Luxurious fabric sofa with premium comfort",
    material: "Premium Fabric",
    color: "Navy Blue",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    stockCount: 12,
  },
  {
    id: 4,
    name: "Orlando Fabric Sofa",
    price: "₹21,999",
    oldPrice: "₹34,999",
    discount: "37% Off",
    image1: "/images/24 image.webp",
    image2: "/images/21 image.jpg",
    description: "Modern fabric sofa with sleek design",
    material: "Premium Fabric",
    color: "Charcoal",
    rating: 4.4,
    reviews: 89,
    inStock: true,
    stockCount: 6,
  },
  {
    id: 5,
    name: "Lorenzo Fabric Sofa",
    price: "₹6,999",
    oldPrice: "₹11,999",
    discount: "41% Off",
    image1: "/images/27 image.webp",
    image2: "/images/28 image.webp",
    description: "Compact fabric sofa perfect for small spaces",
    material: "Premium Fabric",
    color: "Cream",
    rating: 4.2,
    reviews: 73,
    inStock: true,
    stockCount: 20,
  },
  {
    id: 6,
    name: "Astra Recliner Sofa",
    price: "₹19,499",
    oldPrice: "₹28,499",
    discount: "32% Off",
    image1: "/images/29 image.webp",
    image2: "/images/30 image.webp",
    description: "Premium recliner sofa with adjustable positions",
    material: "Premium Fabric",
    color: "Brown",
    rating: 4.6,
    reviews: 142,
    inStock: true,
    stockCount: 9,
  },
  {
    id: 7,
    name: "Harper Recliner Sofa",
    price: "₹7,500",
    oldPrice: "₹13,500",
    discount: "44% Off",
    image1: "/images/34 image.webp",
    image2: "/images/33 image.webp",
    description: "Comfortable recliner sofa with modern features",
    material: "Premium Fabric",
    color: "Black",
    rating: 4.1,
    reviews: 67,
    inStock: true,
    stockCount: 14,
  },
  {
    id: 8,
    name: "Alto Leather Sofa",
    price: "₹18,999",
    oldPrice: "₹29,999",
    discount: "37% Off",
    image1: "/images/26 image.webp",
    image2: "/images/23 image.webp",
    description: "Luxurious leather sofa with premium finish",
    material: "Genuine Leather",
    color: "Brown",
    rating: 4.8,
    reviews: 201,
    inStock: true,
    stockCount: 5,
  },
  {
    id: 9,
    name: "Venice Fabric Sofa",
    price: "₹9,499",
    oldPrice: "₹15,999",
    discount: "40% Off",
    image1: "/images/18 image.webp",
    image2: "/images/19 image.jpg",
    description: "Stylish fabric sofa with elegant design",
    material: "Premium Fabric",
    color: "Teal",
    rating: 4.3,
    reviews: 98,
    inStock: true,
    stockCount: 11,
  },
  {
    id: 10,
    name: "Oslo Fabric Sofa",
    price: "₹13,499",
    oldPrice: "₹22,499",
    discount: "40% Off",
    image1: "/images/Baltimor_1Set_HD.webp",
    image2: "/images/Baltimor_9.webp",
    description: "Contemporary fabric sofa with Scandinavian design",
    material: "Premium Fabric",
    color: "White",
    rating: 4.5,
    reviews: 167,
    inStock: true,
    stockCount: 7,
  },
];

export default function ProductCard() {
  const scrollRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 350;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setIsWishlisted(false);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
    setIsWishlisted(false);
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => {
      const newQuantity = prev + change;
      if (newQuantity < 1) return 1;
      if (newQuantity > selectedProduct?.stockCount) return selectedProduct?.stockCount || 1;
      return newQuantity;
    });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleBuyNow = () => {
    // Handle buy now logic
    console.log(`Buying ${quantity} of ${selectedProduct.name}`);
    closeModal();
  };

  const handleAddToCart = () => {
    // Handle add to cart logic
    console.log(`Adding ${quantity} of ${selectedProduct.name} to cart`);
    closeModal();
  };

  return (
    <section className="py-8 px-3 sm:px-6" style={{ background: "#FAFAFA" }}>
      <div className="relative">
        {/* Product List */}
        <div
          className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 scroll-smooth"
          ref={scrollRef}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none w-[240px] sm:w-[280px] md:w-[325px] min-h-[400px] sm:min-h-[430px] md:min-h-[460px] 
              bg-white rounded-xl sm:rounded-2xl border border-[#EFEFEF] shadow flex flex-col justify-between relative"
            >
              {/* Discount badge */}
              <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#A0937D] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded shadow z-10">
                {product.discount}
              </span>

              {/* Product image area with hover swap */}
              <div className="relative w-full flex-grow flex items-center justify-center py-6 sm:py-8 group cursor-pointer">
                <div className="relative h-[220px] w-[80%] mx-auto">
                  <Image
                    src={product.image1}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity rounded-lg group-hover:opacity-0"
                  />
                  <Image
                    src={product.image2}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>

              {/* DETAILS & Button */}
              <div className="flex flex-col gap-1 sm:gap-2 px-4 sm:px-6 md:px-8 mb-5 sm:mb-6 md:mb-7">
                <div className="text-sm sm:text-base md:text-[17px] font-medium text-gray-900">
                  {product.name}
                </div>
                <div className="mb-3 sm:mb-4 text-sm sm:text-base text-[#a0937d] font-semibold">
                  {product.price}
                </div>
                <button
                  className="w-full text-white font-semibold text-sm sm:text-base py-2 sm:py-2.5 rounded-lg border transition-colors"
                  style={{
                    backgroundColor: "#A0937D",
                    borderColor: "#A0937D",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#8a826b";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#A0937D";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onClick={() => openModal(product)}
                >
                  + Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg z-10 hidden sm:block"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg z-10 hidden sm:block"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col lg:flex-row">
              {/* Product Images */}
              <div className="lg:w-1/2 p-6">
                <div className="relative h-80 lg:h-96 mb-4">
                  <Image
                    src={selectedProduct.image1}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex space-x-2">
                  <div className="relative w-20 h-20">
                    <Image
                      src={selectedProduct.image1}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover rounded-lg cursor-pointer"
                    />
                  </div>
                  <div className="relative w-20 h-20">
                    <Image
                      src={selectedProduct.image2}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(selectedProduct.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-[#A0937D]">
                      {selectedProduct.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {selectedProduct.oldPrice}
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                      {selectedProduct.discount}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4">{selectedProduct.description}</p>

                {/* Product Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Material:</span>
                    <p className="text-gray-900">{selectedProduct.material}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Color:</span>
                    <p className="text-gray-900">{selectedProduct.color}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Stock:</span>
                    <p className="text-gray-900">{selectedProduct.stockCount} available</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Status:</span>
                    <p className={`${selectedProduct.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity:
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      disabled={quantity >= selectedProduct.stockCount}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={toggleWishlist}
                  className={`w-full py-3 px-4 rounded-lg border-2 font-medium mb-4 transition-colors ${
                    isWishlisted
                      ? "bg-red-50 border-red-300 text-red-700 hover:bg-red-100"
                      : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {isWishlisted ? "❤️ Added to Wishlist" : "🤍 Add to Wishlist"}
                </button>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3 px-4 text-white rounded-lg font-medium transition-colors"
                    style={{ backgroundColor: "#A0937D" }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#8a826b";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "#A0937D";
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}