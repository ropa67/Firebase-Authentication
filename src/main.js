/* eslint-disable no-undef */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDERizvmIvni_uRN9GLfAjOedtwzUqj_ds",
  authDomain: "authentication1-dc4fb.firebaseapp.com",
  projectId: "authentication1-dc4fb",
  storageBucket: "authentication1-dc4fb.appspot.com",
  messagingSenderId: "435849315366",
  appId: "1:435849315366:web:c7eebbc2ee5175c520d2e7",
  measurementId: "G-8HJVY29Y04"
};

  // eslint-disable-next-line no-unused-vars
  const app = initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
