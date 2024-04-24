export default {
    state: {
        // theme: 'light',
        // primaryColor: '#288F4D',
        // primaryDarkColor: '#1a5e33',
        // themeBase1: '#FCF7FF',
        // themeBase2: '#F9FAFC',
        // secondaryColor: '#495768',
        // textColor: '#495768',
        // secondaryTextColor: '#F9FAFC',
        // errorColor: '#F44336'
        theme: 'dark',
        primaryColor: '#288F4D',
        primaryDarkColor: '#1a5e33',
        themeBase1: '#242526',
        themeBase2: '#18191A',
        themeLine: '#474747',
        secondaryColor: '#676767',
        textColor: '#FCF7FF',
        secondaryTextColor: '#333333',
        errorColor: '#F44336'
    },
    mutations: {
        setThemeColor(state, { theme, primaryColor, secondaryColor }) {
            state.theme = theme || localStorage.getItem('theme');
            switch (state.theme) {
                case 'light':
                    state.themeBase1 = '#FCF7FF';
                    state.themeBase2 = '#F9FAFC';
                    state.textColor = '#495768';
                    break;
                case 'dark':
                    state.themeBase1 = '#242526';
                    state.themeBase2 = '#18191A';
                    state.textColor = '#E3E6EA';
                    break;
                default:
                    state.primaryColor = '#288F4D';
                    state.primaryDarkColor = '#1a5e33';
                    state.themeBase1 = '#FCF7FF';
                    state.themeBase2 = '#F9FAFC';
                    state.textColor = '#495768';
                    state.secondaryColor = '#495768';
                    state.secondaryTextColor = '#F9FAFC';
                    state.errorColor = '#F44336';
                    break;
            }
            state.primaryColor = primaryColor || state.primaryColor;
            state.secondaryColor = secondaryColor || state.secondaryColor;
        }
    },
    actions: {
        switchTheme({ commit, state }) {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            commit('setThemeColor', { theme: newTheme });
        }
    },
    getters: {
        theme: (state) => state.theme,
        themeBase1: (state) => state.themeBase1,
        themeBase2: (state) => state.themeBase2,
        primaryColor: (state) => state.primaryColor,
        primaryDarkColor: (state) => state.primaryDarkColor,
        secondaryColor: (state) => state.secondaryColor,
        textColor: (state) => state.textColor,
        secondaryTextColor: (state) => state.secondaryTextColor,
        errorColor: (state) => state.errorColor
    }
};
