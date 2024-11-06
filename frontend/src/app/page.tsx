"use client";

import { useEffect, useState } from "react";
import Header from "./components/header/header";
import ProductCard from "./components/product-card/product-card";
import { getAllProducts } from "@/api/productApi";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();

      if (response.error) {
        alert(JSON.stringify(response, null, 2));
      } else {
        setProducts(response.data); // Armazenando os produtos no estado
        console.log(JSON.stringify(response, null, 2));
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <div style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.imagePath}
            nome={product.nome}
            preco={product.valor}
          />
        ))}
      </div>
    </>
  );
}
