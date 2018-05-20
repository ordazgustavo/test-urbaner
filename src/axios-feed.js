import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://test-urbaner.firebaseio.com/'
});

export default instance;