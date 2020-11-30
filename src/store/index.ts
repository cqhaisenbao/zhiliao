import {createStore} from 'vuex';
import {testPosts, testData} from '@/testData';

const store = createStore<GlobalDataProps>({
    state: {
        columns: testData,
        posts: testPosts,
        user: {isLogin: true, name: 'frank', columnId: 2}
    },
    mutations: {
        login(state) {
            state.user = {isLogin: true, name: 'jack'};
        },
        createPost(state, newPost) {
            state.posts.push(newPost);
        }
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
