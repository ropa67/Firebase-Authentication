<template>
  <Form @submit="onSubmit" class="login" :validation-schema="schema">
    <h2> Sign in</h2>
    <h3>Enter Your Credentials</h3>
    <div class="login-form">
      <div class="textbox">
        <Field name="email" type="text" placeholder="Email" v-model="email"/>
        <span class="material-symbols-outlined">account_circle</span>
      </div>
       <ErrorMessage class="error" name="email"/>
      <div class="textbox">
        <Field name="password" type="password" placeholder="Password" v-model="password"/>
        <span class="material-symbols-outlined">lock</span>
      </div>
      <ErrorMessage class="error" name="password"/>
        <button class="button">Sign in</button>
        <a href="/sign-in">Or Create Your Account</a>
    </div>
  </Form>

</template>


<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import {ref} from 'vue'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {useRouter} from 'vue-router'

import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

const router = useRouter()
const errorMsg = ref()
const email = ref("")
const password = ref("")

const onSubmit = () => {
  // Submit values to API...
//console.log(JSON.stringify(this.email, this.password, values, null, 2));
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
        // eslint-disable-next-line no-unused-vars
        .then((data) => {
          console.log("succesfull login")
          console.log(getAuth().currentUser)
          router.push('/feed')
        })
        .catch((error) => {
          alert(error.code)
          switch (error.code){
            case "auth/invalid-email":
              errorMsg.value = 'Invalid emmail';
              break;
            case "auth/user-not-found":
              errorMsg.value = 'No account with thath email was fount';
              break;
            case "auth/wrong-password":
              errorMsg.value = "incorrect password";
              break;
            default:
              errorMsg.value = "Email or password was incorect";
              break;
          }
      })
}

</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

html,
body,
.wrapper {
  height: 100%;
}

@keyframes gradient {
  100% {
    background-size: 40px 10px;
  }
}

@media (max-width: 500px) {
  body {
    padding: 0;
  }
}

.login {
  position: fixed;
  z-index: 3;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 380px;
  padding: 70px 30px 44px;
  border-radius: 22px;
  background: #161616;
  text-align: center;
  margin: 5% 0;

}

@media (max-width: 500px) {
  .login {
    width: 380px; 
    max-height: calc(110vh - 100px);
    overflow-y: auto; }
  }

@media (max-height: 520px) {
  .login {
    width: 380px; 
    max-height: calc(110vh - 100px);
    overflow-y: auto; }
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