# **App Name**: ProductivityPulse

## Core Features:

- User Authentication: Secure sign-up and login using Firebase Authentication (Email/Password).
- Role-Based Access: Role-based access control to ensure users only access relevant data.
- Firestore User Data: Store user information (uid, name, email, role, status) in a Firestore users collection.
- Dashboard Redirect: Redirect authenticated users to a /dashboard route. Shows a message if the account is pending admin verification.
- User Management: Enable admins to add employees and departments. Includes the assignment of user roles with specific permissions.
- Goal Tracking: Efficient assignment, monitoring, and measurement of employee goals within the system.
- Notifications and Alerts: Automated notifications for tasks and performance updates.

## Style Guidelines:

- Primary color: Soft pastel violet (#D8B4FE) for a calming, sophisticated feel.
- Background color: Light gray (#F5F5F5) for a neutral, clean backdrop.
- Accent color: Pastel orange (#FFB347) to highlight key elements and interactions, drawing user attention effectively.
- Headings: 'Poppins' (sans-serif) for a modern and geometric look.
- Body: 'Inter' (sans-serif) for a clean, readable text.
- Use a set of modern, outline-style icons in pastel accent colors to represent features and actions.
- Implement a card-based layout for sections like features and roles, ensuring a clean and organized presentation.
- Incorporate subtle fade-in and slide-up effects for sections as they come into view during scrolling.