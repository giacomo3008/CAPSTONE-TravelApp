# 🌍 Travel - Your Ultimate Booking Experience ✈️🏡

**Travel** is a full-stack web application inspired by Airbnb, where users can **book accommodations** around the world, manage their listings, and explore curated travel destinations. The project is divided into a **React-based frontend** and an **ASP.NET Core 8 backend** with **Entity Framework Core** and **SQL Server**.

---

## 🚀 Project Setup

### 🛠️ Backend (ASP.NET Core 8 + EF Core)

- **IDE**: Visual Studio Code  
- **Language**: C#  
- **Framework**: ASP.NET Core 8  
- **Database**: SQL Server  
- **ORM**: Entity Framework Core (with NuGet packages for SQL Server, FluentEmail, etc.)

#### 🔧 Getting Started

```bash
cd TravelBackend
dotnet restore
dotnet run
```

> This will start the backend server at `https://localhost:5001` (or specified port).

---

### 🎨 Frontend (React + Bootstrap)

- **Language**: JavaScript (Vanilla + JSX)  
- **Library**: React  
- **Styling**: CSS, Bootstrap  
- **State Management**: Redux (with persistence)  
- **Routing**: React Router

#### 📦 Install Dependencies

```bash
cd travel-frontend
npm install
npm install bootstrap
npm install @reduxjs/toolkit react-redux
npm install react-router-dom
npm install redux-persist
```

#### ▶️ Start Frontend

```bash
npm start
```

> The frontend will be served on `http://localhost:3000`

---

## 🧩 Features Overview

### 👥 Authentication & Roles

- 🔐 User Login / Registration  
- 🙍‍♂️ Role-based access: **User** and **Admin**  
- 🧭 Protected routes based on authentication  

### 🏠 User Functionality

- 📋 Search by **city**, **dates**, **budget**  
- 🌆 Filter results by **price**, **location**, and more  
- 💖 Wishlist management  
- 🛒 Shopping cart for saved trips  
- ⚙️ Account information management  

### 🔧 Admin Panel

- 📊 Dashboard with full user management (view, delete)  
- 🏨 Property management (edit, delete listings)  
- 📈 Overview of all bookings and data  

### 🗂️ Listings & Search

- 🔍 Real-time filtering on results page  
- 📤 Upload images directly from local machine (no URL required)  
- 🌍 View popular trips or change to categories like:  
  - 🏖️ Budget Trips  
  - 🕌 Asian Destinations  
  - 🏰 European Getaways  

### ⚠️ Error Handling & Validation

- ❌ Route protection for unauthorized access  
- 📅 Validations on date selections and search criteria  
- ✅ Comprehensive handling for API and client-side errors  

---

## 📚 Tech Stack

### 🖥️ Frontend

- React (with JSX)  
- React Router  
- Redux + Redux Persist  
- Bootstrap  
- HTML / CSS / JavaScript (Vanilla)

### 💻 Backend

- ASP.NET Core 8  
- C#  
- Entity Framework Core  
- SQL Server  
- NuGet packages:  
  - Microsoft.EntityFrameworkCore.SqlServer  
  - FluentEmail  

---

## 🌐 Demo & Links

🔗 [Live Site (coming soon)](https://your-live-demo-link.com)  
📂 [Frontend Repo](https://github.com/yourusername/travel-frontend)  
📁 [Backend Repo](https://github.com/yourusername/travel-backend)

---

## 💡 Notes

- Node.js is used as the environment to run and manage the frontend dependencies via npm.  
- Both frontend and backend are developed in **Visual Studio Code**, providing a smooth developer experience.  
- All images are uploaded from the local file system and served via the backend API.

---

## ❤️ Special Thanks

Thanks to the open-source community and all the contributors who helped make this project possible.

---

## 📸 Screenshots

> _Add screenshots here to show off the UI, search filters, admin panel, etc._

---

Feel free to ⭐️ this repository if you like the project or fork it for your own learning journey!
