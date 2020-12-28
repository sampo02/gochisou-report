import firebase from 'firebase/app'
import 'firebase/auth'
import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = (context) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && context.route.name !== 'login') {
      context.redirect('/login')
    }
  })
}

export default authMiddleware
