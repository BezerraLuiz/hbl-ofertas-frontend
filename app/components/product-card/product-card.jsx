'use client'

import React from "react";
import PropTypes from "prop-types";
import { Card, ProductImage, CardText } from "./style";

export default function ProductCard({ onClick }) {
  return (
    <Card onClick={onClick} style={{ cursor: "pointer" }}>
      <ProductImage/>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10% 5%",
          gap: "10px",
        }}
      >
        <CardText></CardText>
        <CardText></CardText>
      </div>
    </Card>
  );
}

ProductCard.propTypes = {
  onClick: PropTypes.bool.isRequired
}