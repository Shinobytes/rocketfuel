import auth0 from 'auth0-js'
import Vue from 'vue'

// exchange the object with your own from the setup step above.
let webAuth = new auth0.WebAuth({
  /* eslint-disable no-undef */
  domain: process.env.VUE_APP_AUTH_SERVICE_DOMAIN,
  clientID: process.env.VUE_APP_AUTH_SERVICE_CLIENT_ID,
  redirectUri: `${window.location.href}${
    process.env.VUE_APP_AUTH_SERVICE_REDIRECT_URI
    /* eslint-enable no-undef */
  }`,
  audience: 'https://ialio.eu.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid profile'
})

let auth = new Vue({
  computed: {
    token: {
      get() {
        return localStorage.getItem('id_token')
      },
      set(id_token) {
        localStorage.setItem('id_token', id_token)
      }
    },
    accessToken: {
      get() {
        return localStorage.getItem('access_token')
      },
      set(accessToken) {
        localStorage.setItem('access_token', accessToken)
      }
    },
    expiresAt: {
      get() {
        return localStorage.getItem('expires_at')
      },
      set(expiresIn) {
        let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
        localStorage.setItem('expires_at', expiresAt)
      }
    },
    user: {
      get() {
        return JSON.parse(localStorage.getItem('user'))
      },
      set(user) {
        localStorage.setItem('user', JSON.stringify(user))
      }
    }
  },
  methods: {
    login() {
      webAuth.authorize()
    },
    logout() {
      return new Promise(resolve => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
        localStorage.removeItem('user')
        webAuth.authorize()
        resolve()
      })
    },
    isAuthenticated() {
      return new Date().getTime() < this.expiresAt
    },
    handleAuthentication() {
      return new Promise((resolve, reject) => {
        webAuth.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.expiresAt = authResult.expiresIn
            this.accessToken = authResult.accessToken
            this.token = authResult.idToken
            this.user = authResult.idTokenPayload
            resolve()
          } else if (err) {
            this.logout()
            reject(err)
          }
        })
      })
    }
  }
})

export default Vue.use({
  install: Vue => {
    Vue.prototype.$auth = auth
  }
})
