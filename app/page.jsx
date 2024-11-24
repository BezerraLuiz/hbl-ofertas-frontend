'use client'

import React from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import WppContact from "./components/wpp-contact/wpp-contatc";
import ProductCard from "./components/product-card/product-card";
// import ProductModal from "./components/product-modal/product-modal";

export default function Home() {
  return (
    <>
      <Header/>

      <ProductCard></ProductCard>
      {/* <ProductModal></ProductModal> */}

      <WppContact/>
      <Footer/>
    </>
  );
}
