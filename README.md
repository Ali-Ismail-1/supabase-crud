# Supabase + Next.js CRUD App

This is a simple CRUD (Create, Read, Update, Delete) application built with [Supabase](https://supabase.com/) as the backend and [Next.js](https://nextjs.org/) as the frontend framework. The app demonstrates basic CRUD functionality for managing a task list.

## Features

- **Create**: Add new tasks with a title.
- **Read**: Display a list of all tasks.
- **Update**: (Planned) Update task titles or their completion status.
- **Delete**: Remove tasks from the list.
- **Backend**: Supabase for database and API integration.
- **Frontend**: Next.js with React for rendering and user interaction.

---

## Tech Stack

- **Frontend**: Next.js, React
- **Backend**: Supabase (PostgreSQL)
- **CSS**: Module-based styling for custom components
- **API Routes**: Next.js App Router

---

## Getting Started

### Prerequisites

1. **Node.js** (version 18 or higher)
2. **Supabase Account**: Sign up at [Supabase](https://supabase.com/).
3. **Git**: Ensure Git is installed on your system.

---

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a .env.local file in the project root and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_KEY=<your-supabase-anon-key>
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser at http://localhost:3000.

---

### Setting Up Supabase

1. Log in to your Supabase dashboard.
2. Create a new project.
3. Go to the SQL editor and run the following query to create a tasks table:
   ```sql
   CREATE TABLE tasks (
       id SERIAL PRIMARY KEY,
       title TEXT NOT NULL,
       completed BOOLEAN DEFAULT FALSE
   );
   ```
4. Add your Supabase project's URL and API key to .env.local as shown in the installation steps.

---

### Project Structure

```
.
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── tasks
│   │   │   │   ├── create
│   │   │   │   │   └── route.ts
│   │   │   │   ├── delete
│   │   │   │   │   └── route.ts
│   │   ├── tasks
│   │   │   └── page.tsx
│   ├── lib
│   │   └── supabaseClient.ts
│   ├── styles
│   │   └── tasks.module.css
├── public
├── .env.local
├── README.md
└── package.json

```

### Contributing

Contributions are welcome! If you have suggestions or find issues, feel free to open a GitHub issue or submit a pull request.

---

### License

This project is licensed under the MIT License.

---

### Acknowledgments

Supabase for the powerful backend-as-a-service.
Next.js for its flexible frontend framework.
