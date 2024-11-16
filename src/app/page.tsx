"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Header from "./components/header/header";
import ProductCard from "./components/product-card/product-card";
import { getAllProducts } from "@/api/productApi";
import Footer from "./components/footer/footer";
import Loading from "./components/loading/loading";

const WppContact = dynamic(() => import("@/app/components/wpp-contact/wpp-contatc"));
const ProductModal = dynamic(() => import("./components/product-modal/product-modal"));

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await getAllProducts();

      if (!response.error) {
        setProducts(response.message);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  function handleProductClick(product) {
    setSelectedProduct(product);
  }

  function handleCloseModal() {
    setSelectedProduct(null);
  }

  const filteredProducts = products.filter((product) =>
    product.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {isLoading && <Loading />}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
      <Header setSearchQuery={handleSearch} setProducts={setProducts} />
      
      <div
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.imagePath}
            nome={product.nome}
            preco={product.valor.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>

      <Footer />
      <WppContact />
    </>
  );
}
