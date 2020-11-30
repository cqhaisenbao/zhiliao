import {createStore} from 'vuex';
import {testPosts, testData} from '@/testData';

const store = createStore<GlobalDataProps>({
    state: {
        columns: testData,
        posts: testPosts,
        user: {isLogin: false}
    },
    mutations: {
        login(state) {
            state.user = {isLogin: true, name: 'jack'};
        },
    },
    getters: {
        biggerColumnsLen(state) {
            return state.columns.filter(c => c.id > 1).length;
        },
        getColumnById: (state) => (id: number) => {
            return state.columns.find(c => c.id === id);
        },
        getPostByCid: (state) => (cid: number) => {
            return state.posts.filter((post => post.columnId === cid));
        }
    }

});
export default store;
