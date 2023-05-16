import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const data = await prisma.animeList.findFirstOrThrow({
        where: {
            user_id: query.user_id as string,
            mal_id: query.mal_id as string
        }}
    );

    return data;
})