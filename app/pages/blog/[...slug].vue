<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { mapContentNavigation } from '@nuxt/ui/utils/content'
import { findPageBreadcrumb } from '@nuxt/content/utils'
import { useProjectsRepository } from '@/utils/repository'


const route = useRoute()
const { page, fetchBlogBySlug, fetchSurround } = useProjectsRepository()
const surroundData = ref<any[]>([null, null])
const slug = computed(() => {
  const s = route.params.slug
  return Array.isArray(s) ? s[0] : (s || route.path.replace('/blog/', ''))
})
const pending = ref(false) // State loading baru

watch(slug, async (newSlug) => {
  if (!newSlug) return;
  page.value = null
  surroundData.value = [null, null]
  try {
    pending.value = true; // Set loading saat mulai fetch
    await fetchBlogBySlug(newSlug)
    if (page.value?.date) {
      surroundData.value = await fetchSurround(page.value.date)
    }
  } finally {
    pending.value = false; // Reset loading setelah selesai
  }
  await fetchBlogBySlug(newSlug)
  if (page.value.date) {
    surroundData.value = await fetchSurround(page.value.date)
  }
}, { immediate: true })


// if (!page || !page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))
const blogNavigation = computed(() => navigation.value.find(item => item.path === '/blog')?.children || [])
const breadcrumb = computed(() => mapContentNavigation(findPageBreadcrumb(blogNavigation?.value, page.value?.path)).map(({ icon, ...link }) => link))

if (page && page.value && page.value.image) {
  defineOgImage({ url: page.value.image })
} else {
  defineOgImageComponent('Blog', {
    headline: breadcrumb.value.map(item => item.label).join(' > ')
  }, {
    fonts: ['Geist:400', 'Geist:600']
  })
}

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title
})

const articleLink = computed(() => `${window?.location}`)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <div v-if="pending" class="flex flex-col gap-6 mt-8">
        <USkeleton class="h-4 w-[100px]" />
        <div class="space-y-4 flex flex-col items-center">
          <USkeleton class="h-4 w-[150px]" />
          <USkeleton class="h-[300px] w-full rounded-lg" />
          <USkeleton class="h-10 w-[80%] mt-4" />
          <USkeleton class="h-4 w-[60%]" />
          <USkeleton class="h-12 w-12 rounded-full mt-2" />
        </div>
        <div class="max-w-3xl mx-auto w-full space-y-2 mt-8">
          <USkeleton class="h-4 w-full" v-for="i in 10" :key="i" />
        </div>
      </div>
      <UPage v-if="page">
        <ULink to="/blog" class="text-sm flex items-center gap-1">
          <UIcon name="lucide:chevron-left" />
          Blog
        </ULink>
        <div class="flex flex-col gap-3 mt-8">
          <div class="flex text-xs text-muted items-center justify-center gap-2">
            <span v-if="page.date">
              {{ formatDate(page.date) }}
            </span>
            <span v-if="page.date && page.minRead">
              -
            </span>
            <span v-if="page.minRead">
              {{ page.minRead }} MIN READ
            </span>
          </div>
          <NuxtImg :src="page.image" :alt="page.title" class="rounded-lg w-full h-[300px] object-cover object-center" />
          <h1 class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4">
            {{ page.title }}
          </h1>
          <p class="text-muted text-center max-w-2xl mx-auto">
            {{ page.description }}
          </p>
          <div class="flex items-center justify-center gap-2 mt-2">
            <UUser orientation="vertical" color="neutral" variant="outline"
              class="justify-center items-center text-center" v-bind="page.author" />
          </div>
        </div>
        <UPageBody class="max-w-3xl mx-auto">
          <ContentRenderer v-if="page.body" :value="page.body" />

          <div class="flex items-center justify-end gap-2 text-sm text-muted">
            <UButton size="sm" variant="link" color="neutral" label="Copy link"
              @click="copyToClipboard(articleLink, 'Article link copied to clipboard')" />
          </div>
          <UContentSurround :surround="surroundData" />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>
