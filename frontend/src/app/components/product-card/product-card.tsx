import { Card, ProductImage, CardText } from "./style";

export default function ProductCard({ image, nome, preco, onClick }) {
  return (
    <Card onClick={onClick} style={{ cursor: "pointer" }}>
      <ProductImage src={image} alt={nome} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10% 5%",
          gap: "10px",
        }}
      >
        <CardText>{nome}</CardText>
        <CardText>R$ {preco}</CardText>
      </div>
    </Card>
  );
}
