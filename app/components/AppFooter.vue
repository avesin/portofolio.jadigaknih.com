<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter class="z-10 bg-default" :ui="{ left: 'text-muted text-xs' }">
    <template #left>
      {{ footer.credits }}
      <!-- <footer class="footer">
        <div class="footer-content">
          <nav class="footer-links">
            <NuxtLink to="/about">About Us</NuxtLink>
            <NuxtLink to="/contact">Contact</NuxtLink>
            <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
            <NuxtLink to="/disclaimer">Disclaimer</NuxtLink>
          </nav>
        </div>
      </footer> -->
    </template>

    <template #right>
      <template v-if="footer?.links">
        <UButton v-for="(link, index) of footer?.links" :key="index"
          v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }" />
      </template>
    </template>
  </UFooter>
</template>