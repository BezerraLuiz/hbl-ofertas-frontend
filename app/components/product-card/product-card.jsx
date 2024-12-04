'use client'

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, ProductImage, CardText } from "./style";
import Intl from "intl";

export default function ProductCard({ onClick, imageId, name, price }) {
  const [priceProduct, setPriceProduct] = useState("");

  useEffect(() => {
    const valueMonetary = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);

    setPriceProduct(valueMonetary);
  }, [])

  return (
    <Card onClick={onClick} style={{ cursor: "pointer" }}>
      <ProductImage src={`https://images.weserv.nl/?url=drive.google.com/uc?id=${imageId}`}/>
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
  onClick: PropTypes.bool.isRequired,
  imageId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
}