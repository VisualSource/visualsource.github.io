<script setup lang="ts">
import { getLocation, type ApiResponse } from '@/lib/getLocation'
import { onMounted, ref } from 'vue'

const tests = {
  ipv4: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  domain: /^(?!-)[A-Za-z0-9-]+([-.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/
}

const query = ref<string>()
const error = ref<string>()
const loadError = ref<string>()
const loading = ref<boolean>(false)
const key = 'at_bhIktYH8JcZfaFE5m1ZdxUIVHWKTA'
const emit = defineEmits({
  mapUpdate(payload: { lat: number; lng: number }) {
    return Number.isInteger(payload.lat) && Number.isInteger(payload.lng)
  }
})

let data = ref()

onMounted(async () => {
  try {
    loading.value = true
    const self = localStorage.getItem('ip-address-tracker-self')
    if (self) {
      const payload = JSON.parse(self) as { expire: string; data: ApiResponse }

      if (new Date(payload.expire) > new Date()) {
        data.value = payload.data
        emit('mapUpdate', { lat: payload.data.location.lat, lng: payload.data.location.lng })
        return
      }
    }

    const search = new URLSearchParams()
    search.set('apiKey', key)

    const result = await getLocation(search)
    data.value = result

    localStorage.setItem(
      'ip-address-tracker-self',
      JSON.stringify({
        expire: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 1 /*hour*/ * 1 /*days*/),
        data: result
      })
    )

    emit('mapUpdate', { lat: result.location.lat, lng: result.location.lng })
  } catch (error) {
    console.log(error)
    loadError.value = 'Failed to load details'
  } finally {
    loading.value = false
  }
})

function validate(ev: Event) {
  const input = ev.target as HTMLInputElement

  if (input.validity.tooShort || input.validity.valueMissing) {
    error.value = input.validationMessage
    return
  }

  if (!(tests.ipv4.test(input.value) || tests.domain.test(input.value))) {
    input.setCustomValidity('The Ip address or domain is invalid')
    error.value = 'The Ip address or domain is invalid'
  } else {
    input.setCustomValidity('')
    error.value = ''
  }

  input.reportValidity()
}

async function onSubmit() {
  try {
    loadError.value = ''
    loading.value = true
    // test if domain or ip
    if (!query.value) throw new Error('No Query value')
    const search = new URLSearchParams()
    search.set('apiKey', key)
    if (tests.ipv4.test(query.value)) {
      search.set('ipAddress', query.value)
    } else if (tests.domain.test(query.value)) {
      search.set('domain', query.value)
    } else {
      throw new Error('Invalid ip or domain')
    }

    const payload = await getLocation(search)

    data.value = payload

    query.value = ''

    emit('mapUpdate', { lat: payload.location.lat, lng: payload.location.lng })
  } catch (error) {
    console.error(error)
    loadError.value = 'Failed to load details'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="absolute left-0 top-0 z-50 flex h-full w-full justify-center">
    <div class="container flex flex-col items-center space-y-6 p-6 md:space-y-8 md:py-8">
      <h1 class="font-b text-3xl font-medium text-white">IP Address Tracker</h1>

      <form @submit.prevent="onSubmit" class="flex w-full flex-col md:w-2/4">
        <fieldset class="peer flex w-full shadow-lg">
          <input
            @change="validate"
            required
            minlength="3"
            name="query"
            v-model.trim="query"
            placeholder="Search for any ip address or domian"
            class="flex h-14 w-full rounded-s-xl border border-dark-gray bg-white px-6 py-4 text-lg ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sm placeholder:text-dark-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-dark-gray focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:h-14"
            type="text"
          />
          <button
            aria-label="Submit query"
            type="submit"
            class="flex w-16 items-center justify-center rounded-e-xl bg-very-dark-gray transition-colors hover:bg-dark-gray"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
              <path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6" />
            </svg>
          </button>
        </fieldset>
        <p role="alert" class="hidden text-red-500 peer-invalid:block">{{ error }}</p>
      </form>

      <div class="flex w-full flex-col items-center justify-center md:px-6">
        <div
          v-if="!loading && loadError"
          class="flex h-full w-full flex-col items-center justify-center rounded-xl bg-white py-6 text-center shadow-xl md:py-8 md:pl-4 lg:py-12"
        >
          <h1 class="text-4xl font-medium uppercase animate-in fade-in-15">{{ loadError }}</h1>
        </div>
        <div
          v-if="loading || !data"
          class="flex h-full w-full flex-col items-center justify-center rounded-xl bg-white py-6 text-center shadow-xl md:py-8 md:pl-4 lg:py-12"
        >
          <h1 class="text-4xl font-medium uppercase animate-in fade-in-15">Loading Details...</h1>
        </div>
        <ul
          v-if="!loading && data && !loadError"
          class="flex h-full w-full flex-col items-center justify-center space-y-2 rounded-xl bg-white py-6 text-center shadow-xl *:animate-in *:fade-in-20 md:flex-row md:items-start md:justify-between md:divide-x md:py-8 md:pl-4 md:pr-32 md:text-left md:*:px-4 lg:py-12"
        >
          <li>
            <span class="text-xs font-bold leading-6 tracking-widest opacity-50 md:text-sm"
              >IP ADDRESS</span
            >
            <div class="text-lg font-medium md:text-2xl">{{ data.ip }}</div>
          </li>
          <li>
            <span class="text-xs font-bold leading-6 tracking-widest opacity-50 md:text-sm"
              >LOCATION</span
            >
            <div class="text-lg font-medium md:text-2xl">
              {{ data.location.city }}, {{ data.location.region }}
            </div>
          </li>
          <li>
            <span class="text-xs font-bold leading-8 tracking-widest opacity-50 md:text-sm"
              >TIMEZONE</span
            >
            <div class="text-lg font-medium md:text-2xl">UTC {{ data.location.timezone }}</div>
          </li>
          <li>
            <span class="text-xs font-bold leading-6 tracking-widest opacity-50 md:text-sm"
              >ISP</span
            >
            <div class="break-words text-lg font-medium md:text-2xl">{{ data.isp }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
