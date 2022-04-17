export const getAccessToken = () => {
   return localStorage.getItem('accessToken')
}

export const setAccessToken = (value: string) => {
   return localStorage.setItem('accessToken', value)
}
