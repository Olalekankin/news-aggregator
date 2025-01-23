# News Aggregator Web Application

This is a **Full-Stack News Aggregator Web Application** that pulls articles from various sources, organizes them into categories, and allows users to personalize and filter news. The project is built using modern web frameworks, including **React** for the frontend, **Laravel** for the backend, and a **Dockerized environment** for seamless deployment.

---

## Features
- **User Authentication and Registration**: Users can create an account and log in to save their preferences and settings.
- **Article Search and Filtering**: Search for articles by keywords and filter by date, category, and source.
- **Personalized News Feed**: Customize the feed by selecting preferred news sources, categories, and authors.
- **Scheduled Data Scraping**: Articles are fetched periodically and stored locally in the database to ensure smooth performance.

---

## Tech Stack
### **Frontend**:
- React.js  
- TypeScript  
- Tailwind CSS (for styling)  
- React Router (for navigation)  
- Axios (for API calls)  

### **Backend**:
- Laravel (PHP Framework)

### **Database**:
- MySQL  

### **Infrastructure**:
- **Docker**: Containerized environment for both frontend and backend.
- **Docker Compose**: Orchestrates multiple services.

---

## Directory Structure
news-aggregator/
├── backend/                 # Laravel backend project
├── frontend/                # React frontend project
├── docker-compose.yml       # Docker configuration for services
├── README.md                # Documentation


---

## API Endpoints
### **Public Endpoints**:
- `GET /api/articles` - Fetch all articles.
- `GET /api/articles/{id}` - Fetch a single article by ID.

### **Private Endpoints**:
- `POST /api/preferences` - Save user preferences.
- `GET /api/preferences` - Fetch user preferences.

---

## Getting Started

### Prerequisites:
- Install **Docker** and **Docker Compose** on your machine.

### Setup

Follow these steps to set up the project:

1. **Clone the Repository**:  
   Clone the repository to your local machine.  
   ```bash
   git clone https://github.com/Olalekankin/news-aggregator.git
   cd news-aggregator
   ```

2. **Environment Configuration**:  
   - Navigate to the `backend/` directory and copy the `.env.example` file to `.env`:  
     ```bash
     cd backend
     cp .env.example .env
     ```  
   - Update the `.env` file with the database and application configurations.  
   - Navigate to the `frontend/` directory and set up any required environment variables.

3. **Install Dependencies**:  
   - **Backend**: Install Laravel dependencies using Composer:  
     ```bash
     composer install
     ```  
   - **Frontend**: Install React dependencies using npm :  
     ```bash
     cd ../frontend
     npm install
     ```

4. **Database Migration and Seeding**:  
   Navigate to the `backend/` directory and run the following commands to migrate and seed the database:  
   ```bash
   php artisan migrate --seed
   ```

5. **Run the Application**:  
   Use Docker to build and run the containers for both the frontend and backend:  
   ```bash
   docker-compose up --build
   ```

6. **Accessing the Application**:  
   - **Frontend**: `http://localhost:3000`  
   - **Backend API**: `http://localhost:8000`