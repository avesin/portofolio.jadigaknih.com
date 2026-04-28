<script setup lang="ts">
const { footer } = useAppConfig()
const props = defineProps<{
  ui?: any
  class?: string
  type?: 'top' | 'bottom'
}>()
</script>

<template>
  <UFooter class="z-10 bg-default" :ui="{
    left: 'flex-none text-muted text-xs',
    right: 'flex items-center gap-2'
  }">
    <template #left>
      <div class="text-muted text-xs w-auto shrink-0">
        {{ footer.credits }}
      </div>
    </template>
    <template #right>
      <template v-if="footer?.links">
        <template v-for="(link, index) of (type == 'top' ? footer.links.slice(0, 3) : footer.links.slice(4))" :key="index">
          <UButton class="p-0 opacity-70 hover:opacity-100"
            v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }">
            {{ link.label ?? '' }}
          </UButton>
          <span v-if="type == 'bottom' && index < footer.links.length - 1">•</span>
        </template>
      </template>
    </template>
  </UFooter>
</template>