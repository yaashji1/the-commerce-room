# 📚 The Commerce Room - Coaching Management System

A modern, web-based coaching class management system built with React and Tailwind CSS. Manage students, attendance, fees, batches, homework, tests, and broadcast announcements all in one place.

## 🌟 Features

- **Authentication System**: Secure login and registration with role-based access (Admin, Teacher, Student)
- **Student Management**: Add, edit, and delete student profiles
- **Attendance Tracking**: Mark attendance with Present/Absent/Leave options
- **Fee Management**: Track student fees with payment status
- **Batch Management**: Create and manage coaching batches with schedules
- **Homework Section**: Assign homework to batches and track submissions
- **Test Management**: Create tests, record results, and view performance metrics
- **Broadcast System**: Send announcements and notifications to specific batches or all students
- **Dashboard**: Overview of all important metrics and recent activities

## 🛠️ Tech Stack

- **Frontend**: React 18 + React Router
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Storage**: LocalStorage (No backend required)
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yaashji1/the-commerce-room.git
cd the-commerce-room
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 🚀 Building for Production

```bash
npm run build
npm run preview
```

## 📂 Project Structure

```
the-commerce-room/
├── src/
│   ├── components/
│   │   └── Navigation.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Students.jsx
│   │   ├── Attendance.jsx
│   │   ├── Fees.jsx
│   │   ├── Batches.jsx
│   │   ├── Homework.jsx
│   │   ├── Tests.jsx
│   │   └── Broadcast.jsx
│   ├── store/
│   │   ├── authStore.js
│   │   ├── studentStore.js
│   │   ├── attendanceStore.js
│   │   ├── feeStore.js
│   │   ├── batchStore.js
│   │   ├── homeworkStore.js
│   │   ├── testStore.js
│   │   └── broadcastStore.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🔐 Default Credentials

Create an account during registration to get started!

## 💾 Data Storage

All data is stored in the browser's LocalStorage. Data persists across sessions but is specific to each browser/device.

## 🌐 Deployment

### Deploy to GitHub Pages:

1. Update `vite.config.js` base path if needed
2. Run:
```bash
npm run build
npm run deploy
```

### Deploy to Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with a single click

### Deploy to Netlify:

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## 📝 Features in Detail

### Dashboard
- Quick overview of total students, batches, and announcements
- Recent student enrollments
- Latest announcements

### Students Management
- Add new students with email and phone
- Assign students to batches
- Track enrollment dates
- Edit and delete student records

### Attendance
- Mark attendance by date
- Mark as Present, Absent, or Leave
- View attendance history

### Fees
- Record fee transactions
- Track payment status (Pending, Paid, Overdue)
- Add descriptions for each fee entry

### Batches
- Create batches with schedule details
- Set capacity and fees
- View all batch information in card format

### Homework
- Assign homework to specific batches
- Set due dates and max marks
- Track submission status

### Tests
- Create tests with date and total marks
- Record student results
- View performance percentage
- Track test metrics

### Broadcast
- Send announcements to all batches or specific ones
- Set priority levels (Normal, Medium, High)
- View announcement history

## 🤝 Contributing

Contributions are welcome! Feel free to fork this project and submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by **The Commerce Room** - Coaching Management System

## 📞 Support

For issues and feature requests, please open an issue on GitHub.

---

**Happy Teaching! 📚✨**
