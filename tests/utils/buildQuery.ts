export const buildQuery = (obj: Record<string, any>): string =>
  Object.keys(obj)
    .filter((key) => obj[key] !== "" && obj[key] !== undefined)
    .map((key) =>
      Array.isArray(obj[key])
        ? obj[key].map((e: any) => `${key}=${e}`).join("&")
        : `${encodeURIComponent(key)}=${encodeURIComponent(obj[key] as string)}`
    )
    .join("&");