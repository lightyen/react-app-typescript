declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "production"
        PUBLIC_URL: string
    }
}
