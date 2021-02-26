<template>
  <v-stage id="app" :config="{ width: 1038, height: 32 }">
    <v-layer>
      <v-rect :config="{ x: 0, y: 0, width: 1038, height: 32, fill: 'white' }" />
      <v-text
        :config="{ text: 'Hello Degica', x: 50, y: 10, fontSize: 14, fontFamily: 'Press Start 2P', fill: 'black' }"
      />
      <v-circle
        :config="{
          x: 30,
          y: 15,
          radius: 10,
          fill: 'blue',
          stroke: 'black',
          strokeWidth: 4,
        }"
      />
    </v-layer>
  </v-stage>
</template>

<script>
export default {};
</script>

<style></style>
