import { createApp } from 'vue';
import App from './App.vue';

// Create the app
const app = createApp(App);

// Import the styles
import "./static/style.css"

app.mount('#app');