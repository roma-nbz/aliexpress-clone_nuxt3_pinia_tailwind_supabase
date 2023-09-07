import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function seedProducts() {
	try {
		await prisma.products.create({
			data: {
				title: 'Brown Leather Bag',
				description:
					'Brown leather shoulder bags have been a fashion staple for years, and their popularity continues to soar. The rich, earthy tones of brown leather exude sophistication and versatility. One standout example is the Fossil Ivory Linen Brown Leather Tote Shoulder Bag. Crafted with premium brown leather and adorned with pewter accents, this bag offers a perfect blend of style and practicality. Its spacious design and comfortable shoulder straps make it ideal for both everyday use and special occasions. Whether you’re heading to the office or going out for a casual outing, a brown leather shoulder bag adds an instant touch of elegance to your outfit.',
				url: 'https://picsum.photos/id/7/800/800',
				price: 2500, // EG: 25.00
			},
		})

		await prisma.products.create({
			data: {
				title: 'School Books',
				description:
					'Whether or not you write a picture book or a middle-grade chapter book, a well written children’s book description is incredibly important. Unfortunately, many authors do not plan ahead and throw something together at the very last minute, right before they hit the publish button. The truth is, however, that a planned-out description (also called blurb) can set your book miles apart from others.',
				url: 'https://picsum.photos/id/20/800/800',
				price: 1999,
			},
		})

		await prisma.products.create({
			data: {
				title: "Women's White Shoes",
				description:
					'White shoes have become a staple in every woman’s wardrobe. Whether you’re dressing up for a special occasion or running errands on a casual day, white shoes can effortlessly elevate your outfit. The current trend of white shoes has taken the fashion world by storm, with celebrities and influencers sporting them in various styles and designs.',
				url: 'https://picsum.photos/id/21/800/800',
				price: 9999,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Old Book',
				description:
					'To explore the identification and documentation of historic smells, the researchers studied the odor of old books, looking for ways to communicate how it smells. The sample book was Les Chardons du Baragan, published in 1928 and purchased from a second-hand bookstore in London. Study participants smelled an extract of this book as one of eight unidentified odors, which included “chocolate,” “coal fire,” “old inn,” “fish market,” “dirty linen,” “coffee,” and “HP sauce.”',
				url: 'https://picsum.photos/id/24/800/800',
				price: 5999,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Cuban Mug',
				description:
					'The Cuban mug makes for a wonderful corporate gift. It forms part of our range from our Cups & Mugs category. Once branded with your company logo, your company is sure to be remembered fondly by the recipient. Since inception in 2003, Perkal Promo has established itself as an industry leader in the Promotional Products Arena. We offer the single largest range of Corporate Gifts and Promotional Clothing in South Africa which ensures that we always have the perfect promotional product to fit your companies corporate identity perfectly.',
				url: 'https://picsum.photos/id/24/800/800',
				price: 1299,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Barrel of Oil',
				description:
					'In the oil industry, one barrel (unit symbol bbl) is a unit of volume used for measuring oil defined as 42 US gallons or 158.987 litres[a] or 35 imperial gallons. According to the American Petroleum Institute (API), a standard barrel of oil is the amount of oil that would occupy a volume of exactly 1 barrel (159 L) at reference temperature and pressure conditions of 60 °F (15.6 °C) and 14.696 psi (101.325 kPa).',
				url: 'https://picsum.photos/id/34/800/800',
				price: 6589,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Camera Gadgets',
				description:
					'Whether you’re a photography beginner or an old pro, navigating the latest camera tech can be daunting. There’s a lot of gear to consider. So we’re here to help with our guide to the best photography gadgets to buy in 2023.',
				url: 'https://picsum.photos/id/36/800/800',
				price: 22499,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Old Record Player',
				description:
					'Old-school turntables look great, but the technology inside is dated. Newer models have upgraded tech, but they just don’t have the same aesthetic appeal.',
				url: 'https://picsum.photos/id/39/800/800',
				price: 23599,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Dinner Table',
				description:
					'While the style of your dining table is important the most crucial thing is to consider the size. To allow for chairs to comfortably move in and out you need at least 110 cm between the edge of your table and the walls or nearest piece of furniture. The dining table will be both seen and utilised more than a lot of home furniture, so the choice is never made lightly. Of course, there are many table styles, contemporary designers continue surprising us with their out of box designs, however, here are few most common table styles!',
				url: 'https://picsum.photos/id/42/800/800',
				price: 8999,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Mac Book Pro',
				description:
					'Supercharged by M2 Pro or M2 Max, MacBook Pro takes its power and efficiency further than ever. It delivers exceptional performance whether it’s plugged in or not, and now has even longer battery life. Combined with a stunning Liquid Retina XDR display and all the ports you need — this is a pro laptop without equal.',
				url: 'https://picsum.photos/id/48/800/800',
				price: 159599,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Light House',
				description:
					'Lighthouses seem simple enough, right? It’s a large tower with a giant light beacon on top warding ships away from the impending doom which lurks just under the surface. Now, in the modern days of global positioning systems, their primary purposes seems to be attracting tourists who duly make the trip to the top for the required vacation selfie.',
				url: 'https://picsum.photos/id/58/800/800',
				price: 999599,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Computer with accessories',
				description:
					'A computer is made up of multiple components that work together to function as a computer and allow you to use the computer as you are familiar with. There are different components that store information for use later, calculate answers for questions, render images onto the monitors, cool down components, or allow other components to be connected to the computer. This article will discuss the main components inside a standard tower computer, which will be similar to the components in most computers like laptops, tablets, phones, etc. I will not be talking about external hardware devices, such as monitors, mice, keyboards, webcams, etc.',
				url: 'https://picsum.photos/id/60/800/800',
				price: 9699,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Cup of Tea',
				description:
					'Tea cups are meant for having different types of tea. They usually have smaller handles that can be held with the thumb or with two/or three fingers. Various types of tea mugs and cups are available in the market, made of multiple materials and designs for different occasions. Here we will discuss types of teacups and types of teacup materials.',
				url: 'https://picsum.photos/id/60/800/800',
				price: 125,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Playstation Controller',
				description:
					'The PS4 controller is excellent in terms of its beautiful design and how comfortable it is when being used for long periods. However, it can be a challenging job to use this controller at first. Interacting with all the different types of games out there can seem impossible to do. But, once you get familiar with buttons and start playing games regularly, you will find it easy. In this PS4 controller user guide, we will take at its different features and buttons.',
				url: 'https://picsum.photos/id/96/800/800',
				price: 1599,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Rasberries',
				description:
					'The raspberry is the edible fruit of a multitude of plant species in the genus Rubus of the rose family, most of which are in the subgenus Idaeobatus. The name also applies to these plants themselves. Raspberries are perennial with woody stems. World production of raspberries in 2020 was 895,771 tonnes, led by Russia with 20% of the total.',
				url: 'https://picsum.photos/id/102/800/800',
				price: 259,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Old Car',
				description:
					'The product of some of the most wildly optimistic 1960s design, the Wrist Twist steering control system looks outlandishly futuristic even today. Designed by a former missile engineer, the Wrist Twist replaced a conventional steering wheel with two smaller rings mounted on a vertical yolk and able to be operated either together or independently. Despite the odd look, the Wrist Twist offered some huge advantages: the driver had finer control over the vehicle, the steering mechanism required less force to operate, and the less obtrusive design improved both comfort and stability. While the Wrist Twist never made it to the road, we may see something like it in the future.',
				url: 'https://picsum.photos/id/111/800/800',
				price: 104959,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Mac Mini',
				description:
					'Mac Mini (stylized as Mac mini) is a small form factor desktop computer developed and marketed by Apple Inc. As of 2022 [update], it is positioned between the consumer all-in-one iMac and the professional Mac Studio and Mac Pro as one of four current Mac desktop computers. Since launch, it has shipped without a display, keyboard, and mouse.',
				url: 'https://picsum.photos/id/119/800/800',
				price: 99999,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Old Bench',
				description:
					'The description of original and unusual designer benches made of wood and other materials can be very helpful in creating such products and their selection. It is imperative to take into account, of course, the specifics of the benches in the hallway, their counterparts in garden areas, for summer cottages and other places. It is also advisable to consider ready-made examples of such structures.',
				url: 'https://picsum.photos/id/129/800/800',
				price: 8999,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Broken Cars',
				description:
					'Progress does not stand still and every day are all new, spectacular discoveries that can change the life of the common man upside the head. This discovery, once, had a car. He allowed man to travel great distances and previously nivedanam comfort and speed.',
				url: 'https://picsum.photos/id/133/800/800',
				price: 256595,
			},
		})

		await prisma.products.create({
			data: {
				title: 'Guitar',
				description:
					'The sound of the guitar is projected either acoustically, by means of a resonant chamber on the instrument, or amplified by an electronic pickup and an amplifier. The guitar is classified as a chordophone – meaning the sound is produced by a vibrating string stretched between two fixed points.',
				url: 'https://picsum.photos/id/145/800/800',
				price: 12595,
			},
		})
	} catch (error) {
		console.error(error)
	} finally {
		await prisma.$disconnect()
	}
}

seedProducts()
