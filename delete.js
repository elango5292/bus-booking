const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const deleteUser = await prisma.user.deleteMany()
  console.log(`Deleted ${deleteUser.count} entries from the User table.`)

  const deleteBus = await prisma.bus.deleteMany()
  console.log(`Deleted ${deleteBus.count} entries from the Bus table.`)

  const deleteTrip = await prisma.trip.deleteMany()
  console.log(`Deleted ${deleteTrip.count} entries from the Trip table.`)

  const deleteTicket = await prisma.ticket.deleteMany()
  console.log(`Deleted ${deleteTicket.count} entries from the Ticket table.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
