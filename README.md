# 🚀 LinkPulse

**LinkPulse** is a full-stack URL shortening and analytics platform inspired by tools like Bitly. It enables users to create, manage, and track short URLs while providing detailed analytics on link performance through an interactive dashboard.

The project was built to demonstrate real-world backend engineering concepts beyond traditional CRUD applications, including authentication, authorization, redirect handling, event tracking, analytics processing, and dashboard visualization.

---

## ✨ Features

### 🔐 Authentication & Security

* User Registration
* User Login
* Password hashing using bcrypt
* JWT-based Authentication
* Protected Routes
* Ownership-based Authorization
* Secure API access using Bearer tokens

---

### 🔗 URL Management

* Create short links
* Generate unique short codes using nanoid
* Retrieve all user links
* View individual links
* Update link details
* Delete links
* Optional link expiration support
* Search and filter links

---

### 🚀 Redirect Engine

* Public short URLs
* Automatic redirection to original URLs
* Expired link validation
* Proper HTTP status handling (`404`, `410`, `302`)
* Click event recording before redirect

---

### 📊 Analytics System

Every short-link visit records:

* Timestamp
* Visitor IP Address
* User Agent Information
* Traffic Referrer
* Country Information
* Link Ownership

Analytics include:

* Total Clicks
* Daily Click Tracking
* Top Performing Links
* Referrer Statistics
* Average Clicks Per Link
* Recent Link Activity

---

### 🎨 Dashboard Features

The frontend dashboard was built entirely using **HTML, CSS, and Vanilla JavaScript** and includes:

* Dark-themed professional UI
* Dashboard overview cards
* Link management table
* Search functionality
* Create/Edit/Delete operations
* Copy short URL functionality
* Analytics pages
* Interactive charts using Chart.js
* Sticky navigation bar
* Responsive layout

---

## 🏗️ System Flow

User Registration/Login

↓

Create Short Link

↓

Share Link

↓

Visitor Clicks Short URL

↓

LinkPulse Records Analytics

↓

Visitor Redirected to Original URL

↓

Owner Views Dashboard & Analytics

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* Chart.js

### Authentication

* JSON Web Tokens (JWT)
* bcrypt

### Validation

* express-validator

### Utilities

* nanoid

### Version Control

* Git
* GitHub

---

## 🗄️ Database Design

### Users

| Column     | Description        |
| ---------- | ------------------ |
| id         | Primary Key        |
| name       | User Name          |
| email      | User Email         |
| password   | Hashed Password    |
| created_at | Creation Timestamp |
| updated_at | Update Timestamp   |

---

### Links

| Column       | Description          |
| ------------ | -------------------- |
| id           | Primary Key          |
| user_id      | Foreign Key (Users)  |
| original_url | Original URL         |
| short_code   | Generated Short Code |
| title        | Optional Title       |
| expires_at   | Expiration Date      |
| created_at   | Creation Timestamp   |
| updated_at   | Update Timestamp     |

---

### Clicks

| Column     | Description         |
| ---------- | ------------------- |
| id         | Primary Key         |
| link_id    | Foreign Key (Links) |
| clicked_at | Click Timestamp     |
| ip_address | Visitor IP          |
| user_agent | Browser Information |
| referrer   | Traffic Source      |
| country    | Visitor Country     |

---

## 🔗 Database Relationships

* One User → Many Links
* One Link → Many Clicks

---

## 📈 Analytics Captured

* Total Click Count
* Daily Click Trends
* Referrer Sources
* Link Performance
* Average Engagement
* Recent Activity

---
