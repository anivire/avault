import { animeList, PrismaClient } from '@prisma/client'
import { UUID } from 'crypto';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const data = await prisma.animeList.update({
        where: {
            entry_id: body.animeList.entry_id as UUID
        },
        data: {
            total_episodes: body.animeList.total_episodes,
            image_url: body.animeList.image_url,
            airing_season: body.animeList.airing_season,
            airing_status: body.animeList.airing_status,
            watching_status: body.animeList.watching_status,
            score: body.animeList.score,
            is_favorited: body.animeList.is_favorited,
            updated_at: body.animeList.updated_at,
            wathed_episodes: body.animeList.wathed_episodes,
        }
    });

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