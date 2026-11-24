<template>
  <router-view />
</template>

<script setup>
import { useHead } from '@unhead/vue'
import { ldScript, siteGraph } from './structuredData.js'

useHead({ script: [ldScript('ld-site', siteGraph)] })
</script>
