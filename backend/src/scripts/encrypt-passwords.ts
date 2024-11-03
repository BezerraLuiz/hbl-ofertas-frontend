import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

// encriptografar senhas de usuarios existentes
async function encryptPasswords() {
  const users = await prisma.usuarios.findMany();

  for (const user of users) {
    if (user.senha) {
      if (!user.senha.startsWith('$2a$')) {
        const hashedPassword = await bcrypt.hash(user.senha, 10);

        await prisma.usuarios.update({
          where: { id: user.id },
          data: { senha: hashedPassword },
        });

        console.log(`Senha do usuário ${user.email} foi criptografada com sucesso.`);
      }
    }
  }

  console.log('Todas as senhas foram criptografadas.');
}

encryptPasswords()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
  });
