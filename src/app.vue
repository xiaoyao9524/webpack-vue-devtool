<template>
  <div class="app">
    <h1>测试Vue</h1>
    <img class="vue-logo" src="./vue.png" alt="">
    <p>{{msg}}</p>
    <button @click="test">测试js</button>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "app",
    data () {
      return {
        msg: 'Hello World!!!',
        flag: false
      }
    },
    created () {
      axios.get('/index/recommend.json')
          .then((res) => {
            console.log(res.data.list)
          })
    },
    methods: {
      test () {
        this.flag = !this.flag;
        this.msg = this.flag ? 'Hello Vue!!!' : 'Hello World!!!';
      }
    }
  }
</script>

<style scoped lang="scss">
  .app {
    text-align: center;
    .vue-logo {
      width: 50px;
      height: 50px;
    }
    h1 {
      color: green;
    }
  }
</style>
