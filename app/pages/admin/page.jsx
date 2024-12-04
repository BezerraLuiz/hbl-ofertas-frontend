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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

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

  return (
    <>
      {isLoading && <Loading />}
      {isModalOpen &&
        <ProductModal />
      }

      <Header />

      <ContainerMain>
        <Button onClick={handlerRouteCreateProduct}>Cadastrar Produto</Button>

        <Divisor />

        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.imagePath}
            nome={product.nome}
            preco={product.valor}
          />
        ))}

      </ContainerMain>

      <TextWpp>
        Algum problema? <br />
        Entre em contato!
      </TextWpp>
      <WppContact />
    </>
  );
}
