// imports CSS
import './assets/css/global.css';
import './assets/css/tailwind.css';
import './utils/axiosConfig';
import 'vue3-toastify/dist/index.css';
import 'tippy.js/dist/tippy.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import 'tippy.js/themes/light.css';
import 'vue-awesome-paginate/dist/style.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './stores/index';
import Toast from 'vue3-toastify';
import vSelect from 'vue-select';
import VueAwesomePaginate from 'vue-awesome-paginate';

const app = createApp(App);

const toastConfig = {
    position: 'bottom-right',
    theme: 'colored',
    transition: 'bounce',
    autoClose: 5000
};

app.use(Toast, toastConfig);
app.use(store);
app.use(router);
app.use(VueAwesomePaginate);
app.component('v-select', vSelect);

app.mount('#app');
