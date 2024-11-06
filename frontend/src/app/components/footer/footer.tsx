import { Divisor, ContainerMain, TextFooter, ContainerSocial, ImageSocial } from "./style" 

export default function Footer() {
  return (
    <>
      <ContainerMain>
        <Divisor/>
        <TextFooter>NOS SIGA NAS NOSSAS REDES!</TextFooter>
        <ContainerSocial>
          <ImageSocial src="/fb.svg" alt="fb-icon"/>
          <ImageSocial src="/ig.svg" alt="ig-icon"/>
        </ContainerSocial>
      </ContainerMain>
    </>
  )
}