# APX Official Frontend

Welcome to the official frontend application for the **APX Platform**. This project is a modern, performance-oriented client-side application built on top of **Next.js** and **React 19**, designed to interface with the [APX Official Backend](APX/BACKEND/README.md).

It implements a comprehensive client-side architecture supporting multi-role portal layouts (Admin, Employee, and Customer), secure session handling, dynamically rendered forms, and state-of-the-art developer tools like the new React Compiler.

---

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v16.2.6 - App Router)
- **Library**: [React](https://react.dev/) (v19.2.4)
- **Compiler**: React Compiler (built-in, configured in [next.config.ts](file:///d:/Custom/MCA/Project/APX/frontend/next.config.ts))
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using new CSS-first syntax)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (configured in [tsconfig.json](file:///d:/Custom/MCA/Project/APX/frontend/tsconfig.json))
- **Path Aliases**: `@/*` points to `./src/*`

---

## 📂 Project Architecture

The application is structured logically with modular components, separation of concerns, and role-based route separation:

```
frontend/
├── src/
│   └── app/
│       ├── (roles)/              # Role-specific dashboard layouts and views
│       │   ├── (admin)/          # Admin-only dashboard & administration management
│       │   ├── (customer)/       # Customer/Client-only features (requests, payments)
│       │   └── (employee)/       # Employee/Staff features (tasks, blogs, reimbursements)
│       ├── components/           # Reusable UI component library (atomic design pattern)
│       ├── hooks/                # Custom React hooks (e.g. useAuth.ts)
│       ├── lib/                  # Shared library functions and modules
│       │   └── api/              # Centralized API service layer (e.g. auth.api.ts)
│       ├── types/                # TypeScript interface declarations (e.g. auth.types.ts)
│       ├── globals.css           # Tailwind v4 directives and CSS theme variables
│       ├── layout.tsx            # Global HTML root layout
│       └── page.tsx              # Public home page
├── AGENTS.md                     # LLM/AI Agent developer coding guidelines
├── CLAUDE.md                     # IDE/CLI instructions and developer constraints
├── package.json                  # Dependencies, scripts, and build metadata
└── tsconfig.json                 # TypeScript compiler configuration
```

### Key Files Reference

- **Styling entry point**: [globals.css](file:///d:/Custom/MCA/Project/APX/frontend/src/app/globals.css)
- **Application configuration**: [next.config.ts](file:///d:/Custom/MCA/Project/APX/frontend/next.config.ts)
- **Global Types**: [auth.types.ts](file:///d:/Custom/MCA/Project/APX/frontend/src/app/types/auth.types.ts)
- **Authentication Hook**: [useAuth.ts](file:///d:/Custom/MCA/Project/APX/frontend/src/app/hooks/useAuth.ts)
- **Authentication Service API**: [auth.api.ts](file:///d:/Custom/MCA/Project/APX/frontend/src/app/lib/api/auth.api.ts)
- **Homepage**: [page.tsx](file:///d:/Custom/MCA/Project/APX/frontend/src/app/page.tsx)
- **Root Layout**: [layout.tsx](file:///d:/Custom/MCA/Project/APX/frontend/src/app/layout.tsx)

---

## 🛡️ Functional Domains

The frontend is designed to support client interfaces for all features defined in the backend [schema.prisma](file:///d:/Custom/MCA/Project/APX/BACKEND/prisma/schema.prisma):

1. **User Role Management**: Dashboards and interfaces adapted dynamically based on roles: `SUPER_ADMIN`, `CUSTOMER`, or `EMPLOYEE` (with subroles like `EDITOR` and `ADS_MANAGER`).
2. **Service Request System**: A dynamic form-generation interface driven by database-defined fields for specific agency services. Customers can create/track requests, and employees/admins can assign and update progress.
3. **Payments & Invoicing**: Interface for billing tracking, custom invoice creation, invoice emails, payment link generation, and client payment proof upload.
4. **CRM & Lead Tracking**: Customer Relationship Management interface to tracking inquiries, new leads, lead prioritization, and follow-up activities.
5. **Task & Reminder System**: Board or list view of tasks assigned by managers to employees, with completion tracking, priority levels, and file attachments.
6. **Expense Reimbursement**: Staff claim submissions interface with image/file upload for receipts, including review flow for managers.
7. **Content Management System (CMS)**: Interface to publish blog posts, organize categories, and manage reader comments/likes.
8. **Banner & Ads Manager**: Dashboards for configuring homepage banners and setting up advertisement placements.

---

## 🛠️ Development & Coding Guidelines

To keep the codebase maintainable, secure, and clean, developers and AI agents must adhere to the rules outlined in [AGENTS.md](file:///d:/Custom/MCA/Project/APX/frontend/AGENTS.md):

### 1. Separation of Concerns
*   **UI Components**: Responsible solely for rendering visual markup. Keep them small, reusable, and single-purpose in the [components/](file:///d:/Custom/MCA/Project/APX/frontend/src/app/components) directory.
*   **Business Logic**: Extracted to custom React hooks in the `hooks/` directory.
*   **API Layer**: Centralized under [lib/api/](file:///d:/Custom/MCA/Project/APX/frontend/src/app/lib/api). Direct API fetch or Axios calls within component render cycles are forbidden.

### 2. State & Data Fetching
*   Keep local component states minimal.
*   Utilize Redux Toolkit or RTK Query for shared cross-component global states and server state synchronization where appropriate.
*   API actions must provide user feedback (e.g. toast notifications, loader skeletons).
*   Disable duplicate form submissions (loading state disabling buttons) during request flight.

### 3. Forms & Validation
*   Build forms using `react-hook-form` paired with `zod` for type-safe validation schema definitions.
*   Forms must not auto-close when an API request fails; retain input values and display inline/toast errors.

### 4. SEO & Performance
*   Utilize Server-Side Rendering (SSR) or Server Components by default unless client interactivity is mandatory (`"use client"`).
*   All public-facing pages must generate optimized SEO metadata (titles, descriptions, keywords, Open Graph, and Twitter card tags).

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js**: `v20.x` or later recommended
- **PackageManager**: `npm`

### Installation

1. Install project packages:
   ```bash
   npm install
   ```

2. Configure Environment Variables:
   Create a `.env.local` file in the root folder containing the required backend API addresses:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

### Running the Application

*   **Development Mode** (with live reloading and fast refresh):
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the application.

*   **Build Production Bundle**:
    ```bash
    npm run build
    ```

*   **Run Production Build**:
    ```bash
    npm run start
    ```

*   **Linter checks**:
    ```bash
    npm run lint
    ```
