# Nuxt Portfolio Template (Contentful Integrated)

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

Proyek ini adalah hasil *fork* dan kustomisasi dari [Nuxt Portfolio Template](https://github.com/nuxt-ui-templates/portfolio) resmi oleh tim Nuxt. Versi ini telah diintegrasikan dengan **Contentful** sebagai *headless CMS* untuk manajemen konten yang lebih dinamis.

👉 **[Lihat Live Demo](https://jadigaknih.com)**

<a href="https://jadigaknih.com" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/dtfr5rwgo/image/upload/v1775719705/Screenshot_2026-04-09_at_14.26.02_ibr9s4.png">
    <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/dtfr5rwgo/image/upload/v1775719705/Screenshot_2026-04-09_at_14.26.02_ibr9s4.png">
    <img alt="Nuxt Portfolio Template" src="https://res.cloudinary.com/dtfr5rwgo/image/upload/v1775719705/Screenshot_2026-04-09_at_14.26.02_ibr9s4.png">
  </picture>
</a>

---

## ✨ Fitur Tambahan: Contentful Integration

Semua konten portofolio (proyek, postingan blog, dll.) dikelola di [Contentful](https://app.contentful.com/) dan diambil secara dinamis saat *runtime*.

### Cara Kerjanya

* **Setup Environment:** Konfigurasikan Contentful Space ID dan Access Token di *environment variables* Anda (`NUXT_PUBLIC_PROJECT_ID`, `NUXT_PUBLIC_ACCESS_TOKEN`). Pastikan *content types* seperti `projects` dan `content` (untuk blog) sudah dibuat di Contentful.
* **Repository Pattern (`app/utils/repository.ts`):** * Menyediakan *composable functions* untuk mengambil data proyek dan blog dari Contentful.
  * Menggunakan `useState` dari Nuxt untuk manajemen *state* yang reaktif.
  * Memetakan (*mapping*) data dari Contentful ke struktur aplikasi, termasuk resolusi aset gambar dan info penulis.
  * *Contoh Penggunaan:*
    ```js
    const { projects, fetchProjects } = useProjectsRepository()
    onMounted(fetchProjects)
    ```
* **Komponen Penulis (`<UUser />`):** Halaman postingan blog menampilkan informasi penulis yang diambil dari *field* `author` di Contentful.
  * *Contoh Penggunaan:*
    ```vue
    <UUser orientation="vertical" color="neutral" variant="outline" class="justify-center items-center text-center" v-bind="page.author" />
    ```

---

## 🚀 Memulai Proyek (Local Setup)

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di mesin lokal Anda.

### 1. Install Dependencies

Pastikan Anda menggunakan `pnpm`, lalu jalankan:

```bash
pnpm install
```

### 2. Development Server

Jalankan *server development* (secara bawaan akan berjalan di `http://localhost:3000`):

```bash
pnpm dev
```

### 3. Build & Production

Untuk membangun aplikasi ke versi *production*:

```bash
pnpm build
```

Untuk melihat *preview* hasil *build* secara lokal:

```bash
pnpm preview
```

*Baca [dokumentasi deployment Nuxt](https://nuxt.com/docs/getting-started/deployment) untuk informasi lebih lanjut.*

---

## 🛠 Lain-lain

### Renovate Integration
Proyek ini mendukung integrasi pembaruan dependensi otomatis. Cukup install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) di repositori Anda.

### Credits (Original Template)
* [Nuxt UI Portfolio Template](https://github.com/nuxt-ui-templates/portfolio)
* [Nuxt UI](https://ui.nuxt.com)

Jika Anda ingin mencoba *template* aslinya (tanpa Contentful), Anda bisa menggunakan perintah ini:

```bash
npm create nuxt@latest -- -t ui/portfolio
```

*(Jika Anda menggunakan atau memodifikasi proyek ini, mohon untuk tetap mencantumkan kredit kepada penulis aslinya.)*