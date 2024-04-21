const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function a(){
    try {
      const newRoute = await prisma.route.create({
        data: {
          routeId:"Coimbatore-Delhi",
          from: 'Coimbatore',
          to: 'Delhi',
        },
      });
      console.log('New Route:', newRoute);
  
      const newBus = await prisma.bus.create({
        data: {
          busNum: 'TN-1234',
          routeId: newRoute.id,
          departures: ['9:00 AM','6:00'],
          duration:120,
        },
      });
      console.log('New Bus:', newBus);
  
      const updateRoute = await prisma.route.update({
        where: {
            id: newRoute.id,
        },
        data: {
            buses: {
                connect: {
                    id: newBus.id,
                },
            },
        },
      });
      console.log('Updated Route:', updateRoute);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  a()
  
  
