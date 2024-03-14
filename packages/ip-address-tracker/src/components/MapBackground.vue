<script setup lang="ts">
import { ref, onMounted, onUnmounted, onUpdated } from 'vue'
import 'leaflet'

const props = defineProps({
  latitude: Number,
  longitude: Number
})

const el = ref()

let map: Lelflet.Map | undefined
let marker: Lelflet.Marker | undefined

function getLocation() {
  return new Promise<GeolocationCoordinates>((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('geo location is not available'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (err) => reject(err)
    )
  })
}

onUpdated(() => {
  if (map && marker) {
    map.setView([props.latitude ?? 0, props.longitude ?? 0], 15)
    marker.setLatLng([props.latitude ?? 0, props.longitude ?? 0])
  }
})

onMounted(async () => {
  const center = await getLocation()

  map = L.map(el.value, {
    center: [props.latitude ?? center.latitude, props.longitude ?? center.longitude],
    zoom: 15,
    zoomControl: false
  })

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  marker = L.marker([center.latitude, center.longitude], {
    icon: L.icon({
      iconUrl: `${import.meta.env.BASE_URL}icon-location.svg`,
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
    <div class="backdrop-mobile md:backdrop-desktop h-1/3 w-full bg-cover bg-no-repeat"></div>
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