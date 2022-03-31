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

<template>
  <h1>Dräparen Tore</h1>
  <h1>Strandraggaren Health: {{EnemyHealth}}</h1>
  <h1>Tore Health: {{ToreHealth}}</h1>
  <div v-if="!GameOver">
    <button @click="toreAttack()">Attack</button>
    <button v-if="SpecialCounter>=3" @click="toreSpecial()">Special Attack {{SpecialCounter}}</Button>
    <button @click="toreHeal()">Heal</button>
    <button @click="surrender()">Surrender</button>
  </div>
  <h1>Resultat</h1>
  <ul>
    <li v-for="Attack in Log" :key="Attack.id">
      {{Attack.name + " " + Attack.action + " " + (Attack.healthPoints ? Attack.healthPoints : "")}}
    </li>
  </ul>
  <h1>Game Over: {{GameOver}}</h1>
  <h1>Winner: {{Winner}}</h1>
  <button v-if="GameOver" @click="reset()">Restart</button>
</template>

<style>
</style>
