import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import amenitiesData from "../src/data/amenities.json" with {type: 'json'};
import bookingsData from "../src/data/bookings.json" with {type: 'json'};
import hostsData from "../src/data/hosts.json" with {type: 'json'};
import propertiesData from "../src/data/properties.json" with {type: 'json'};
import reviewsData from "../src/data/reviews.json" with {type: 'json'};
import usersData from "../src/data/users.json" with {type: 'json'};


const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] }).$extends(withAccelerate());

async function main() {
    const {amenities} = amenitiesData
    const {bookings} = bookingsData
    const {hosts} = hostsData
    const {properties} = propertiesData
    const {reviews} = reviewsData
    const {users} = usersData


    for (const amenity of amenities) {
        await prisma.Amenities.upsert({
            where: { id: amenity.id },
            update: {},
            create: amenity
                })
            }

    for (const booking of bookings) {
    await prisma.Booking.upsert({
        where: { id: booking.id },
        update: {},
        create: booking
            })
        }

    for (const host of hosts) {
    await prisma.Host.upsert({
        where: { id: host.id },
        update: {},
        create: host
            })
        }

    for (const property of properties) {
    await prisma.Property.upsert({
        where: { id: property.id },
        update: {},
        create: property
            })
        }    

    for (const review of reviews) {
    await prisma.Review.upsert({
        where: { id: review.id },
        update: {},
        create: review
            })
        }    

        
    for (const user of users) {
    await prisma.User.upsert({
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



