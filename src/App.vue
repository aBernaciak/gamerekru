<template>
  <div id="app">
    <ul class="main-menu">
      <li class="main-button">
        <router-link to="/correct-proposition">Propozycja z użyciem pociętych elementów z plik .psd (wersja poprawna)</router-link>
      </li>
      <li class="main-button">
        <router-link to="/background-proposition">Propozycja z użyciem <pre>'background-image'</pre> zawierającego wszystkie elementy razem</router-link>
      </li>
    </ul>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import VueCircle from 'vue2-circle-progress'
import BackgroundProposition from './components/BackgroundProposition.vue'
import CorrectProposition from './components/CorrectProposition.vue'

export default {
  name: 'app',
  components: {
    VueCircle, BackgroundProposition, CorrectProposition
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  #app {
    text-align: center;
    font-family: 'Cormorant Infant', serif;
    .main-menu {
      list-style-type: none;
      margin-bottom: 40px;
      padding: 0;
      pre {
        display: inline-block;
        margin: 0;
      }
      a {
        text-decoration: none;
        display: inline-block;
        padding: 8px;
        background: rgba(0,0,0,0.6);
        color: #fff;
        border-radius: 5px;
        transition: opacity 0.3s ease-in;
        margin-bottom: 10px;
        &:hover {
          opacity: 0.8;
        }
      } 
    }
  }
  .router-view {
    margin-top: 30px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
