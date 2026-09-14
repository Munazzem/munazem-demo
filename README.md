# منظم (Munazzem) — Interactive System Demo

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

An interactive, client-side, zero-dependency demo showcase for the **Munazzem Educational SaaS Platform**. 

This demo runs entirely in the browser using an **In-Memory Mock Database** (`src/lib/mock/db.ts`) and simulated API handlers, enabling teachers, administrators, and prospective clients to experience all core platform workflows without connecting to a live backend database.

---

## 🌟 Key Features Demonstrated

- **Hero Landing Page (`/`):** High-converting presentation of the Munazzem platform with live feature highlights and statistics.
- **One-Click Demo Login (`/demo/login`):** Instant authentication as Teacher or Assistant without real credentials.
- **Interactive Dashboard (`/demo/dashboard`):** Real-time summary cards, charts, and activity streams.
- **Student Management (`/demo/students`):** Student profiles, barcode generation, attendance records, exam scores, and subscription tracking.
- **Group Scheduling (`/demo/groups`):** Weekly schedules, group capacities, and performance reports.
- **Session Attendance & Scanner (`/demo/sessions`):** Simulated QR/Barcode camera scanning, excused absence management, and real-time attendance rosters.
- **Exams & AI Exam Generator (`/demo/exams`):** Exam scheduling, batch grade entry, and simulated AI-powered exam creation.
- **Financials & POS (`/demo/dashboard/payments`):** Income/expense transactions, cycle payments, price snapshots, and notebook reservations.
- **Parent Portal Simulation (`/demo/parent`):** Demonstration of the parent app view for tracking student progress.
- **Assistant Delegation (`/demo/assistants`):** Permission assignment and assistant access levels.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm / pnpm / yarn

### Installation
```bash
# Clone repository
git clone https://github.com/Munazzem/munazem-demo.git
cd munazem-demo

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16.2.4 (App Router, Turbopack)
- **UI & Styling:** TailwindCSS v4, Radix UI, Lucide Icons, Sonner (Toasts)
- **Charts:** ApexCharts, React ApexCharts
- **State & Data:** Zustand, TanStack React Query
- **Forms & Validation:** React Hook Form, Zod
- **Mock DB:** TypeScript In-Memory State (`src/lib/mock/db.ts`)
