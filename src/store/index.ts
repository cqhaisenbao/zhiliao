import {createStore, Commit} from 'vuex';
import axios from 'axios';

//commit是context.commit,所以直接写成{commit}，会自动解构赋值
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
    const {data} = await axios.get(url);
    commit(mutationName, data);
};

const store = createStore<GlobalDataProps>({
    state: {
        loading: false,
        columns: [],
        posts: [],
        user: {isLogin: true, name: 'frank', columnId: 2}
    },
    mutations: {
        login(state) {
            state.user = {isLogin: true, name: 'jack'};
        },
        createPost(state, newPost) {
            state.posts.push(newPost);
        },
        fetchColumns(state, rawData) {
            state.columns = rawData.data.list;
        },
        fetchColumn(state, rawData) {
            state.columns = [rawData.data];
        },
        fetchPosts(state, rawData) {
            state.posts = rawData.data.list;
        },
        setLoading(state, status) {
            state.loading = status;
        }
    },
    actions: {
        fetchColumns({commit}) {
            getAndCommit('/columns', 'fetchColumns', commit);
        },
        fetchColumn({commit}, cid) {
            getAndCommit(`/columns/${ cid }`, 'fetchColumn', commit);
        },
        fetchPosts({commit}, cid) {
            getAndCommit(`/columns/${ cid }/posts`, 'fetchPosts', commit);
        }
    },
    getters: {
        getColumnById: (state) => (id: string) => {
            if (state.columns) {
                return state.columns.find(c => c._id === id);
            }
        },
        getPostByCid: (state) => (cid: string) => {
            if (state.posts) {
                return state.posts.filter((post => post.column === cid));
            }
        }
    }

});
export default store;
