import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async e => {
	const items = await prisma.products.findMany({
		take: 5,
		where: {
			title: {
				contains: e.context.params.id,
				mode: 'insensitive',
			},
		},
	})

	return items
})
