import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async e => {
	const orders = await prisma.orders.findMany({
		where: { userId: e.context.params.userId },
		orderBy: { id: 'desc' },
		include: {
			orderItem: {
				include: {
					product: true,
				},
			},
		},
	})

	return orders
})
