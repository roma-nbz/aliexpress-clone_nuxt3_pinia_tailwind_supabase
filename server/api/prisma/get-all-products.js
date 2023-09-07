import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (e) => {
	const products = await prisma.products.findMany()
	
	return products
})