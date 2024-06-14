import {getAllUsageCount} from "~/server/utils/finalsolution";

export default defineEventHandler(async (event) => {
    return await getAllUsageCount(event.context.cloudflare.env.FINAL_SOLUTION)
})