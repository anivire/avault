import { JikanClient } from '@tutkli/jikan-ts';

const jikanClient = new JikanClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const { data } = await jikanClient.seasons.getSeasonUpcoming({limit: query.count as number})
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