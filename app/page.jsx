'use client'

import { React, useState, useEffect } from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import WppContact from "./components/wpp-contact/wpp-contatc";
import ProductCard from "./components/product-card/product-card";
import ProductModal from "./components/product-modal/product-modal";
import './styles/globals.css'
import { getAllProducts } from "@/api/Products/ProductsApi";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts();
      
      if (res.error == true) {
        alert(JSON.stringify(res, null, 2));
      } else {
        setProducts(res.message);
        console.log(JSON.stringify(res, null, 2));
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />

      <ProductModal isOpen={isOpen} isClose={closeModal}></ProductModal>

      <div className="div-products">
      <ProductCard onClick={ openModal } />
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.imagePath}
            nome={product.nome}
            preco={product.valor}
          />
        ))}
      </div>

      <WppContact />
      <Footer />
    </>
  );
}
