import Vue from 'vue'
import Vuex from 'vuex'
import login from './login'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        isSideNavCollapse: false,
        bookmarkList: [],
    },
    mutations: {
        fullScreenLoading(state, payload) {
            state.loading=payload
        },

        toggleSideNavCollapseStatus(state) {
            state.isSideNavCollapse = !state.isSideNavCollapse
        },
        clearBookmarkStatus(state) {
            let index = {};
            state.bookmarkList.forEach(function (item) {
                if (item.path === '/') {
                    index = {
                        path: '/',
                        name: item.name
                    };
                }
                state.bookmarkList=[index]
            });

        },

        pushBookmarkStatus(state, payload) {
            let flag = true;
            state.bookmarkList.forEach(item => {
                if (item.path === payload.path) {
                    flag = false;
                }
            });
            if (flag) {
                state.bookmarkList.push(payload);
            }
        },

        delegeBookmarkStatus(state, payload) {
            for (let i = 0; i < state.bookmarkList.length; i++) {
                if (state.bookmarkList[i].name === payload) {
                    state.bookmarkList.splice(i, 1)
                }
            }
        },
    },
    actions: {
        toggleSideNavCollapse({commit}) {
            commit('toggleSideNavCollapseStatus')
        },
        clearBookmark({commit}) {
            commit('clearBookmarkStatus')
        },
        pushBookmark({commit}, bookmark) {
            commit('pushBookmarkStatus', bookmark)
        },
        deleteBookmark({commit}, bookmarkName) {
            commit('delegeBookmarkStatus', bookmarkName)
        },


    },
    modules: {
        login
    }
})
