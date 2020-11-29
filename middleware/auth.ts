import firebase from 'firebase'
import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = (context) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && context.route.name !== 'login') {
      context.redirect('/login')
    }
  })
}

export default authMiddleware
