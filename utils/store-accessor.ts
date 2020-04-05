import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import ReportModule from '@/store/report'

let reportStore: ReportModule

function initialiseStores(store: Store<any>): void {
  reportStore = getModule(ReportModule, store)
}

export { initialiseStores, reportStore }