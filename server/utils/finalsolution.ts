function getKVVersionKey(version: string): string {
    return `USAGE_COUNT_${version}`
}

function parseIntOrElse(string: string | undefined | null, defaultValue: number): number {
    if(typeof string !== "string") return defaultValue
    const value = parseInt(string)
    return isNaN(value) ? defaultValue : value
}

/**
 * Get the usage count for given version.
 * @param kv the KV namespace
 * @param version the version (eg: "1.9.0")
 */
export async function getUsageCount(kv: KVNamespace<string>, version: string): Promise<number | undefined> {
    const key = getKVVersionKey(version)
    const valueStr = await kv.get(key)
    return parseIntOrElse(valueStr, 0)
}

export interface VersionUsageCount {
    key: string
    count: number
}

/**
 * Get all the usage count.
 * @param kv the KV namespace
 */
export async function getAllUsageCount(kv: KVNamespace<string>): Promise<VersionUsageCount[]> {
    const list = await kv.list()
    const keys = list.keys.filter(it => it.name.startsWith("USAGE_COUNT_"))

    const ret: VersionUsageCount[] = []

    for(const key of keys.map(key => key.name)) {
        const valueStr = await kv.get(key)
        ret.push({
            key: key.substring("USAGE_COUNT_".length),
            count: parseIntOrElse(valueStr, 0)
        })
    }

    return ret
}