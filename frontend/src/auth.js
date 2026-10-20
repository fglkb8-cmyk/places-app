// ログイン状態（画面側の目印）。ログアウトすると消える。
const KEY = 'loggedIn'

export const isLoggedIn = () => sessionStorage.getItem(KEY) === 'true'
export const setLoggedIn = () => sessionStorage.setItem(KEY, 'true')
export const clearLoggedIn = () => sessionStorage.removeItem(KEY)
