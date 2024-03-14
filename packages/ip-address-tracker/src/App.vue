<script setup lang="ts">
import MapBackground from './components/MapBackground.vue'
import InputAndData from './components/InputAndData.vue'
import { ref } from 'vue'

let latitude = ref<number>()
let longitude = ref<number>()

function onMapUpdate(ev: { lat: number; lng: number }) {
  latitude.value = ev.lat
  longitude.value = ev.lng
}
</script>

<template>
  <div class="flex h-full flex-col">
    <input-and-data @map-update="onMapUpdate"></input-and-data>
    <map-background :latitude="latitude" :longitude="longitude"></map-background>
  </div>
</template>
