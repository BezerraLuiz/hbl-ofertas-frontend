"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "../../components/header/header";
import { useRouter } from "next/navigation";
import { Button, ContainerMain, Divisor, TextWpp } from "./style";
import ProductCard from "@/app/components/product-card/product-card";
import WppContact from "@/app/components/wpp-contact/wpp-contatc";
import ProductModal from "@/app/components/product-modal/product-modal";
import Loading from "@/app/components/loading/loading";

type Product = {
  id: number;
  imagePath: string;
  nome: string;
  valor: number;
  sku: string;
  descricao: string;
};

export default function Admin() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const response = sessionStorage.getItem("user");
    if (response !== "admin") {
      router.push("/pages/auth");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const rotaCadastroProduto = useCallback(() => {
    router.push("/pages/create%product");
  }, [router]);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {isModalOpen && (
        <ProductModal product={selectedProduct as Product} onClose={handleCloseModal} />
      )}

      <Header setSearchQuery={() => {}} setProducts={setProducts} />

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
