import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { firestoreAction } from 'vuexfire'
import firebase from "firebase"
import { db } from '@/plugins/db'
import { Report } from '@/store/types'

@Module({ stateFactory: true, namespaced: true, name: 'report' })
export default class ReportModule extends VuexModule {
  reports: Report[] = []
  loading: boolean = false

  @Mutation
  set(reports: any) {
    this.reports = []
    this.reports = reports
  }

  @Mutation
  updateing(loading: boolean) {
    this.loading = loading
  }

  @Action
  fetch(): void {
    this.updateing(true)
    db.collection('reports')
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data())
        this.set(documents)
        this.updateing(false)
      })
  }

  @Action({ rawError: true })
  async create(payload: any): Promise<void> {
    await (firestoreAction(() => {
      {
        return db.collection('reports')
          .add({
            imageFileName: payload.imageFileName,
            title: payload.title,
            url: payload.url,
            tags: payload.tags
          })
      }
    }) as Function)(this.context)
    const storageRef = firebase.storage().ref()
    const imageRef = storageRef.child(`images/${payload.imageFileName}`)
    await imageRef.put(payload.imageFile)
    this.fetch()
  }
}