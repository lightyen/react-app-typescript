export function isDevelopment(): boolean {
    if (document.getElementById("this-is-for-development-node")) {
        return true
    }
    return false
}
