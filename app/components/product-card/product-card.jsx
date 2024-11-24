'use client'

import React from "react";
import { Card, ProductImage, CardText } from "./style";

export default function ProductCard() {
  return (
    <Card style={{ cursor: "pointer" }}>
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