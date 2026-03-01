# 📝 Form Builder

**Form Builder** is a dynamic form building platform that empowers users to create, manage, and share custom forms instantly.

## Key Features
- **Secure Authentication**: User registration and login system powered by JSON Web Tokens (JWT) and Bcrypt password hashing.
- **Form Management**: A comprehensive dashboard for creating forms.
- **Dynamic Question Builder**: Add various question types (Text, Email, Number) to any form on the fly.
- **Smart Filtering & Search**: Efficiently manage forms with date based sorting.
- **Responsive Interface**: A modern, adaptive UI that works across all devices, built with Tailwind CSS.

## Technology Stack
- **Framework**: Next.js (App Router)(https://nextjs.org/)
- **ORM**: Prisma(https://www.prisma.io/)
- **Database**: SQLite (Local Database)
- **Styling**: Tailwind CSS(https://tailwindcss.com/)
- **Security**: JWT & Cookies

## Local Installation

Follow the steps below to set up the project in your local environment:

### 1. Clone the Repository
```
git clone https://github.com/dyahzhafira/oprec-webdev-ristek.git
cd oprec-webdev-ristek
```
### 2. Install Depeendencies
```
npm install
```
### 3. Configure Environment Variables
Create .env file in the root directory and add the following:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="random_things_hereee"
```
### 4. Setup Database
```
npx prisma db push
npx prisma generate
```
### 5. Run the App
```
npm run dev
```
The application will be accessible at http://localhost:3000
