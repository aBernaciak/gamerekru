<template>
  <div id="correct-proposition">
    <div class="counter-container">
      <div class="counter-container-inner">
        <img src="../assets/logo.png" alt="" class="counter-logo-img">
        <div class="counter-inner-text-container">
          <div class="counter-inner-text">
            <span>Wszystkie miejsca zostały zajęte. Rozstrzygnięcie konkurus za:</span>
          </div>
        </div>
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
            </vue-circle> <!-- bibloteka do paska postępu -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCircle from 'vue2-circle-progress'
export default {
  name: 'correct-proposition',
  components: {
    VueCircle
  },
  data () {
    return {
      fill: {color: '#1076a0'}, //zmienna do koloru paska postępu
      counterMins: 30, // zmienna ilości minut
      counterSecs: 60, // zmienna ilości sekund
      cycleEnded: false // zmienna sprawdzajaca czy pasek się zapełnił
    }
  },
  computed: {
    time() { // zmienna tekstu w środku paska postępu
      if(!this.cycleEnded) {
        return this.counterMins + ' min <br/>' + this.counterSecs + ' sek';
      }
      else {
        return 'Teraz';
      }
    }
  },
  mounted() {  // kawałki kodu wykonywane gdy dany komponent zostanie załadowany i wypełni się danymi
    let totalTimeSecs = (this.counterMins*60) + this.counterSecs; // całkowity czas w sekundach
    let progress = 0; // aktualny progress
    const progressIntervalPercent = (100/totalTimeSecs); // zmienna wyznaczająca o ile procent ma zostać zapełniony pasek
                                                         // postępu po każdej sekundzie

    var progressInterval = setInterval(function(){ // interval służacy do aktualizowania paska postępu
      if(!this.cycleEnded) {
        progress = progress + progressIntervalPercent;
        this.$refs.mainCounter.updateProgress(progress);
      }
      else {
        clearInterval(progressInterval);
      }
    }.bind(this), 1000);

    var counterInterval = setInterval(function(){ // interval służacy do aktualizowania czasu w tekście w środku paska postępu
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

  #correct-proposition {
    width: 100%;
    margin: 0 auto;
    @media screen and (min-width: $break-medium) {
      width: 1000px;
    }
    .counter-container {
      position: relative;
      margin: 0 auto;
      background-color: #151c27;
      padding: 10px;
      @media screen and (min-width: $break-small) {
        padding: 25px;
      }
      .counter-container-inner {
        padding-right: 85px;
        border-radius: 5px;
        background-image: url(../assets/bg3.png);
        background-color: #1e2633;
        background-repeat: no-repeat;
        background-position: left;
        height: 90px;
        overflow: hidden;
        box-shadow: inset -1px 21px 96px -13px #8C8C8C;
        -webkit-box-shadow: inset -1px 21px 96px -13px #8C8C8C;
        -moz-box-shadow: inset -1px 21px 96px -13px #8C8C8C;
        -o-box-shadow: inset -1px 21px 96px -13px #8C8C8C;
        @media screen and (min-width: $break-small) {
          height: 134px;
          padding-right: 190px;
        }
      }
      .counter-logo-img {
        float: left;
        margin-left: -70px;
        @media screen and (min-width: $break-small) {
          margin-left: 0;
        }
      }
      .counter-inner-text-container {
        height: 100%;
        overflow: auto;
      }
      .counter-inner-text {
        text-align: left;
        display: table;
        float: left;
        margin: 0;
        height: 100%;
        width: 100%;
        overflow: auto;
        font-size: 14px;
        color: #ccc;
        font-weight: bold;
        span {
          display: table-cell;
          vertical-align: middle;
          padding: 10px;
        }
       @media screen and (min-width: $break-small) {
          font-size: 21px;
        }
      }
      .counter {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        @media screen and (min-width: $break-small) {
          right: 50px;
        }
        #percent-text {
          color: #fff;
          font-weight: bold;
          transform: translate(-50%, -50%);
          margin: 0;
          height: auto;
          font-family: 'Lato', sans-serif;
          font-size: 14px;
          @media screen and (min-width: $break-small) {
            font-size: 20px
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
