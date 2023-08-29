import { AnimeStatus, JikanClient } from '@tutkli/jikan-ts';

const jikanClient = new JikanClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const { data } = await jikanClient.anime.getAnimeSearch({
        page: query.page as number,
        limit: query.limit as number,
        order_by: query.order_by as string,
        sort: query.sort as string,
        q: query.q as string,
        start_date: query.start_date as string,
        end_date: query.end_date as string,
        type: query.format as string,
        status: query.status as string,
        min_score: query.score as number,
        sfw: true,
        unapproved: false
    })
    .catch(async (response: Response) => {
        if (response.status == 429) {
            throw createError({
                statusCode: 429,
                statusMessage: 'API Error',
                message: 'Reached rate limit'
            })
        } else {
            console.log(response);
            throw createError({
                statusCode: response.status,
                statusMessage: 'Error',
                message: response.statusText,
            })
        }
    });

    return data;
})