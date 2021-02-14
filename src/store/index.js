import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import modulesA from './modules/modulesA'
Vue.use(Vuex)

var state = {
    cartList: []
}


const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules: { modulesA }
})

export default store