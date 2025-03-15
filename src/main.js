// main.js
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 如果你有全局组件或其他插件需要注册，可以在这里进行
// app.component('Card', Card);
// app.use(SomePlugin);

import "./static/style.css"

app.mount('#app');