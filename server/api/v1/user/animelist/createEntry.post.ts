import { animeList, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const data = await prisma.animeList.create({
        data: {
            added_at: body.animeList.added_at,
            airing_season: body.animeList.airing_season,
            airing_status: body.animeList.airing_status,
            image_url: body.animeList.image_url,
            is_favorited: body.animeList.is_favorited,
            mal_id: body.animeList.mal_id,
            studios: body.animeList.studios,
            title: body.animeList.title,
            type: body.animeList.type,
            updated_at: body.animeList.updated_at,
            watching_status: body.animeList.watching_status,
            score: body.animeList.score,
            total_episodes: body.animeList.total_episodes,
            user_id: body.animeList.user_id,
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