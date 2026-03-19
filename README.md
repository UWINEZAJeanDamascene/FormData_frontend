# Inventory Management System

A modern, full-stack inventory management system with MongoDB database, Node.js REST API backend, and React frontend.

> ⚡ **Want to get started quickly?** See the [Quick Start Guide](QUICK_START.md) (5 minutes!)
> 
> 📘 **Need detailed instructions?** Check out the [Complete Setup Guide](SETUP_GUIDE.md)

## 🏗️ Project Structure

```
/
├── backend/              # Node.js REST API Backend
│   ├── controllers/      # Request handlers
│   ├── models/          # MongoDB/Mongoose models
│   ├── routes/          # API routes
│   ├── server.js        # Main server file
│   └── package.json     # Backend dependencies
│
└── src/                 # React Frontend
    └── app/
        ├── components/  # Reusable UI components
        ├── pages/       # Page components
        ├── services/    # API client services
        ├── types/       # TypeScript types
        └── App.tsx      # Main app component
```

## 🚀 Getting Started

> 📘 **New to this project?** Check out the [Complete Setup Guide](SETUP_GUIDE.md) for detailed step-by-step instructions!

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or Docker)

### Option 1: Full Stack with MongoDB (Recommended)

#### 1. Start MongoDB

**Using Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Or using local MongoDB installation:**
```bash
mongod
```

#### 2. Setup Backend

Navigate to the backend folder:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:3001` and connect to MongoDB at `mongodb://localhost:27017/inventory_db`

#### 3. Setup Frontend

From the root directory, install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` and connect to the backend API.

### Option 2: Frontend Only (Development Mode)

If you want to run just the frontend with simulated data, you can modify `/src/app/services/inventoryApi.ts` to use mock data instead of the real API.

## ✨ Features

### Backend Features
- ✅ REST API with Express.js
- ✅ Full CRUD operations
- ✅ MongoDB/Mongoose database
- ✅ CORS enabled
- ✅ Error handling
- ✅ Request logging
- ✅ Health check endpoint

### Frontend Features
- ✅ Beautiful landing page
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Real-time statistics dashboard
- ✅ Complete inventory table
- ✅ Add/Edit/Delete operations
- ✅ Form validation
- ✅ Low stock alerts
- ✅ Toast notifications
- ✅ Modern UI with Shadcn components

## 🎨 Design Features

- **Dark Mode**: Full dark mode support with system preference detection
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Animations**: Smooth transitions and animations throughout
- **Modern UI**: Built with Tailwind CSS and Shadcn UI components
- **Gradient Accents**: Beautiful gradient colors for CTAs and highlights

## 📋 Data Fields

Each inventory item includes:
- Product ID
- Product Name
- Category
- Quantity
- Unit Price
- Total Value (auto-calculated)
- Date
- Supplier Name
- Customer Name
- Recorded By
- Status (Active/Discontinued/Out of Stock)
- Reorder Level
- Location
- Last Modified
- Notes

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/inventory` | Get all items |
| GET | `/api/inventory/:id` | Get single item |
| GET | `/api/inventory/category/:category` | Get items by category |
| GET | `/api/inventory/stats` | Get statistics |
| POST | `/api/inventory` | Create new item |
| PUT | `/api/inventory/:id` | Update item |
| DELETE | `/api/inventory/:id` | Delete item |

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- CORS
- dotenv
- MongoDB
- Mongoose

### Frontend
- React 18
- TypeScript
- React Router
- Tailwind CSS
- Shadcn UI
- Lucide Icons
- next-themes (Dark mode)
- Sonner (Toast notifications)

## 📦 Database

Currently using MongoDB with Mongoose for demonstration. To use a different database:

1. Install your preferred database driver
2. Update `/backend/models/inventoryModel.js`
3. Add database connection in `/backend/server.js`

Recommended databases:
- PostgreSQL with node-postgres
- MySQL with mysql2

## 🎯 Key Features Explained

### Statistics Dashboard
Shows real-time metrics:
- Total number of unique items
- Total inventory value
- Total quantity in stock
- Low stock alerts count

### Low Stock Alerts
Items are automatically flagged when quantity falls below reorder level, making it easy to identify items that need restocking.

### Dark Mode
Seamless dark mode with three options:
- Light theme
- Dark theme
- System preference (auto-switches based on OS settings)

### Form Validation
All required fields are validated, and total value is automatically calculated based on quantity × unit price.

## 📱 Pages

1. **Landing Page** (`/`)
   - Hero section with call-to-action
   - Features showcase
   - Tech stack display
   - Benefits list
   - Responsive design

2. **Dashboard** (`/dashboard`)
   - Statistics cards
   - Full inventory table
   - Add/Edit/Delete functionality
   - API documentation
   - Real-time updates

## 🔐 Security Notes

- This is a demonstration project with in-memory storage
- Add authentication for production use
- Implement rate limiting
- Add input sanitization
- Use environment variables for sensitive data
- Enable HTTPS in production

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and use this project as a starting point for your own inventory management system!