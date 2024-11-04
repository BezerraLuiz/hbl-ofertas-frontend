import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs';
import { pump } from '../lib/pump';
import { generateImagePath } from '../utils/imagePath';
import path from 'path';

export async function uploadImageHandler(nome: string, request: FastifyRequest, reply: FastifyReply) {
  const data = await request.file();
  console.log("DATA: " + data)

  if (!data) {
    return reply.status(400).send({ message: "Imagem é necessária!" });
  }

  if (!nome) {
    return reply.status(400).send({ message: "Nome do produto é necessário!" });
  }

  const imagePath = generateImagePath(nome, data.filename);
  const fullImagePath = path.resolve(__dirname, '../../frontend', imagePath);

  await pump(data.file, fs.createWriteStream(fullImagePath));

  return { imagePath };
}
