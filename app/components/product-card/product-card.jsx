'use client'

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, ProductImage, CardText } from "./style";

export default function ProductCard({ onClick, imageId, sku, name, price, description, setProductDetails }) {
  const [priceProduct, setPriceProduct] = useState("");

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const valueMonetary = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);

    setPriceProduct(valueMonetary);
  }, [])

  const handleClick = () => {
    setProductDetails({ imageId, sku, name, price: priceProduct, description });
    onClick();
  };

  return (
    <Card onClick={handleClick} style={{ cursor: "pointer" }}>
      <ProductImage src={`https://images.weserv.nl/?url=drive.google.com/uc?id=${imageId}`} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10% 5%",
          gap: "10px",
        }}
      >
        <CardText>{name}</CardText>
        <CardText>{priceProduct}</CardText>
      </div>
    </Card>
  );
}

ProductCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  imageId: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setProductDetails: PropTypes.object.isRequired,
}