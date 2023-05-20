import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const data = await prisma.animeList.findFirst({
        where: {
            user_id: query.user_id as string,
            entry_id: query.entry_id as string
        }}
    );

    return data;
})