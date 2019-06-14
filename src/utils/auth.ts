const token = "__HEHEHE__"

function jsonParseSafety<T>(s: string): T {
    try {
        const o: T = JSON.parse(s)
        return o
    } catch (e) {
        return undefined
    }
}

export const getAuthToken = () => {
    return jsonParseSafety(localStorage.getItem(token))
}

export const setAuthToken = (o: unknown) => {
    localStorage.setItem(token, JSON.stringify(o))
}

export const isLogin = () => {
    return !!getAuthToken()
}

export const clearAuthToken = () => {
    localStorage.removeItem(token)
}
