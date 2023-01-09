// eslint-disable-next-line vue/multi-word-component-names
<template>
   <div class="login">
       <h2>Login</h2>
       <h3>Enter Your Credentials</h3>
       <div class="login-form">
           <div class="textbox">
               <input type="email" placeholder="Email" v-model="state.emailInput" @blur="v$.emailInput.$touch()">
               <span class="material-symbols-outlined">account_circle</span>
           </div>
          <span v-if="v$.emailInput.$error"> {{ v$.emailInput.$errors[0].$message }} </span>
           <div class="textbox">
               <input type="password" placeholder="Password" v-model="state.password" @blur="v$.password.$touch()">
               <span class="material-symbols-outlined">lock</span>
           </div>
           <span v-if="v$.password.$error"> {{ v$.password.$errors[0].$message }} </span>
           <button @click="submit" class="button">Submit</button>
           <a href="/register">Rregister now</a>
       </div>
   </div>
</template>

<script >
import {required, email, minLength, helpers } from '@vuelidate/validators'
import {reactive, computed} from 'vue'
import useVuelidate from '@vuelidate/core'
import {ref} from 'vue'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {useRouter} from 'vue-router'

const errorMsg = ref()
const password = ref("")
const router = useRouter()
const emailInput = ref("")


export default {
  setup() {
    console.log(state)
    const state = reactive({
      emailInput: '',
      password: '',
    })

    // eslint-disable-next-line no-unused-vars
    const submit = () => {

    signInWithEmailAndPassword(getAuth(), emailInput.value, password.value)
    // eslint-disable-next-line no-unused-vars
    .then((data) => {
        console.log("succesfull login")
        console.log(getAuth().currentUser)
        router.push('/feed')
    })
    .catch((error) => {
        console.log(error.code)
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
    // eslint-disable-next-line no-unused-vars
    const emailMustBe = (value) => value.includes('')
    // eslint-disable-next-line no-unused-vars
    const passwordMustBe = (value) => value.includes('')

    const rules = computed(() => {
      return {
        emailInput: {required, email},
        emailMustBe: helpers.withMessage('', emailMustBe),
        password: {required, minLength: minLength(6)},
        passwordMustBe: helpers.withMessage('', passwordMustBe),
      }
    })

    const v$ = useVuelidate(rules, state)
    return{ state, v$ }
    },
methods: {
  submit(){
    this.v$.$validate()
    if(!this.v$.$error) {
      alert('Form successfully submited.')
    }else {
      alert('Form wrongly submited.')
      console.log(this.v$.$error)
    }
  }
}
}

</script >


// <script setup>
// // import {ref} from 'vue'
// // import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
// // import {useRouter} from 'vue-router'
// // const errorMsg = ref()

// // const password = ref("")
// // const router = useRouter()

// eslint-disable-next-line no-unused-vars
// const submit = () => {

//     const auth = getAuth()

//     signInWithEmailAndPassword(auth, emailInput.value, password.value)
//     // eslint-disable-next-line no-unused-vars
//     .then((data) => {
//         console.log("succesfull login")
//         console.log(auth.currentUser)
//         router.push('/feed')
//     })
//     .catch((error) => {
//         console.log(error.code)
//         switch (error.code){
//           case "auth/invalid-email":
//             errorMsg.value = 'Invalid emmail';
//             break;
//           case "auth/user-not-found":
//             errorMsg.value = 'No account with thath email was fount';
//             break;
//           case "auth/wrong-password":
//             errorMsg.value = "incorrect password";
//             break;
//           default:
//               errorMsg.value = "Email or password was incorect";
//               break;

//         }
//     })
// }

// </script>


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