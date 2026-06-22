# 🚀 LinkPulse

**LinkPulse** is a full-stack URL shortening and analytics platform inspired by tools like Bitly. It allows users to create and manage short links while providing insights into how those links perform through click tracking and analytics.

The project was built to demonstrate real-world backend engineering concepts beyond basic CRUD applications, including authentication, authorization, redirect handling, and event tracking.

---

## ✨ Features

### Authentication & Security

* User Registration
* User Login
* Password hashing using bcrypt
* JWT-based Authentication
* Protected Routes
* Ownership-based Authorization

### URL Management

* Create short links
* Generate unique short codes
* Retrieve all user links
* View individual links
* Update link details
* Delete links
* Optional link expiration support

### Redirect Engine

* Public short URLs
* Automatic redirection to original URLs
* Expired link validation
* Proper HTTP status handling (`404`, `410`, `302`)

### Click Tracking

Every short-link visit is recorded with:

* Timestamp
* Visitor IP Address
* User Agent Information
* Traffic Referrer
* Country Information (basic implementation)

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

Owner Views Performance Insights

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL

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

* id
* name
* email
* password
* created_at
* updated_at

### Links

* id
* user_id
* original_url
* short_code
* title
* expires_at
* created_at
* updated_at

### Clicks

* id
* link_id
* clicked_at
* ip_address
* user_agent
* referrer
* country

Relationships:

* One User → Many Links
* One Link → Many Clicks

---

