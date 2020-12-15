import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    toys: [],
    currentToy: null,
    emptyToy:{
      id: null,
      code: null,
      name: null,
      stock: 0,
      price: 0

    }
  },
  mutations: {
    UPDATE_CURRENT_USER(state, user) {
      state.currentUser = user
    },
    GET_TOY(state, toy){
      state.toy= toy
    },
    CLEAN_TOY(state){
      state.toy= {}
    },
    GET_TOYS(state, toys){
      state.toys= toys
    },
    SET_CURRENT_TOY(state, toy){
      state.currentToy= toy
    }
  },
  actions: {
    getToys({commit}){
       axios.get("https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/toys")
       .then(resp =>{
         commit('GET_TOYS', resp.data)
       })
    },
    edit({commit}, toy){
      commit('SET_CURRENT_TOY', toy)
    },
    updateToy({dispatch}, toy){
      axios.put(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/toys/${toy.id}`, toy).then(()=> {
        dispatch("getToys")
      })
    },
    postToy({dispatch}, toy){
      axios.post(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/toys`, toy).then(() => {
        dispatch("getToys")
      })
     
    },
    deleteToy({dispatch}, toyId){
      axios.delete(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/toys/${toyId}`).then(()=> {
        dispatch("getToys")
      })
    },
    updateCurrentUser({ commit }, user) {
      commit('UPDATE_CURRENT_USER', user)
    }
  },

  modules: {}
})

