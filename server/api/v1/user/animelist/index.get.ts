import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const data = await prisma.animeList.findMany({
        where: {
            user_id: query.user_id as string
        }}
    );

    if (data == undefined) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Error',
            message: 'User with this username is not exist'
        });
    } else {
        return data;
    }    
})