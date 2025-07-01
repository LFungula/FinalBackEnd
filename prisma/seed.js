
import amenitiesData from "../src/data/amenities.json" with {type: 'json'};
import bookingsData from "../src/data/bookings.json" with {type: 'json'};
import hostsData from "../src/data/hosts.json" with {type: 'json'};
import propertiesData from "../src/data/properties.json" with {type: 'json'};
import reviewsData from "../src/data/reviews.json" with {type: 'json'};
import usersData from "../src/data/users.json" with {type: 'json'};
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
    const {amenities} = amenitiesData
    const {bookings} = bookingsData
    const {hosts} = hostsData
    const {properties} = propertiesData
    const {reviews} = reviewsData
    const {users} = usersData


    for (const amenitie of amenities) {
        await prisma.amenitie.upsert({
            where: { id: amenitie.id },
            update: {},
            create: amenitie
                })
            }

    for (const booking of bookings) {
    await prisma.booking.upsert({
        where: { id: booking.id },
        update: {},
        create: booking
            })
        }

    for (const host of hosts) {
    await prisma.host.upsert({
        where: { id: host.id },
        update: {},
        create: host
            })
        }

    for (const property of properties) {
    await prisma.property.upsert({
        where: { id: property.id },
        update: {},
        create: property
            })
        }    

    for (const review of reviews) {
    await prisma.review.upsert({
        where: { id: review.id },
        update: {},
        create: review
            })
        }    

        
    for (const user of users) {
    await prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user
            })
        }    

}

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})



