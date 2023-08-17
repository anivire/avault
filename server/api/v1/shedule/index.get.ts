import { JikanClient, SchedulesFilter } from '@tutkli/jikan-ts';

const jikanClient = new JikanClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const { data } = await jikanClient.schedules.getSchedules({filter: query.day as SchedulesFilter})
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