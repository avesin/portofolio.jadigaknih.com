import { avatar } from '#build/ui'
import { useState, useRuntimeConfig } from '#imports'
import type { ParsedContentv2 } from '@nuxt/content'

export function useProjectsRepository() {
  const config = useRuntimeConfig()
  const ENDPOINT = `https://cdn.contentful.com/spaces/${config.public.projectId}/environments/master/entries`
  const ACCESS_TOKEN = config.public.accessToken

  const projects = useState<any[]>('projects', () => [])
  const posts = useState<any[]>('posts', () => [])
  const page = useState<any>('page', () => null)
  async function fetchProjects() {
    const res = await $fetch<any>(ENDPOINT, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      },
      query: {
        content_type: 'projects',
        order: '-fields.createdAt'
      }
    })
    const assets = res.includes?.Asset || []
    projects.value = (res.items || []).map((item: any) => {
      const imageId = item.fields.image?.sys?.id
      const asset = assets.find((a: any) => a.sys.id === imageId)
      return {
        title: item.fields.name,
        description: item.fields.description,
        url: item.fields.link,
        date: item.fields.createdAt,
        image: asset ? 'https:' + asset.fields.file.url : null
      }
    })
  }

  async function fetchBlogs() {
    const res = await $fetch<any>(ENDPOINT, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      },
      query: {
        content_type: 'content',
        order: '-fields.date'
      }
    })
    const assets = res.includes?.Asset || []
    posts.value = (res.items || []).map((item: any) => {
      const imageId = item.fields.image?.sys?.id
      const asset = assets.find((a: any) => a.sys.id === imageId)
      return {
        title: item.fields.title,
        description: item.fields.description,
        url: item.fields.link,
        date: item.fields.date,
        path: "/blog/" + item.fields.slug,
        image: asset ? 'https:' + asset.fields.file.url : null
      }
    })
  }

  const calculateMinRead = (content: string): number => {
    const wordsPerMinute = 150;
    const words = content.trim().split(/\s+/).length;
    console.log('calculateMinRead', words)
    const minutes = Math.ceil(words / wordsPerMinute);

    return minutes;
  };

  async function fetchBlogBySlug(slug: string) {
    try {
      const res = await $fetch<any>(ENDPOINT, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`
        },
        query: {
          content_type: 'content',
          'fields.slug': slug
        }
      })
      const assets = res.includes?.Asset || []
      const item = (res.items || [])[0]
      const imageId = item.fields.image?.sys?.id
      const profileId = item.fields.profile?.sys?.id
      const asset = assets.find((a: any) => a.sys.id === imageId)
      const profileAsset = assets.find((a: any) => a.sys.id === profileId)
      var body = null
      if (item.fields.body) {
        body = await parseMarkdown(item.fields.body);
      }
      page.value = {
        title: item.fields.title,
        description: item.fields.description,
        url: item.fields.link,
        date: item.fields.date,
        body: body,
        author: {
          name: item.fields.author,
          avatar: {
            alt: item.fields.author,
            src: profileAsset ? 'https:' + profileAsset.fields.file.url : null
          }
        },
        minRead: body ? calculateMinRead(item.fields.body + " " + item.fields.description) : 0,
        image: asset ? 'https:' + asset.fields.file.url : null
      }
    } catch (error) {
      console.error('Error fetching blog by slug: ' + slug + " ", error)
    }
  }

  // Di dalam useProjectsRepository.ts
  async function fetchSurround(currentDate: string) {
    try {
      const [prevRes, nextRes] = await Promise.all([
        // Artikel Lebih Lama (Previous)
        $fetch<any>(ENDPOINT, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
          },
          query: {
            content_type: 'content',
            'fields.date[lt]': currentDate,
            limit: 1
          }
        }),
        // Artikel Lebih Baru (Next)
        $fetch<any>(ENDPOINT, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
          },
          query: {
            content_type: 'content',
            'fields.date[gt]': currentDate,
            limit: 1
          }
        })
      ])

      const prevItem = prevRes.items[0]
      const nextItem = nextRes.items[0]

      console.log('fetchSurround', { prevItem, nextItem })

      return [
        prevItem ? {
          path: `/blog/${prevItem.fields.slug}`,
          title: prevItem.fields.title,
          description: prevItem.fields.description,
        } : null,
        nextItem ? {
          path: `/blog/${nextItem.fields.slug}`,
          title: nextItem.fields.title,
          description: nextItem.fields.description,
        } : null
      ]
    } catch (e) {
      return [null, null]
    }
  }

  return {
    page,
    posts,
    projects,
    fetchProjects,
    fetchBlogs,
    fetchBlogBySlug,
    fetchSurround
  }
}
