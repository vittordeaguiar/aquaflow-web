const switchTheme = async (newTheme) => await store.dispatch('switchTheme', { theme: newTheme });

export default { switchTheme };