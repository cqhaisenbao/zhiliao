import {createApp} from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import axios from 'axios';

axios.defaults.baseURL = 'http://apis.imooc.com/api/';
axios.interceptors.request.use(config => {
    store.commit('setLoading', true);
    config.params = {...config.params, icode: 'CD1DF9C24BFE7760'};
    if (config.data instanceof FormData) {
        config.data.append('icode', 'CD1DF9C24BFE7760');
    } else {
        config.data = {...config.data, icode: 'CD1DF9C24BFE7760'};
    }
    return config;
}, err => {
    return Promise.reject(err);
});

axios.interceptors.response.use(config => {
    store.commit('setLoading', false);
    return config;
}, e => {
    console.log(e.response);
    const {error} = e.response.data;
    store.commit('setError', {status: true, message: error});
    store.commit('setLoading', false);
    return Promise.reject(error);
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
