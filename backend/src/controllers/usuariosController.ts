import {FastifyReply, FastifyRequest} from "fastify";
import {z} from "zod";
import {findUserByEmail, verifyPassword} from "../services/usuariosService";
import {generateToken} from "../utils/jwtUtils";

export async function loginHandler(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        email: z.string().email(),
        senha: z.string(),
    });
    const {email, senha} = bodySchema.parse(request.body);

    try {
        const usuario = await findUserByEmail(email);
        const senhaCorreta = await verifyPassword(senha, usuario.senha);

        if (!senhaCorreta) {
            return reply.status(401).send({error: "Senha Incorreta"});
        }

        const token = generateToken({id: usuario.id, email: usuario.email});
        return reply.status(200).send({token});
    } catch (error) {
        console.log(error);
        return reply.status(404).send({error: "Usuário não encontrado"});
    }
}
