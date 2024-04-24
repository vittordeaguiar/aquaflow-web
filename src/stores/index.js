import { createStore } from 'vuex';
import user from './userStore';
import theme from './theme';
export default createStore({
    modules: {
        user,
        theme
    }
});
