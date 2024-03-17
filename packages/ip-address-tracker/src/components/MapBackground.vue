<script setup lang="ts">
import { ref, onMounted, onUnmounted, onUpdated } from 'vue'
import 'leaflet'
import { normalize } from '@/lib/utils'

const props = defineProps({
  latitude: Number,
  longitude: Number
})

const el = ref()

let map: Leaflet.Map | undefined
let marker: Leaflet.Marker | undefined

onUpdated(() => {
  if (map && marker) {
    map.setView([props.latitude ?? 0, props.longitude ?? 0], 15)
    marker.setLatLng([props.latitude ?? 0, props.longitude ?? 0])
  }
})

onMounted(async () => {
  let latitude = props.latitude ?? 0
  let longitude = props.longitude ?? 0

  map = L.map(el.value, {
    center: [latitude, longitude],
    zoom: 15,
    zoomControl: false
  })

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  marker = L.marker([latitude, latitude], {
    icon: L.icon({
      iconUrl: normalize(`${import.meta.env.BASE_URL}/icon-location.svg`),
      iconSize: [46, 56],
      iconAnchor: [23, 56]
    })
  }).addTo(map)
})

onUnmounted(() => {
  map?.remove()
  map = undefined
  marker = undefined
})
</script>

<template>
  <div class="flex h-full flex-col">
    <div
      class="backdrop-mobile md:backdrop-desktop relative h-1/3 w-full bg-cover bg-no-repeat"
    ></div>
    <div class="h-2/3 w-full">
      <div id="map" ref="el"></div>
    </div>
  </div>
</template>

<style>
#map {
  @apply z-10 h-full w-full;
}
</style>
