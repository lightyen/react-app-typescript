import "./axios.interceptor"

export function isDevelopment(): boolean {
    return process.env.NODE_ENV === "development"
}
