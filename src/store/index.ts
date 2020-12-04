import {Commit, createStore} from 'vuex';
import axios from 'axios';

//commit是context.commit,所以直接写成{commit}，会自动解构赋值
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
    const {data} = await axios.get(url);
    commit(mutationName, data);
    return data;
};
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
    const {data} = await axios.post(url, payload);
    commit(mutationName, data);
    return data;
};

const store = createStore<GlobalDataProps>({
    state: {
        error: {status: false},
        token: localStorage.getItem('token') || '',
        loading: false,
        columns: [],
        posts: [],
        user: {isLogin: false}
    },
    mutations: {
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
        },
        setError(state, e: GlobalErrorProps) {
            state.error = e;
        },
        fetchCurrentUser(state, rawData) {
            state.user = {isLogin: true, ...rawData.data};
        },
        login(state, rawData) {
            const {token} = rawData.data;
            state.token = token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common.Authorization = `Bearer ${ token }`;
        },
        logout(state) {
            state.token = '';
            localStorage.removeItem('token');
            delete axios.defaults.headers.common.Authorization;
        }
    },
    actions: {
        fetchColumns({commit}) {
            return getAndCommit('/columns', 'fetchColumns', commit);
        },
        fetchColumn({commit}, cid) {
            return getAndCommit(`/columns/${ cid }`, 'fetchColumn', commit);
        },
        fetchPosts({commit}, cid) {
            return getAndCommit(`/columns/${ cid }/posts`, 'fetchPosts', commit);
        },
        fetchCurrentUser({commit}) {
            return getAndCommit('/user/current', 'fetchCurrentUser', commit);
        },
        login({commit}, payload) {
            return postAndCommit('/user/login', 'login', commit, payload);
        },
        loginAndFetch({dispatch}, loginData) {
            return dispatch('login', loginData).then(() => {
                return dispatch('fetchCurrentUser');
            });
        },
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
