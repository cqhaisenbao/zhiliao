import {Commit, createStore} from 'vuex';
import axios, {AxiosRequestConfig} from 'axios';
import {arrToObj, objToArr} from '@/helper';

const asyncAndCommit = async (url: string, mutationName: string, commit: Commit, config: AxiosRequestConfig = {method: 'get'}) => {
    const {data} = await axios(url, config);
    commit(mutationName, data);
    return data;
};

const store = createStore<GlobalDataProps>({
    state: {
        error: {status: false},
        token: localStorage.getItem('token') || '',
        loading: false,
        columns: {},
        posts: {},
        user: {isLogin: false}
    },
    mutations: {
        createPost(state, newPost) {
            state.posts[newPost._id] = newPost;
        },
        fetchColumns(state, rawData) {
            state.columns = arrToObj(rawData.data.list);
        },
        fetchColumn(state, rawData) {
            state.columns[rawData.data._id] = rawData.data;
        },
        fetchPosts(state, rawData) {
            state.posts = rawData.data.list;
        },
        fetchPost(state, rawData) {
            state.posts[rawData.data._id] = rawData.data;
        },
        deletePost(state, {data}) {
            delete state.posts[data._id];
        },
        updatePost(state, {data}) {
            state.posts[data._id] = data;
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
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        },
        logout(state) {
            state.token = '';
            state.user = {isLogin: false};
            localStorage.removeItem('token');
            delete axios.defaults.headers.common.Authorization;
        }
    },
    actions: {
        fetchColumns({commit}) {
            return asyncAndCommit('/columns', 'fetchColumns', commit);
        },
        fetchColumn({commit}, cid) {
            return asyncAndCommit(`/columns/${cid}`, 'fetchColumn', commit);
        },
        fetchPosts({commit}, cid) {
            return asyncAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit);
        },
        fetchPost({commit}, id) {
            return asyncAndCommit(`/posts/${id}`, 'fetchPost', commit);
        },
        updatePost({commit}, {id, payload}) {
            return asyncAndCommit(`/posts/${id}`, 'updatePost', commit, {
                method: 'patch',
                data: payload
            });
        },
        fetchCurrentUser({commit}) {
            return asyncAndCommit('/user/current', 'fetchCurrentUser', commit);
        },
        login({commit}, payload) {
            return asyncAndCommit('/user/login', 'login', commit, {method: 'post', data: payload});
        },
        createPost({commit}, payload) {
            return asyncAndCommit('/posts', 'createPost', commit, {method: 'post', data: payload});
        },
        deletePost({commit}, id) {
            return asyncAndCommit(`/posts/${id}`, 'deletePost', commit, {method: 'delete'});
        },
        loginAndFetch({dispatch}, loginData) {
            return dispatch('login', loginData).then(() => {
                return dispatch('fetchCurrentUser');
            });
        },
    },
    getters: {
        getColumns: (state) => {
            return objToArr(state.columns);
        },
        getColumnById: (state) => (id: string) => {
            if (state.columns) {
                return state.columns[id];
            }
        },
        getPostByCid: (state) => (cid: string) => {
            if (state.posts) {
                return objToArr(state.posts).filter(post => post.column === cid)
            }
        },
        getCurrentPost: (state) => (id: string) => {
            return state.posts[id]
        }
    }

});
export default store;
