import { Provider } from '@supabase/gotrue-js';
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const client = serverSupabaseClient(event)

    const { data, error } = await client.auth.signInWithOAuth({
        provider: body.provider as Provider
    })
    
    if (error) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Error',
            message: 'Error while trying to auth with oAuth provider'
        })
    } else {
        return data;
    }
})