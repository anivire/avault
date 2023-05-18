// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient();

// export default defineEventHandler(async (event) => {
//     const body = await readBody(event);

//     const data = await prisma.profile.update({
//         where: {
//             user_id: query.user_id,
//         }}
//     );

//     if (data == undefined) {
//         throw createError({
//             statusCode: 404,
//             statusMessage: 'Error',
//             message: 'User with this username is not exist'
//         });
//     } else {
//         return data;
//     }    
// })