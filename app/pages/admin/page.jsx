"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/header/header";
import ProductCard from "@/app/components/product-card/product-card";
import WppContact from "@/app/components/wpp-contact/wpp-contatc";
import ProductModal from "@/app/components/product-modal/product-modal";
import Loading from "@/app/components/loading/loading";
import { Button, ContainerMain, Divisor, TextWpp } from "./style";

export default function Admin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [productVisible, setProductVisible] = useState(false);
  const [productDetails, setProductDetails] = useState({ id: '', imageId: '', sku: '', name: '', price: '', description: '' });
  const [isOpen, setIsOpen] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    const response = sessionStorage.getItem("user");
    if (response !== "admin") {
      router.push("/pages/auth");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handlerRouteCreateProduct = () => {
    router.push("product");
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!domLoaded) return null;

  return (
    <>
      {isLoading && <Loading />}

      <Header setSearchQuery={() => { }} setProducts={setProduct} visibleProduct={(isVisible) => setProductVisible(isVisible)} />

      <ProductModal isOpen={isOpen} isClose={closeModal} productDetails={productDetails}></ProductModal>

      <ContainerMain>
        <Button onClick={handlerRouteCreateProduct}>Cadastrar Produto</Button>

        <Divisor />

        {productVisible && <ProductCard onClick={openModal}
          key={product.id}
          imageId={product.imageId}
          sku={product.sku}
          name={product.name}
          price={product.price}
          description={product.description}
          setProductDetails={() => setProductDetails({
            id: product.id,
            imageId: product.imageId,
            sku: product.sku,
            name: product.name,
            price: product.price,
            description: product.description
          })}
        />}

      </ContainerMain>

      <TextWpp>
        Algum problema? <br />
        Entre em contato!
      </TextWpp>
      <WppContact />
    </>
  );
}
