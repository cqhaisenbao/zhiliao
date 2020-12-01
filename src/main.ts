import {createApp} from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import axios from 'axios';

axios.defaults.baseURL = 'http://apis.imooc.com/api/';
axios.interceptors.request.use(config => {
    config.params = {...config.params, icode: 'CD1DF9C24BFE7760'};
    if (config.data instanceof FormData){
        config.data.append('icode','CD1DF9C24BFE7760')
    }else{
        config.data={...config.params, icode: 'CD1DF9C24BFE7760'}
    }
    return config;
});


const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
