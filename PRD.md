# Product Requirements Document (PRD) – Keepqueue

## 1. Overview
**Project Name:** Keepqueue  
**Goal:** Build a SaaS web platform that enables small-business owners to manage customer appointments end-to-end, from booking to reminders and reporting.

---

## 2. Objectives
- Provide a simple, modern, and responsive booking system for service-based businesses.
- Reduce no-shows via automated WhatsApp reminders and confirmations.
- Centralize customer, appointment, and business management in one platform.
- Enable customers to easily discover, book, and review services online.

---

## 3. Target Users
| User Type        | Description |
|------------------|-------------|
| **Business Owners** | Hair salons, beauty clinics, nail studios, aesthetic service providers. |
| **Customers**    | Individuals looking to book, reschedule, or cancel appointments to those Business  . |

---

## 4. Tech Stack (Non-Negotiable)
| Technology  | Purpose |
|------------------|---------|
| **Next.js (latest stable)** + **TypeScript** | SSR/SSG for SEO |
| **Firebase**     | Auth (email/social/phone), Cloud Firestore, Cloud Storage |
| **WhatsApp API** | Automated reminders & confirmations |
| **UI/UX**        | Tailwind CSS, Origin UI, shadcn UI |
| ** Zustand**   | client sitde application store mannagment

---

## 5. Core Features (MVP – v1)
| # | Feature | Description |
|---|---------|-------------|
| 1 | 24/7 Online Appointment Booking | Self-service booking, rescheduling, and cancellation. |
| 2 | Smart Digital Calendar | Configurable hours, breaks, holidays, and services . | 
| 3 | Automatic WhatsApp Reminders & Confirmations | Reduce no-shows. |
| 4 | Smart Waiting List | Notify customers when a slot becomes available. |
| 5 | Real-Time Reports & Stats | Booking counts, no-show rate |
| 6 | Business Discovery Marketplace | Search by location, service, price, and availability. |
| 7 | Web Client App | Book, cancel, and review services on business in platform. |
| 8 | Ratings & Reviews | Visible on business profiles. |
| 9 | Problematic Customer Handling | Block frequent no-shows; send owner alerts. |
| 11 | Business  Admin Dashboard | Manage profile, services, staff, customers, bookings; one-click branded page. |

---

## 6. Non-Functional Requirements
| Requirement | Target |
|-------------|--------|
| **Performance** | Lighthouse ≥ 90 (Performance, Accessibility, Best Practices, SEO) |
| **Responsiveness** | Mobile-first design |
| **Accessibility** | WCAG 2.1 AA compliance |
| **Code Quality** | Clean, documented, ESLint + Prettier |
| **Testing** | Component tests (React Testing Library) + E2E tests (Playwright) |

---

## 7. Design Guidelines
| Element | Specification |
|---------|--------------|
| Theme | Minimalistic “queue” motif |
| Animations | Subtle SVG or Lottie animations for transitions & success states |
| Booking Flow | ≤ 3 clicks |

---

## 8. Milestones & Timeline
| Milestone | Tasks | Duration |
|-----------|-------|----------|
| 1 | Wireframes & Data Model | 3 days |
| 2 | Auth, Calendar & Booking Core | 7 days |
| 3 | WhatsApp Integration & Reminders | 3 days |
| 4 | Marketplace & Reviews | 5 days |
| 5 | QA, Polish, SEO, Multi-language | 4 days |
| 6 | Launch & Handoff | 1 day |

---

## 9. Definition of Done
| Criteria |
|----------|
| All listed features function correctly on Chrome, Safari, Edge, and mobile browsers. |
| Automated test suite passes without errors. |
| Lighthouse scores meet or exceed targets. |
| Business can be created, customers can book, receive WhatsApp reminders, leave reviews, and admins can view analytics. |
