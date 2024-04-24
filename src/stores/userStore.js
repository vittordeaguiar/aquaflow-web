export default {
    state: {
        isAuthenticated: false,
        id: null,
        email: '',
        name: '',
        role: ''
    },
    mutations: {
        SET_AUTHENTICATED: (state, value) => (state.isAuthenticated = value),
        SET_ID: (state, value) => (state.id = value),
        SET_EMAIL: (state, value) => (state.email = value),
        SET_NAME: (state, value) => (state.name = value),
        SET_ROLE: (state, value) => (state.role = value)
    },
    actions: {
        authenticate({ commit }, payload) {
            commit('SET_AUTHENTICATED', payload.isAuthenticated);
            commit('SET_ID', payload.id);
            commit('SET_NAME', payload.name);
            commit('SET_EMAIL', payload.email);
            commit('SET_ROLE', payload.role);
        }
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        id: (state) => state.id,
        email: (state) => state.email,
        name: (state) => state.name,
        role: (state) => state.role
    }
};
