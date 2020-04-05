import { Store } from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import { initialiseStores } from '@/utils/store-accessor'

const initializer = (store: Store<any>) => initialiseStores(store)

export const plugins = [initializer]
export const mutations = { ...vuexfireMutations }
export * from '@/utils/store-accessor'