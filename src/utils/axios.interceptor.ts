import axios, { AxiosResponse, AxiosError } from "axios"
import { clearAuthToken } from "./auth"
import { store } from "~/App"
import { AUTH_FAILED } from "~/store/auth/action"

const APITimeout = 0

// NOTE: 在這裡你可以使用 axios interceptors 攔截 http
axios.interceptors.request.use(config => {
    if (process.env.NODE_ENV === "development") {
        if (config.data) {
            console.log(
                `%c${config.method.toUpperCase()} %c${config.url}`,
                "color: green; font-size:12px;",
                "color: blue; font-size:12px;",
                config.data,
            )
        } else {
            console.log(
                `%c${config.method.toUpperCase()} %c${config.url}`,
                "color: green; font-size:12px;",
                "color: blue; font-size:12px;",
            )
        }
    }
    config.timeout = APITimeout
    return config
})

axios.interceptors.response.use(
    resp => {
        if (process.env.NODE_ENV === "development") {
            if (resp.data) {
                console.warn(resp.data)
            } else {
                console.warn(resp)
            }
        }
        return resp
    },
    (error: AxiosError) => {
        if (error.code === "ECONNABORTED") {
            return Promise.reject(error)
        }
        if (error.response) {
            const resp = error.response as AxiosResponse
            if (process.env.NODE_ENV === "development") {
                if (resp.data) {
                    console.error(resp.status, resp.data)
                } else {
                    console.error(resp)
                }
            }

            switch (resp.status) {
                case 400:
                    break
                case 401:
                    store.dispatch({ type: AUTH_FAILED })
                    clearAuthToken()
                    // NOTE: createBrowserHistory
                    if (!window.location.pathname.startsWith("/hello")) {
                        window.location.replace("/")
                    }
                    break
                default:
                    break
            }
        }
        return Promise.reject(error)
    },
)
