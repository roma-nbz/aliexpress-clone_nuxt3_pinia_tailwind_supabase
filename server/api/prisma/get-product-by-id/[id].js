import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async e => {
	const product = await prisma.products.findFirst({
		where: { id: Number(e.context.params.id) },
	})

	return product
})
