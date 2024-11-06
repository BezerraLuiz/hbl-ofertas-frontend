"use client";

import Header from "./components/header/header";
import ProductCard from "./components/product-card/product-card";

export default function Home() {
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
        <ProductCard />
      </div>
    </>
  );
}
