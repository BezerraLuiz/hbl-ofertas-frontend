"use client";

import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import { useRouter } from "next/navigation";
import { Button, ContainerMain, Divisor } from "./style";
import ProductCard from "@/app/components/product-card/product-card";

export default function Admin() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const response = sessionStorage.getItem("user");
    if (response !== "admin") {
      router.push("/pages/auth");
    }
  }, [router]);

  return (
    <>
      <Header setSearchQuery={setSearchQuery} setProducts={setProducts} />

      <ContainerMain>
        <Button>Cadastrar Produto</Button>

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
    </>
  );
}
