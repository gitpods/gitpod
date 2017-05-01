import Vuex from "vuex";
import axios from "axios";

export const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		users: [],
	},
	getters: {
		getUser: (state) => (username) => {
			const users = state.users.filter((user) => {
				return user.username === username;
			});
			if (users.length > 0) {
				return users[0];
			}
			return {};
		}
	},
	mutations: {
		addUsers(state, users) {
			state.users = users;
		},
		addUser(state, newUser) {
			for (let i = 0; i < state.users.length; i++) {
				if (state.users[i].username === newUser.username) {
					state.users[i] = newUser;
					return
				}
			}
			state.users.push(newUser);
		},
		updateUser(state, updatedUser) {
			for (let i = 0; i < state.users.length; i++) {
				if (state.users[i].id === updatedUser.id) {
					state.users[i] = updatedUser;
					return
				}
			}
		}
	},
	actions: {
		fetchUsers(ctx)
		{
			axios.get('/api/users')
				.then((res) => {
					ctx.commit('addUsers', res.data);
				})
				.catch((err) => {
					alert(err);
				})
		},
		fetchUser(ctx, username)
		{
			axios.get(`/api/users/${username}`)
				.then((res) => {
					ctx.commit('addUser', res.data);
				})
				.catch((err) => {
					alert(err);
				})
		},
		updateUser(ctx, user)
		{
			axios.put(`/api/users/${user.username}`, user)
				.then((res) => {
					ctx.commit('updateUser', res.data);
				})
				.catch((err) => {
					alert(err);
				})
		},
		deleteUser(ctx, username)
		{
			axios.delete(`/api/users/${username}`)
				.then((res) => {
					ctx.dispatch('fetchUsers');
				})
				.catch((err) => {
					alert(err);
				})
		}
	},
});
