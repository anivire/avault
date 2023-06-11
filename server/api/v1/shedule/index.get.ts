import Jakan from "jakan";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const miscClient = new Jakan.Jakan().withMemory().forMisc();
    const sheduleData = await miscClient.schedules({ kids: 'false', limit: 25, filter: query.day as "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "unknow" | "other" | undefined});

    return sheduleData;
})