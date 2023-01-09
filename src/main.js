import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
///
};

  // eslint-disable-next-line no-unused-vars
  const app = initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
