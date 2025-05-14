# 🏥 Patient Management System (PGlite + React)

A lightweight browser-based Patient Management System that allows users to register patients and view all registered entries. Built with **React** and **PGlite**, this project requires **no backend or database setup**.

---

## 🚀 Features

-  Registration Form : Register new patients with specific details.
-  SQL Qeury Console : Write an Sql query to fetch required data.
-  View Patient Data : Patient Data table with all the records stored.
-  Data stored in browser memory using [@electric-sql/pglite]
-  Persist patient data even after page refreshes 
-  Multi-tab support: Usage across multiple tabs(in the same browser) and data sync by using Pglite-worker.
-  Error-handling for failed submissions and fetches


---

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Database**: [PGlite](https://electric-sql.com/docs/pglite) – Browser-powered SQLite engine
- **Styling**: Basic CSS (customizable)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SarthakJain29/Patient-Registration-App.git
cd Patient-Registration-App
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Start Development Server
```bash
npm run dev
```
---
### 🧹 Troubleshooting
## ❌ null value in column "id" error?

Try resetting the schema by dropping the old table:
```bash
await db.exec(`DROP TABLE IF EXISTS patients`);
await db.exec(`CREATE TABLE IF NOT EXISTS patients (...)`);
```
📌 Be careful — this deletes all previous data.


#### For doubts or setup issues, feel free to raise an issue or contact me
