# MediCare

A modern hospital appointment and healthcare management platform built with Next.js, Node.js, Express, MongoDB, Firebase Authentication, Stripe, Tailwind CSS, and DaisyUI.

## Live Features

### Authentication

* Email & Password Authentication
* Google Sign In
* Role Based Access Control
* Protected Dashboard Routes

### Patient Features

* Find Doctors
* Book Appointments
* Online Payment with Stripe
* Cancel & Reschedule Appointments
* View Prescriptions
* Write and Manage Reviews
* Update Personal Profile

### Doctor Features

* Manage Appointments
* Update Profile Information
* Manage Schedule
* View Dashboard Statistics
* Create Prescriptions

### Admin Features

* Dashboard Statistics
* Manage Users
* Manage Doctors
* Manage Appointments
* Add and Delete Doctors
* Suspend and Activate Users

### Public Pages

* Home Page
* Find Doctors
* Doctor Details
* About Us
* Contact Us
* Custom 404 Page
* Global Loading Page
* Error Handling Page

---

## Tech Stack

### Frontend

* Next.js 15 (App Router)
* React 19
* Tailwind CSS
* DaisyUI
* Swiper.js
* React Icons
* React Hot Toast
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Firebase Admin SDK
* Stripe Payment Gateway

---

## Installation

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
npm install
npm run start
```

---

## Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Backend (.env)

```env
PORT=5000

MONGODB_URI=

STRIPE_SECRET_KEY=

FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
```

---

## Project Structure

```text
src
├── app
├── components
├── hooks
├── providers
├── services
├── utils
└── constants
```

---

## Key Features

* Role-based dashboards
* Secure authentication
* Online appointment booking
* Digital prescriptions
* Doctor reviews and ratings
* Stripe payment integration
* Responsive design
* Mobile navigation drawer
* Toast notifications
* Confirmation modals
* Pagination and filtering

---

## Future Improvements

* Framer Motion animations
* Advanced analytics with Recharts
* Payment history management
* Doctor verification system
* Dynamic testimonials
* Enhanced reporting dashboards

---

## Author

**Mehedi Hasan**

Web Developer | MERN Stack Developer



## Demo Credentials

### 👤 Patient Account

```text
Email: mehedi.jssit@gmail.com
Password: 123456
```

### 🩺 Doctor Account

```text
Email: john.doctor@gmail.com
Password: 123456
```

### 🛡️ Admin Account

```text
Email: admin@medicare.com
Password: 123456
```

> These accounts are provided for testing and evaluation purposes only.
