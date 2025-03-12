// ============SAVE ACCESS TOKEN ==========
export const saveAccesToken = (access_token: string) => {
    localStorage.setItem("access_token", access_token)
}

// ============GET ACCESS TOKEN ==========
export const getAccesToken = () => {
    return localStorage.getItem("access_token")
}

// ============REMOVE ACCESS TOKEN ==========
export const removeAccesToken = () => {
    localStorage.removeItem("access_token")
}



