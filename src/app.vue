<template>
  <div class="app">
    <h1>测试Vue</h1>
    <img class="vue-logo" src="./vue.png" alt="">
    <p>{{msg}}</p>
    <button @click="test">测试js</button>
  </div>
</template>

<script>
  export default {
    name: "app",
    data () {
      return {
        msg: '测试信息'
      }
    },
    methods: {
      test () {
        this.msg = '测试成功';
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