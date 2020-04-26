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

    this.reports = reports.map(
      (report: any) => {
        const storage = firebase.storage();
        const gsReference = storage.refFromURL(
          `gs://${process.env.storageBucket}/images/${report.imageFileName}`
        );
        const url = gsReference.getDownloadURL().then(url => {
          return url;
        });
        return { imageUrl: Promise.resolve(url), ...report }
      }
    )
  }

  @Mutation
  updateing(loading: boolean) {
    this.loading = loading
  }

  @Action
  fetch(): void {
    this.updateing(true)
    db.collection('reports').orderBy('createdAt', 'desc')
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => Object.assign({ id: doc.id }, { ...doc.data() }))
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
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            tags: payload.tags
          })
      }
    }) as Function)(this.context)
    const storageRef = firebase.storage().ref()
    const imageRef = storageRef.child(`images/${payload.imageFileName}`)
    await imageRef.put(payload.imageFile)
    this.fetch()
  }

  @Action({ rawError: true })
  async update(payload: any): Promise<void> {
    await (firestoreAction(() => {
      {
        return db.collection('reports').doc(payload.id)
          .update({
            title: payload.title,
            url: payload.url,
            tags: payload.tags
          })
      }
    }) as Function)(this.context)
    this.fetch()
  }
}