import {getUsageCount} from "~/server/utils/finalsolution";

export default defineEventHandler(async (event) => {
    const kv = event.context.cloudflare.env.FINAL_SOLUTION

    const query = getQuery(event)
    const version = query.v ?? query.version ?? undefined

    // invalid keys
    if(typeof version !== "string")
        return {"code": 1, "message": "invalid key"}

    const value = await getUsageCount(kv, version)

    return {"code": 0, "version": version, "count": (value === undefined ? -1 : value)}
})