<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand">APP Vue Typescript JWT</a>

        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link btn" @click="logOutUser">LOGOUT</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <section>
      <div class="container mt-4 d-flex flex-column justify-content-center align-items-center">
        <h1>Bem-Vindo!</h1>
        <h3>Home Page</h3>
      </div>
    </section>
  </div>
</template>

<script>
import VueJWTDecode from 'vue-jwt-decode';

export default {
  name: 'HomeComponent',
  data() {
    return {
      user: {},
    };
  },
  methods: {
    getUser() {
      const token = localStorage.getItem('jwt');
      const tokenDecoded = VueJWTDecode.decode(token);
      this.user = tokenDecoded;
    },
    logOutUser() {
      localStorage.removeItem('jwt');
      this.$router.push('/');
    },
  },
  created() {
    this.getUser();
  },
};
</script>
