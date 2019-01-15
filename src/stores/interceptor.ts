import axios from "axios"

// NOTE: 在這裡你可以使用 axios 攔截 http 請求與回應

axios.interceptors.request.use(config => {
    // dosomthing before request
    return config
})

axios.interceptors.response.use(
    response => {
        // dosomthing before get response
        return response
    },
    error => {
        // dosomthing before get error
        return error
    },
)
