import { ContainerMain, Card, ProductImage, CardText } from "./style"  

export default function ProductCard() {
  return (
    <>
      <ContainerMain>
        <Card>
          <ProductImage src="/products/fone_de_ouvido_bluetooth_1730855184743.jpg"/>
          <div style={{ display: "flex", flexDirection: "column", margin: "10% 5%", gap: "10px"}}>
            <CardText>Fone De Ouvido Bluetooth</CardText>
            <CardText>R$ 74.9</CardText>
          </div>
        </Card>
      </ContainerMain>
    </>
  )
}