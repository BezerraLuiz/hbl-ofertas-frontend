import { Divisor, ContainerMain, TextFooter, ContainerSocial, ImageSocial } from "./style" 

export default function Footer() {
  return (
    <>
      <ContainerMain>
        <Divisor/>
        <TextFooter>NOS SIGA NAS NOSSAS REDES!</TextFooter>
        <ContainerSocial>
          <a href="https://hblvendas.com.br/" target="blank"><ImageSocial src="/web.svg" alt="web-icon"/></a>
          <a href="https://www.facebook.com/hblassis?mibextid=ZbWKwL" target="blank"><ImageSocial src="/fb.svg" alt="fb-icon"/></a>
          <a href="https://www.instagram.com/hbl.vendas/" target="blank"><ImageSocial src="/ig.svg" alt="ig-icon"/></a>
          <a href="https://wa.link/1ok330" target="blank"><ImageSocial src="/wpp.svg" alt="wpp-icon"/></a>
        </ContainerSocial>
      </ContainerMain>
    </>
  )
}