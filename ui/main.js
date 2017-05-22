import Vue from "vue";
import VueRouter from "vue-router";

import {store} from "./store";
import App from "./app.vue";
import Login from "./login.vue";
import UserList from "./user/list.vue";
import UserProfile from "./user/profile.vue";
import UserEdit from "./user/edit.vue";
import Pulls from "./pulls/pulls.vue";
import Issues from "./issues/issues.vue";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{path: "/", component: UserList},
		{path: "/login", component: Login},
		{path: '/pulls', component: Pulls},
		{path: '/issues', component: Issues},
		{path: "/:username", component: UserProfile},
		{path: "/:username/edit", component: UserEdit},
	],
});

new Vue({
	el: '#app',
	store: store,
	router: router,
	render: h => h(App)
});
