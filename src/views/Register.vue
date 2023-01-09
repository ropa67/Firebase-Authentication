// eslint-disable-next-line vue/multi-word-component-names
<template>
   <div class="login">
       <h2>Create Account</h2>
       <h3>Enter Your Credentials</h3>
       <div class="login-form">
           <div class="textbox">
               <input type="email" placeholder="Username" v-model="email">
               <span class="material-symbols-outlined">account_circle</span>
           </div>
           <div class="textbox">
               <input type="password" placeholder="Password" v-model="password">
               <span class="material-symbols-outlined">
                   lock
               </span>
           </div>
           <button @click="register" class="button">Submit</button>
           <a href="/sign-in">Or login to Your account</a>
       </div>
   </div>
</template>


<script setup>
import {ref} from 'vue'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import {useRouter} from 'vue-router'

const email = ref("")
const password = ref("")
const router = useRouter()

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    // eslint-disable-next-line no-unused-vars
    .then((data) => {
        console.log("succesfull reg")
        router.push('/idk')
    })
    .catch((error) => {
        console.log(error.code)
        alert(error.message)
    })
}
</script>

<style lang="scss" scoped>
* {box-sizing: border-box;}
template {height: 100%;}

@keyframes gradient {
  100% {
    background-size: 4000px 1000px;
  }
}

.login {
  position: fixed;
  z-index: 3;
  top: 40%;
  left: 50%;
  translate: -50% -50%;
  width: 90%;
  padding: 70px 30px 44px;
  border-radius: 22px;
  background: #161616;
  text-align: center;
}

@media (width >= 450px) {
  .login {
    width: 380px;
  }
}

.login > h2 {
  font-size: 36px;
  font-weight: 500;
  margin: 0 0 4px;
}

.login > h3 {
  color: rgba(255, 255, 255, 0.38);
  margin: 0 0 30px;
  font-weight: 500;
  font-size: 16px;
}

.login-form {
  display: grid;
  gap: 16px;
  place-items: center;
  width: 100%;
  margin: 0;
}

.textbox {
  width: 100%;
  position: relative;
}

.textbox span {
  position: absolute;
  top: 50%;
  left: 16px;
  translate: 0 -50%;
  color: rgba(255, 255, 255, 0.38);
}

.login-form input,
.login-form button {
  
  width: 100%;
  height: 60px;
  outline: none;
  font-family: inherit;
  font-size: 16px;
  border-radius: 8px;
}

.button:hover
{background-color: #045aaf}

.button:active {
  background-color: #045aaf;
  transform: translateY(4px);
}


.login-form input {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.1);
  font-size: 18px;
  padding: 0 20px 0 50px;
  color: inherit;
}

.login-form input:focus {
  border-color: #157ae1;
}

.login-form input:focus ~ span {
  color: #157ae1;
}

.login-form button {
  width: 100%;
  height: 56px;
  cursor: pointer;
  background: #157ae1;
  color: #f9f9f9;
  border: 0;
  font-weight: 600;
  letter-spacing: 2px;
}

.login-form a {
  color: #157ae1;
  font-size: 16px;
  text-align: left;
  text-decoration: none;
}

.login-form a:hover {
  color: #045aaf;
}

</style>