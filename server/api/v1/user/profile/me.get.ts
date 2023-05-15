import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const data = await prisma.profile.findFirstOrThrow({
        where: {
            user_id: query.id as string
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