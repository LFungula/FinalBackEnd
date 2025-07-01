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


    for (const a of amenities) {
        await prisma.a.upsert({
            where: { id: a.id },
            update: {},
            create: a
                })
            }

    for (const b of bookings) {
    await prisma.b.upsert({
        where: { id: b.id },
        update: {},
        create: b
            })
        }

    for (const h of hosts) {
    await prisma.h.upsert({
        where: { id: h.id },
        update: {},
        create: h
            })
        }

    for (const p of properties) {
    await prisma.p.upsert({
        where: { id: p.id },
        update: {},
        create: p
            })
        }    

    for (const r of reviews) {
    await prisma.r.upsert({
        where: { id: r.id },
        update: {},
        create: r
            })
        }    

        
    for (const u of users) {
    await prisma.u.upsert({
      where: { id: u.id },
      update: {},
      create: u
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



