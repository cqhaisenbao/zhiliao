import {createStore} from 'vuex';
import {testPosts, testData} from '@/testData';
import axios from 'axios';

const store = createStore<GlobalDataProps>({
    state: {
        columns: [],
        posts: testPosts,
        user: {isLogin: true, name: 'frank', columnId: 2}
    },
    mutations: {
        login(state) {
            state.user = {isLogin: true, name: 'jack'};
        },
        createPost(state, newPost) {
            state.posts.push(newPost);
        },
        fetchColumns(state,rawData) {
            state.columns=rawData.data.list
        }
    },
    actions: {
        fetchColumns(context) {
            axios.get('/columns').then(resp => {
                context.commit('fetchColumns', resp.data);
            });
        }
    },
    getters: {
        // getColumnById: (state) => (id: number) => {
        //     return state.columns.find(c => c.id === id);
        // },
        getPostByCid: (state) => (cid: number) => {
            return state.posts.filter((post => post.columnId === cid));
        }
    }

});
export default store;
