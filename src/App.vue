<template>
  <TheCalculator msg="Welcome to Your Vue.js App"/>
</template>

<script>
import TheCalculator from './components/TheCalculator.vue'

export default {
  name: 'App',
  components: {
    TheCalculator
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}
h1 {
  color: #138513;
}
</style>
