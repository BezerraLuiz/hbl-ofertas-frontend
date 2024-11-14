"use client";

import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import { useRouter } from "next/navigation";
import { Button, ContainerMain, Divisor, TextWpp } from "./style";
import ProductCard from "@/app/components/product-card/product-card";
import WppContact from "@/app/components/wpp-contact/wpp-contatc";
import ProductModal from "@/app/components/product-modal/product-modal";
import Loading from "@/app/components/loading/loading";

export default function Admin() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [])

  useEffect(() => {
    const response = sessionStorage.getItem("user");
    if (response !== "admin") {
      router.push("/pages/auth");
    }
  }, [router]);

  function rotaCadastroProduto() {
    router.push("/pages/create%product");
  }

  function handleProductClick(product) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }

  return (
    <>
      {isLoading && <Loading />}

      {isModalOpen && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}

      <Header setSearchQuery={setSearchQuery} setProducts={setProducts} />

      <ContainerMain>
        <Button onClick={rotaCadastroProduto}>Cadastrar Produto</Button>

        <Divisor />

        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.imagePath}
            nome={product.nome}
            preco={product.valor}
            onClick={() => handleProductClick(product)}
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
