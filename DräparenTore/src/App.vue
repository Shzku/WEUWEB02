<script lang="ts">
let id = 0;

interface logObject{
  attackID: number;
  name: string;
  action: string;
  healthPoints: number;
}

export default {
  data() {
    return {
      ToreHealth: 100,
      EnemyHealth: 100,
      GameOver: false, // Use to check whether the game is over and should hide the buttons
      Winner: "",
      SpecialCounter: 0,
      EnemyTurnDamage: 0,
      ToreTurnDamage: 0,
      Log: Array<logObject>()
    }
  },
  methods: {
    randomNum(min: number, max: number) {
      return Math.round(Math.random() * (max - min) + min)
    },
    winCheck() {
      if(this.ToreHealth <= 0 && this.EnemyHealth <= 0){
        this.GameOver = true
        this.Winner = "It's a draw"
      } else {
        if(this.ToreHealth <= 0) {
          this.GameOver = true
          this.Winner = "Strandraggaren"
        }
        if(this.EnemyHealth <= 0) {
          this.GameOver = true
          this.Winner = "Tore"
        }
      }
    },
    logAttack(namn: string, event: string, skada: number) {
      let attack: logObject = {
        attackID: id++,
        name: namn,
        action: event,
        healthPoints: skada
      }
      this.Log.push(attack)
    },
    enemyDamage() { //random damage between 8-15
      this.EnemyTurnDamage = this.randomNum(8, 15)
      this.ToreHealth = this.ToreHealth - this.EnemyTurnDamage
      this.logAttack("Strandraggaren", "attackerar och dunkar in", this.EnemyTurnDamage)
    },
    toreAttack() { //random damage between 5-10
      this.enemyDamage()
      this.ToreTurnDamage = this.randomNum(5, 10)
      this.EnemyHealth = this.EnemyHealth - this.ToreTurnDamage
      this.logAttack("Tore", "attackerar och dunkar in", this.ToreTurnDamage)
      this.SpecialCounter++
      console.log(typeof this.Log)
      this.winCheck()
    },
    toreHeal() { //heal between 8-20
      this.enemyDamage() 
      this.ToreTurnDamage = this.randomNum(8, 20)
      this.ToreHealth = this.ToreHealth + this.ToreTurnDamage
      this.logAttack("Tore", "healar sig själv", this.ToreTurnDamage)
      this.SpecialCounter++
      this.winCheck()
    },
    toreSpecial() { //damage between 10-25
      this.enemyDamage()
      this.ToreTurnDamage = this.randomNum(10, 25)
      this.EnemyHealth = this.EnemyHealth - this.ToreTurnDamage
      this.logAttack("Tore", "attackerar och dunkar in", this.ToreTurnDamage)
      this.SpecialCounter=0
      this.winCheck()
    }, 
    surrender() {
      this.GameOver = true
      this.Winner = "Strandraggaren"
      this.logAttack("Tore", "ger upp", null)
    },
    reset() {
     this.ToreHealth = 100
     this.EnemyHealth = 100
     this.GameOver = false // Use to check whether the game is over and should hide the buttons
     this.Winner = ""
     this.SpecialCounter = 0
     //AttackLog = []
     this.Log = []
    }
  } 
}
</script>

<template class="columns">
<div class="column is-half" style="margin: auto;">
  <div class="box" style="background: #800000;">
    <h1 class="has-text-centered has-text-weight-bold is-size-4" style="color: white;">Dräparen Tore</h1>
  </div>
  <div class="box">
    <h1 class="has-text-centered has-text-weight-bold">Strandraggaren Health</h1>
    <progress class="progress is-large is-success" :value="EnemyHealth" max="100"></progress>
  </div>
  <div class="box">
    <h1 class="has-text-centered has-text-weight-bold">Tore Health</h1>
    <progress class="progress is-large is-success" :value="ToreHealth" max="100"></progress>
  </div>
  <div class="tile is-vertical" v-if="!GameOver">
    <div class="tile is-parent">
      <button class="button tile is-child" style="background: #800080; color: white;" @click="toreAttack()">Attack</button>
      <button class="button tile is-child" style="background: #800080; color: white;" :disabled="SpecialCounter<3" @click="toreSpecial()">Special Attack</Button>

    </div>
    <div class="tile is-parent">
      <button class="button tile is-child" style="background: #800080; color: white;" @click="toreHeal()">Heal</button>
      <button class="button tile is-child" style="background: #800080; color: white;" @click="surrender()">Surrender</button>
    </div>
  </div>
  <div v-if="!GameOver" class="box">
    <h1 class="has-text-centered has-text-weight-bold">Resultat</h1>
    <ul>
      <li v-for="Attack in Log" :key="Attack.id" class="has-text-centered">
        <span :style="Attack.name=='Tore' ? {'color': '#8F00FF'} : {'color': '#ffd700'}">{{Attack.name}}&nbsp;</span>
        <span> {{Attack.action}}&nbsp; </span>
        <span :style="Attack.action=='attackerar och dunkar in' ? {'color': '#ff0000'} : {'color': '#00ff00'}">{{Attack.healthPoints ? Attack.healthPoints : ""}}</span>
      </li>
    </ul>
  </div>
  <div v-else class="box has-text-centered">
    <h1 class="bold">Game Over!</h1><br>
    <h1 class="bold">{{Winner=="It's a draw" ? Winner : (Winner + " won!")}}</h1><br>
    <button class="button" style="background: #800080; color: white;" @click="reset()">Start New Game</button>
  </div>
</div>
</template>

<style>
.bold {
  font-weight: bold;
}
</style>
