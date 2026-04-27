# Night’s Poem Space

A simple web platform for sharing original poetry. This site serves as a personal collection of poems written over time, capturing thoughts, emotions, and moments in a minimal and readable format.

## About

Night’s Poem Space is a personal poetry blog where I publish my own written work. The goal of this project is to create a clean and focused environment for reading and writing poetry without distractions.

## Features

- Display poems in a structured layout
- Show author name with each post
- Timestamp for each poem
- Optional like functionality
- Dark-themed user interface

## Tech Stack

- Frontend: Next.js, React
- Styling: Tailwind CSS
- Backend/Database: Supabase

## Project Structure

/app
  page.tsx
/lib
  supabase.ts
  

## Installation

1. Clone the repository:
   git clone https://github.com/aryansrivastava7683/type-shit

2. Navigate to the project directory:
   cd your-repo-name

3. Install dependencies:
   npm install

4. Create a .env.local file and add:
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

5. Run the development server:
   npm run dev

## Usage

Open the application in your browser and view the collection of poems. New poems can be added through the backend or integrated UI if implemented.

## Future Improvements

- Add poem submission interface
- Implement comment system
- Add search and filtering
- Improve mobile responsiveness
- Add theme customization

