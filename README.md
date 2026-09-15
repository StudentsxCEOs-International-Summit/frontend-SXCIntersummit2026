# SXC Intersummit 2026

Frontend boilerplate untuk SXC Intersummit 2026 dengan React, Vite, TypeScript, Tailwind CSS, React Router, Vitest, dan Oxlint. Homepage tetap menggunakan tampilan starter default Vite.

## Requirements

- Node.js 20 atau lebih baru
- npm

## Setup

```bash
npm install
copy .env.example .env
npm run dev
```

Vite akan menjalankan development server di `http://localhost:5173`.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Type-check and create production build
npm run preview      # Preview production build
npm run lint         # Run Oxlint
npm run test         # Run Vitest in watch mode
npm run format       # Format project files with Prettier
npm run format:check # Check formatting without changing files
```

Untuk menjalankan test sekali tanpa watch mode:

```bash
npm run test -- --run
```

## Environment variables

Copy `.env.example` menjadi `.env` untuk local development. Variable yang digunakan frontend harus memiliki prefix `VITE_`.

```env
VITE_API_URL=http://localhost:3000/api
```

File `.env` tidak boleh di-commit. Gunakan `.env.example` sebagai template variable yang dibutuhkan project.

## Routing and aliases

Routing menggunakan `react-router-dom` dan dikonfigurasi di `src/routes/`.

- `/` menampilkan homepage
- Route yang tidak ditemukan menampilkan halaman 404

Import alias `@/*` mengarah ke folder `src/`:

```ts
import HomePage from '@/pages/HomePage'
```

Alias dikonfigurasi di `tsconfig.app.json` dan `vite.config.ts`.

## Folder structure

```text
src/
├── assets/       # Asset visual yang di-import oleh aplikasi
├── components/   # Komponen reusable lintas halaman
│   └── ui/       # Komponen UI kecil jika diperlukan
├── layout/       # Wrapper halaman seperti header, footer, dan sidebar
├── pages/        # Komponen level route
├── routes/       # Konfigurasi React Router
├── services/     # API client dan integrasi eksternal
├── test/         # Setup dan test Vitest
├── types/        # Shared TypeScript types
├── App.tsx       # Root router provider
├── index.css     # Global styles homepage dan halaman lain
└── main.tsx      # Browser entry point
```

Gunakan folder feature-specific ketika fitur mulai membesar, misalnya `src/features/auth/`. Jangan menambahkan state manager, API client, form library, atau UI library sebelum ada kebutuhan nyata.

## Code quality

- **Oxlint** digunakan untuk linting karena ringan dan sudah mendukung aturan React/TypeScript yang diperlukan project.
- **Prettier** digunakan khusus untuk formatting.
- **Vitest + Testing Library** digunakan untuk test komponen dan routing.
