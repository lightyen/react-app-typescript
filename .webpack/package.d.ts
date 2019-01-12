declare module "*package.json" {
    export const name: string
    export const version: string
    export const license: string
    export const author: Author
    export const description: string
    export const repository: Repository
    export const scripts: { [key: string]: string }
    export const keywords: string[]
    export const dependencies: { [key: string]: string }
    export const devDependencies: { [key: string]: string }
}

interface Author {
    name?: string
    email?: string
}

interface Repository {
    type?: string
    url?: string
}
