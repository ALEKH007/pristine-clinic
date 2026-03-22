# Pristine Dental and Heart Care Clinic 🦷 ❤️

A complete, modern web solution for **Pristine Dental and Heart Care Clinic**. This project features a high-performance, responsive public website for patients and a secure, comprehensive administrative dashboard for clinic management.

## 🚀 Overview

This repository contains two primary applications:
1.  **Pristine Clinic Website**: The public-facing portal where patients can learn about services, view the gallery, read testimonials, and book appointments.
2.  **Admin Dashboard**: A secure management interface for clinic staff to handle appointments, patient inquiries, website content (services, gallery), and user access.

---

## 📂 Project Structure

The project is organized as a monorepo containing two independent Next.js applications:

```text
Dental website/
├── pristine-clinic/    # Public patient-facing website
│   ├── src/app/        # Next.js 15+ App Router
│   ├── src/components/ # Shared UI components
│   └── src/lib/        # Database & utility logic
├── admin/              # Secure Administrative Dashboard
│   ├── app/            # Next.js 15+ App Router
│   ├── components/     # Admin-specific components
│   └── lib/            # Auth & Auth logic
└── README.md           # This file
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens) & BcryptJS (Admin Panel)
- **Deployment**: Vercel (Recommended)

---

## ✨ Key Features

### 🌐 Public Website (`pristine-clinic`)
- **Interactive Hero Section**: Engaging introduction to the clinic's mission.
- **Services Showcase**: Detailed list of dental and heart care services offered.
- **Appointment Booking**: Integrated form for patients to schedule visits.
- **Patient Testimonials**: Real feedback from clinic patients.
- **Dynamic Gallery**: Visual showcase of the clinic's facilities and results.
- **Contact Integration**: Easy-to-use contact form with location details.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

### 🔐 Admin Dashboard (`admin`)
- **Appointment Management**: View and manage patient appointments in real-time.
- **Inquiry Handling**: Track and respond to contact form submissions.
- **Content Management (CMS)**:
    - Update service descriptions and pricing.
    - Manage the image gallery.
    - Curate patient reviews/testimonials.
- **User Management**: Secure admin accounts and permission levels.
- **Analytics Overview**: Dashboard for quick stats on appointments and inquiries.

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/ALEKH007/pristine-clinic.git
    cd "Dental website"
    ```

2.  **Setup the Public Website**:
    ```bash
    cd pristine-clinic
    npm install
    # Build or run in dev mode
    npm run dev
    ```

3.  **Setup the Admin Dashboard**:
    ```bash
    cd ../admin
    npm install
    ```

4.  **Database Seeding (Optional but Recommended)**:
    Before running the admin dashboard for the first time, you should seed the database with initial data and create an admin user.
    
    In the `admin/` directory:
    ```bash
    # Seed initial services, gallery images, and reviews
    node migrate-data.mjs
    
    # Create the default admin user
    node seed-admin.mjs
    ```
    *Note: The default login is `admin@pristine.com` with password `admin123`. Please change this immediately after your first login.*

5.  **Run the Admin Dashboard**:
    ```bash
    npm run dev
    ```

---

## 🔑 Environment Variables

Create a `.env.local` file in **both** the `admin/` and `pristine-clinic/` directories.

**For `pristine-clinic/`:**
```env
MONGODB_URI=your_mongodb_connection_string
```

**For `admin/`:**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string
```


---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Contact

**Alekh** - [GitHub](https://github.com/ALEKH007)

Project Link: [https://github.com/ALEKH007/pristine-clinic](https://github.com/ALEKH007/pristine-clinic)
