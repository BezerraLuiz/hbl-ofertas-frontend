'use client'

import { React, useState, useEffect } from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import WppContact from "./components/wpp-contact/wpp-contatc";
import ProductCard from "./components/product-card/product-card";
import ProductModal from "./components/product-modal/product-modal";
import ErrorComponent from "./components/error/error";
import './styles/globals.css'
import { getAllProducts } from "@/api/Products/ProductsApi";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({ imageId: '', sku: '', name: '', price: '', description: '' });
  const [isError, setIsError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts();

      if (res.error == true) {
        setIsError(true);
        setMessageError(res.message);
      } else {
        setProducts(res.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {isError && <ErrorComponent message={messageError} />}
      <Header setSearchQuery={setSearchQuery} setProducts={setProducts}/>

      <ProductModal isOpen={isOpen} isClose={closeModal} productDetails={productDetails}></ProductModal>

      <div className="div-products">
        {products
          .filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
            <ProductCard onClick={openModal}
              key={product.id}
              imageId={product.imageId}
              sku={product.sku}
              name={product.name}
              price={product.price}
              description={product.description}
              setProductDetails={() => setProductDetails({
                imageId: product.imageId,
                sku: product.sku,
                name: product.name,
                price: product.price,
                description: product.description
              })}
            />
          ))}
      </div>

      <WppContact />
      <Footer />
    </>
  );
}
