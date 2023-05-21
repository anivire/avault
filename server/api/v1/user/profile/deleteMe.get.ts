import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const listData = await prisma.animeList.deleteMany({
        where: {
            user_id: query.user_id as string
        },
    });
    
    const profileData = await prisma.profile.delete({
        where: {
            user_id: query.user_id as string
        }
    });
    
    const usersData = await prisma.users.delete({
        where: {
            id: query.user_id as string
        }
    });


    return { listData, profileData, usersData }; 
})