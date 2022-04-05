export const getAccessToken = () => {
   return localStorage.getItem('accessToken')
}

export const setAccessToken = (s: string) => {
   return localStorage.setItem('accessToken', s)
}
