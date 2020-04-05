import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { firestoreAction } from 'vuexfire'
import { db } from '@/plugins/db'
import { Report } from '@/store/types'

@Module({ stateFactory: true, namespaced: true, name: 'report' })
export default class ReportModule extends VuexModule {
  reports: Report[] = []
  loading: boolean = false

  @Mutation
  set(reports: any) {
    this.reports = reports
  }

  @Mutation
  updateing(loading: boolean) {
    this.loading = loading
  }

  @Action
  fetch():void {
    this.updateing(true)
    db.collection('reports')
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data())
        this.set(documents)
        this.updateing(false)
      })
  }

  @Action
  create(url: string):void {
    (firestoreAction(() => {
      {
        return db.collection('reports')
          .add({
            url: url
          })
      }
    }) as Function)(this.context)
    this.fetch()
  }
}