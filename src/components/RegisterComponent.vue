<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-success p-4 rounded-3"
          style="margin-top: 70px; height: auto; padding-top: 50px !important"
          v-on:submit.prevent="registerSubmitUserForm()"
        >
          <div class="form-group group-icon">
            <div class="circle-icon">
              <img src="../assets/user.png" alt="" class="icon" />
            </div>
            <h1 class="mb-4 text-success">Cadastro</h1>
          </div>

          <div class="form-group group-items">
            <img src="../assets/user.png" alt="" class="input-icon" />
            <input
              type="text"
              id="name"
              name="name"
              class="form-control input-form"
              placeholder="Inclua seu Nome"
              v-model="registerForm.name"
              :class="{
                'is-invalid': isSubmitted && $v.registerForm.name.$error,
              }"
            />
            <div v-if="isSubmitted && !$v.registerForm.name.required" class="invalid-feedback">
              O campo nome é obrigatório!
            </div>
          </div>

          <div class="form-group group-items">
            <img src="../assets/email.png" alt="" class="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              class="form-control input-form"
              placeholder="Inclua seu E-mail"
              v-model="registerForm.email"
              :class="{
                'is-invalid': isSubmitted && $v.registerForm.email.$error,
              }"
            />
            <div v-if="isSubmitted && !$v.registerForm.email.$error" class="invalid-feedback">
              <span v-if="!$v.registerForm.email.required">O campo e-mail é obrigatório!</span>
              <span v-if="!$v.registerForm.email.email">E-mail inválido!</span>
            </div>
          </div>

          <div class="form-group group-items">
            <img src="../assets/lock.png" alt="" class="input-icon" />
            <input
              type="password"
              id="password"
              name="password"
              class="form-control input-form"
              placeholder="Inclua a Senha"
              v-model="registerForm.password"
              :class="{
                'is-invalid': isSubmitted && $v.registerForm.password.$error,
              }"
            />
            <div v-if="isSubmitted && $v.registerForm.password.$error" class="invalid-feedback">
              <span v-if="!$v.registerForm.password.required">O campo senha é obrigatório!</span>
              <span v-if="!$v.registerForm.password.minLength"
                >A senha deve conter pelo menos 5 caracteres!</span
              >
            </div>
          </div>

          <p class="center">
            Já possui um login cadastrado?<router-link to="/"> Faça o Login Aqui</router-link>
          </p>

          <center>
            <button @click="submitRegisterUser" class="btn btn-success btn-block w-75 my-4">
              Cadastrar
            </button>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import { minLength, required } from 'vuelidate/lib/validators';
import RegisterService from '../services/RegisterService';

export default {
  name: 'RegisterComponent',
  data() {
    return {
      registerForm: {
        name: null,
        email: null,
        password: null,
      },
      isSubmitted: false,
    };
  },
  validations: {
    registerForm: {
      name: { required },
      email: { required },
      password: { required, minLength: minLength(5) },
    },
  },
  methods: {
    registerSubmitUserForm() {
      console.log(this.registerForm.email);
    },

    async submitRegisterUser() {
      try {
        this.isSubmitted = true;

        this.$v.$touch();
        if (this.$v.$invalid) {
          swal({
            title: 'Oops!',
            text: 'Você precisa incluir todos os campos obrigatórios',
            icon: 'error',
          });
          return;
        }

        await RegisterService.registerNewUser(this.registerForm);
        this.$router.push('/');
      } catch (error) {
        swal({
          title: 'Oops!',
          text: 'Alguma coisa deu errado aqui!',
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
