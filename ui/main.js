import Vue from "vue";

import {store} from "./store";
import App from "./app.vue";

new Vue({
    el: '#app',
    store: store,
    render: h => h(App)
});
