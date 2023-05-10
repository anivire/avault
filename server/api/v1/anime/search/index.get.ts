import { AnimeStatus, JikanClient } from '@tutkli/jikan-ts';

const jikanClient = new JikanClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const { data } = await jikanClient.anime.getAnimeSearch({
        page: query.page as number,
        limit: query.limit as number,
        order_by: query.orderBy as string,
        sort: query.sortBy as string,
        q: query.searchString as string,
        start_date: query.yearStart as string,
        end_date: query.yearEnd as string,
        type: query.format as string,
        status: query.status as string,
        sfw: true,
        min_score: query.score as number
    })
    .catch(async (response: Response) => {
        if (response.status == 429) {
            throw createError({
                statusCode: 429,
                statusMessage: 'API Error',
                message: 'Reached rate limit'
            })
        } else {
            throw createError({
                statusCode: response.status,
                statusMessage: 'Error',
                message: response.statusText
            })
        }
    });

    return data;
})