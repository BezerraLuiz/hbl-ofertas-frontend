"use client";

import { useEffect, useState } from "react";
import Header from "./components/header/header";
import ProductCard from "./components/product-card/product-card";
import { getAllProducts } from "@/api/productApi";
import WppContact from "@/app/components/wpp-contact/wpp-contatc";
import Footer from "./components/footer/footer";
import Loading from "./components/loading/loading";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();

      if (response.error) {
        alert(JSON.stringify(response, null, 2));
      } else {
        setProducts(response.data);
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    fetchProducts();
  }, []);

  return (
    <>
      {isLoading && <Loading />}

      <Header setSearchQuery={setSearchQuery} />
      <div style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      }}>
        {products
          .filter((product) =>
            product.nome.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
            <ProductCard
              key={product.id}
              image={product.imagePath}
              nome={product.nome}
              preco={product.valor}
            />
          ))}
      </div>

      <Footer />
      <WppContact />
    </>
  );
}
