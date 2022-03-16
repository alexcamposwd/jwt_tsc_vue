import axios from 'axios';

export default () => axios.create({
  baseURL: 'https://jwt-tsc-vue.herokuapp.com//api/v1',
});
