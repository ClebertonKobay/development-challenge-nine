import { FastifyRequest } from "fastify"

export const getToken = (request: FastifyRequest) => {
    const authHeader = request.headers["authorization"]
    const token = authHeader?.split(" ")[1]
   
    return token
}