<template>
  <div class="range" @mouseup.stop='mouseUp'>
      <span class="range-left">{{timerFomart(getMusicCurrentTime)}}</span>
      <div class="duration" ref='duration'>
        <span class="currentProgress" :style="progressWidth" ref='currentProgress'></span>
        <span class="progressBall" @touchstart='touchStart' @touchmove='touchMove($event)' @touchend='touchEnd'></span>
      </div>
      <span class="range-right">{{timerFomart(getMusicDuration)}}</span>
  </div>
</template>

<script>
import store from '../store'
let currentWidth=0;
let moveFlag=false;
export default {
  data(){
    return {

    }
  },
  methods:{
    touchStart(){
      moveFlag=true;
      console.log('22')
    },
    touchMove(event){
      moveFlag=true;
      let e=event || window.event;
      let mouseX=e.touches[0].pageX;
      currentWidth=mouseX-this.$refs.duration.offsetLeft;
      this.$refs.currentProgress.style.width=currentWidth+'px';
    },
    touchEnd(){
      moveFlag=false;
      console.log(moveFlag)
      this.$store.state.audioInfo.audioEle.currentTime=Math.floor((currentWidth/this.$refs.duration.offsetWidth)*this.$store.getters.getMusicDuration)
    },
    mouseMove(){
      // let e=event || window.event;
      //  let mouseX=e.pageX;
      //  currentWidth=mouseX-this.$refs.duration.offsetLeft;
      //  this.$store.state.audioInfo.audioEle.currentTime==Math.floor((currentWidth/this.$refs.duration.offsetWidth)*this.$store.getters.getMusicDuration)
    },
    mouseUp(){
       moveFlag=false;
       let e=event || window.event;
       let mouseX=e.pageX;
       currentWidth=mouseX-this.$refs.duration.offsetLeft;
       this.$refs.currentProgress.style.width=currentWidth+'px';
       this.$store.state.audioInfo.audioEle.currentTime=Math.floor((currentWidth/this.$refs.duration.offsetWidth)*this.$store.getters.getMusicDuration)
    },
    timerFomart (time) {
      if (isNaN(time)) return '00:00'
      let min = time / 60 > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60)
      let second = time % 60 > 9 ? Math.floor(time % 60) : '0' + Math.floor(time % 60)
      return min + ':' + second
    }
  },
  computed:{
    getMusicDuration(){
      return this.$store.getters.getMusicDuration;
    },
    getMusicCurrentTime(){
      return this.$store.getters.getMusicCurrentTime
       // }
    },
    progressWidth(){
      if(moveFlag){
      return {
        'width':currentWidth+'px'
      }
      }
      else{
      return {
        'width':`calc(${(this.$store.getters.getMusicCurrentTime / this.$store.getters.getMusicDuration * 100).toFixed(2)}%`
      }
    }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.range{
    width:90%;
    height:100%;
    display:flex;
    margin: 0 auto;
    align-items:center;
    box-sizing:border-box;
    padding:0 10px;
}
.range .range-left{
  font-size: 12px;
  color: rgba(255,255,255,0.8);
  margin-right: 10px;
}
.range .range-right{
  font-size: 12px;
  color: rgba(255,255,255,0.8);
  margin-left: 10px;
}
.range .duration{
  flex: 1.0;
  height: 2px;
  background: rgba(244,244,244,0.3);
  margin: 0 auto;
  font-size: 0;
  cursor: pointer;
  position: relative;
}
.currentProgress{
  display:inline-block;
  width:0%;
  height:2px;
  background: #c62f2f;
  float:left;
  }
 .range .duration .progressBall{
    position: absolute;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 50%;
    float: left;
    cursor: pointer;
    margin-top: -7px;
  }
</style>
