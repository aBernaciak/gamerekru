<template>
  <div id="bg-proposition">
    <div class="counter-container">
      <img src="../assets/bg.jpg" alt="" class="counter-background-img">
      <p class="counter-inner-text">Wszystkie miejsca zostały zajęte. Rozstrzygnięcie konkurus za:</p>
      <div class="counter">
        <vue-circle
            ref="mainCounter"
            id="circle"
            :progress="0.1"
            :size="150"
            :fill="fill"
            empty-fill="#232c39"
            :animation-start-value="0.0"
            :start-angle="(-Math.PI)*0.5"
            :show-percent="false"
            insert-mode="append"
            :thickness="15"
            :inner-text="time">
          </vue-circle>
      </div>
    </div>
  </div>
</template>

<script>
import VueCircle from 'vue2-circle-progress'
export default {
  name: 'bg-proposition',
  components: {
    VueCircle
  },
  data () {
    return {
      fill: {color: '#1076a0'},
      counterMins: 30,
      counterSecs: 60,
      cycleEnded: false
    }
  },
  methods:{
  },
  computed: {
    time() {
      if(!this.cycleEnded) {
        return this.counterMins + ' min <br/>' + this.counterSecs + ' sek';
      }
      else {
        return 'Teraz';
      }
    }
  },
  mounted() {
    let totalTime = (this.counterMins*60) + this.counterSecs;
    let progress = 0;
    const progressIntervalPercent = (100/totalTime);
    
    var progressInterval = setInterval(function(){
      if(!this.cycleEnded) {
        progress = progress + progressIntervalPercent;
        this.$refs.mainCounter.updateProgress(progress);
      }
      else {
        clearInterval(progressInterval);
      }
    }.bind(this), 1000);

    var counterInterval = setInterval(function(){
      if(this.counterSecs >= 1) {
        this.counterSecs--; 
      }
      else if(this.counterMins >= 1) {
        this.counterSecs = 60;
        this.counterMins--;
      }
      else if(this.counterMins === 0 && this.counterSecs === 0) {
        this.cycleEnded = true;
        clearInterval(counterInterval)
      }
    }.bind(this), 1000);
  },
  beforeDestroy() {
    this.cycleEnded = true;
    this.counterMins = 0;
    this.counterSecs = 0;
  }
}
</script>

<style lang="scss">
  $break-medium: 1000px;
  $break-small: 768px;

  #bg-proposition {
    display: inline-block;
    .counter-container {
      display: inline-block;
      position: relative;
      width: 100%;
      .counter-background-img {
        width: 1000px;
        max-width: 100%;
        height: 130px;
        @media screen and (min-width: $break-small) {
          height: auto;
        }
      }
      .counter-inner-text {
        margin: 0;
        position: absolute;
        left: 25%;
        top: 50%;
        transform: translate(0, -50%);
        font-size: 14px;
        text-align: left;
        color: #ccc;
        font-weight: bold;
        max-width: 50%;
        @media screen and (min-width: $break-small) {
          font-size: 20px;
        }
      }
      .counter {
        position: absolute;
        top: 50%;
        right: 5%;
        transform: translateY(-50%);
        #percent-text {
          color: #fff;
          font-weight: bold;
          transform: translate(-50%, -50%);
          margin: 0;
          height: auto;
          font-family: 'Lato', sans-serif;
          font-size: 14px;
          @media screen and (min-width: $break-small) {
            font-size: 20px;
          }
        }
      }
    }
    canvas {
      width: 80px;
      @media screen and (min-width: $break-small) {
        width: 150px;
      }
    }
  }
</style>
