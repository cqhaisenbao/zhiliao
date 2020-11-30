import {createStore} from 'vuex';
import {testPosts, testData} from '@/testData';

const store = createStore<GlobalDataProps>({
    state: {
        columns: testData,
        posts: testPosts,
        user: {isLogin: false}
    },
    mutations: {},

});
export default store;
