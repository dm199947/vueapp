<template>
  <div id="app">
    <Index></Index>
  </div>
</template>

<script>
import Index from "./pages/Index";


export default {
  components: {
    Index
  }
};
</script>

<style lang="scss" >
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
