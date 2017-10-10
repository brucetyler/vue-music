<template>
  <div class="mymusic">
  	0
  </div>
</template>

<script>
export default {
  name: 'mymusic',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mymusic {
  position: fixed;
  background: #fff;
  overflow: auto;
  top: 50px;
  bottom: 46px;
  left: 0;
  right: 0;
  z-index: 9;
  -webkit-overflow-scrolling: touch;
}

</style>
