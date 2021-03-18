import Config from "../config/Config";
import TokenService from './TokenService'

const AuthAPIService = {
  postUser(user) {
    console.log(user)
    return fetch(`${Config.REACT_APP_API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body:JSON.stringify(user),
    })
    .then(res => 
      (!res.ok) 
         ? res.json().then(e => Promise.reject(e))
         : res.json()
    )
}, 
postLogin({username, password}) {
  return fetch(`${Config.REACT_APP_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(res => 
      (!res.ok) 
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      )
      .then( res => {
        TokenService.saveAuthToken(res.authToken)
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthAPIService.postRefreshToken() 
        })
        return res

      })
},
postRefreshToken() {
  return fetch(`${Config.REACT_APP_API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${TokenService.getAuthToken()}`,
    },
  }).then(res => 
    (!res.ok) 
    ? res.json().then(e => Promise.reject(e))
    : res.json()
    ).then(res => {
      TokenService.saveAuthToken(res.authToken)
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthAPIService.postRefreshToken()
      })
      return res
    })
    .catch(err => {
      console.error(err)
    })
  },
}

export default AuthAPIService