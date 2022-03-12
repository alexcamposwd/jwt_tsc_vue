<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-success p-4 rounded-3"
          style="margin-top: 70px; height: auto; padding-top: 50px !important"
          v-on:submit.prevent="loginSubmitUserForm()"
        >
          <div class="form-group group-icon">
            <div class="circleIcon">
              <img src="../assets/user.png" alt="" class="icon" />
            </div>
            <h1 class="mb-4 text-success">Login</h1>
          </div>

          <div class="form-group group-items">
            <img src="../assets/email.png" alt="" class="input-icon" />
            <input
              type="text"
              id="email"
              name="email"
              class="form-control input-form"
              placeholder="Digite seu E-mail"
              v-model="loginForm.email"
              :class="{
                'is-invalid': isSubmitted && $v.loginForm.email.$error, // ** vuelidade **
              }"
            />
            <div v-if="isSubmitted && !$v.loginForm.email.required" class="invalid-feedback">
              O campo e-mail é obrigatório!
            </div>
          </div>

          <div class="form-group group-items">
            <img src="../assets/lock.png" alt="" class="input-icon" />
            <input
              type="password"
              id="password"
              name="password"
              class="form-control input-form"
              placeholder="Digite sua Senha"
              v-model="loginForm.password"
              :class="{
                'is-invalid': isSubmitted && $v.loginForm.password.$error,
              }"
            />
            <div v-if="isSubmitted && !$v.loginForm.password.required" class="invalid-feedback">
              O campo password é obrigatório!
            </div>
          </div>

          <p class="center">
            Não tem uma conta cadastrada? <router-link to="/register"> Cadastre Aqui</router-link>
          </p>

          <center>
            <button @click="submitLoginUser" class="btn btn-success btn-block w-75 my-4">
              Entrar
            </button>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import { required } from 'vuelidate/lib/validators';
import LoginService from '../services/LoginService';

export default {
  name: 'LoginComponent',
  data() {
    return {
      loginForm: {
        email: null,
        password: null,
      },
      isSubmitted: false,
    };
  },
  validations: {
    loginForm: {
      email: { required },
      password: { required },
    },
  },
  methods: {
    loginSubmitUserForm() {
      console.log(this.loginForm.email);
    },

    async submitLoginUser() {
      try {
        this.isSubmitted = true;

        this.$v.$touch();
        if (this.$v.$invalid) {
          swal({
            title: 'Oops!',
            text: 'Você precisa incluir todos os campos obrigatórios!',
            icon: 'error',
          });
          return;
        }

        await LoginService.loginUser(this.loginForm);
        this.$router.push('/home');
      } catch (error) {
        swal({
          title: 'Senha Incorreta!',
          text: 'Digite a senha cadastrada!',
          icon: 'error',
        });
      }
    },
  },
};
</script>

<style scoped>
.invalid-feedback {
  margin-top: -30px;
  margin-bottom: 10px;
}

.group-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.circle-icon {
  position: relative;
  width: 100px;
  height: 100px;
  background-color: #198754;
  border-radius: 50%;
  padding: 20px;
  margin-bottom: 20px;
}

.icon {
  position: absolute;
  width: 80px;
  height: 80px;
  margin: auto 0;
  transform: translateX(-50%);
  bottom: -7px;
  filter: invert(100%) sepia(0%) saturate(7464%) hue-rotate(165deg) brightness(105%) contrast(93%);
}

.group-items {
  position: relative;
  display: inline-block;
  width: 100%;
  margin-bottom: 80px !important;
}

.input-icon {
  position: absolute;
  width: 28px;
  height: 28px;
  left: 0;
  filter: invert(31%) sepia(55%) saturate(6075%) hue-rotate(145deg) brightness(91%) contrast(80%);
}

.input-form {
  position: absolute;
  right: 0;
  width: 90%;
}
</style>
