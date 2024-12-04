'use-client'

import React from 'react';
import { ContainerMain, TextFooter, ContainerSocial, ImageSocial } from "./style";

export default function Footer() {
  function rotaSite() {
    window.open("https://hblvendas.com.br/", "_blank");
  }

  function rotaFb() {
    window.open("https://www.facebook.com/hblassis?mibextid=ZbWKwL", "_blank");
  }

  function rotaIg() {
    window.open("https://www.instagram.com/hbl.vendas/", "_blank");
  }

  function rotaWpp() {
    window.open("https://wa.link/1ok330", "_blank");
  }

  return (
    <>
      <ContainerMain>
        <TextFooter>NOS SIGA NAS NOSSAS REDES!</TextFooter>
        <ContainerSocial>
          <ImageSocial
            src="/web.svg"
            alt="web-icon"
            onClick={rotaSite}
            style={{ cursor: "pointer" }}
          />
          <ImageSocial
            src="/fb.svg"
            alt="fb-icon"
            onClick={rotaFb}
            style={{ cursor: "pointer" }}
          />
          <ImageSocial
            src="/ig.svg"
            alt="ig-icon"
            onClick={rotaIg}
            style={{ cursor: "pointer" }}
          />
          <ImageSocial
            src="/wpp.svg"
            alt="wpp-icon"
            onClick={rotaWpp}
            style={{ cursor: "pointer" }}
          />
        </ContainerSocial>
      </ContainerMain>
    </>
  );
}
