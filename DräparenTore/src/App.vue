<script lang="ts">
export default {
  data() {
    return {
      ToreHealth: 100,
      EnemyHealth: 100,
      GameOver: false, // Use to check whether the game is over and should hide the buttons
    }
  },
  methods: {
    randomNum(min: number, max: number) {
      return Math.round(Math.random() * (max - min) + min)
    },
    damage() { //random damage between 8-15
      this.ToreHealth = this.ToreHealth - this.randomNum(8, 15)
    },
    toreAttack() { //random damage between 5-10
      this.EnemyHealth = this.EnemyHealth - this.randomNum(5, 10)
      this.damage()
    },
    heal() {
      this.ToreHealth = this.ToreHealth + this.randomNum(8, 20)
    }, //heal between 8-20
    toreSpecial() {}, //damage between 10-25
    surrender() {}
  } 
}
</script>

<template>
  <h1>Dräparen Tore</h1>
  <h1>Strandraggaren Health: {{EnemyHealth}}</h1>
  <h1>Tore Health: {{ToreHealth}}</h1>
  <Button @click="toreAttack()">Attack</Button>
  <Button>Special Attack</Button>
  <Button @click="heal()">Heal</Button>
  <Button>Surrender</Button>
  <h1>Resultat</h1>
</template>

<style>
</style>
