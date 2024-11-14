"use client";

import { useEffect, useState } from "react";
import Header from "./components/header/header";
import ProductCard from "./components/product-card/product-card";
import { getAllProducts } from "@/api/productApi";
import WppContact from "@/app/components/wpp-contact/wpp-contatc";
import Footer from "./components/footer/footer";
import Loading from "./components/loading/loading";
import ProductModal from "./components/product-modal/product-modal";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchProducts = async () => {
      const response = await getAllProducts();

      if (response.error) {
        alert(JSON.stringify(response, null, 2));
      } else {
        setProducts(response.data);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    fetchProducts();
  }, []);

  function handleProductClick(product) {
    setSelectedProduct(product);
  }

  function handleCloseModal() {
    setSelectedProduct(null);
  }

  return (
    <>
      {isLoading && <Loading />}

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}

      <Header setSearchQuery={setSearchQuery} setProducts={setProduct} />
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
        {products
          .filter((product) =>
            product.nome.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
            <ProductCard
              key={product.id}
              image={product.imagePath}
              nome={product.nome}
              preco={product.valor.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              onClick={() => handleProductClick(product)} // Passa o produto para o modal
            />
          ))}
      </div>

      <Footer />
      <WppContact />
    </>
  );
}
