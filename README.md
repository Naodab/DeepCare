# DeepCare

DeepCare is an advanced AI-powered healthcare application designed to assist in medical diagnostics. The system leverages machine learning and deep learning techniques to provide reliable predictions for various diseases. The backend is built using Django REST Framework, while the frontend is developed with Next.js.

## Features

- **Brain Tumor Detection**: Detects brain tumors using MRI scan images and deep learning models.
- **Disease Prediction**: Provides predictive analysis for various diseases based on symptoms and medical history.
- **Skin Cancer Detection**: Uses image processing and AI models to identify potential skin cancer cases.

## Technologies Used

### Backend (Django REST Framework)
- Python
- Django REST Framework
- TensorFlow/PyTorch (for AI models)
- SQLlite (Database)
- JWT Authentication

### Frontend (Next.js)
- React.js
- Next.js
- Tailwind CSS
- Axios (for API communication)

## Installation

### Backend Setup
1. Clone the repository:
   ```bash
   git https://github.com/Naodab/DeepCare.git
   cd deepcare/Server
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   python.exe -m pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. **Download the AI model for disease prediction**:
   - Download from this link: [Disease Prediction Model (Google Drive)](https://drive.google.com/file/d/1jR1JpyMpu_ITS6vz7JI4dXNC40tMglAJ/view?usp=sharing)
   - Save the downloaded file into the following directory:
     ```
     ./Server/ai_modules/disease_prediction/model_transformer
     ```

5. Create `.env` file:
   ```env
   SECRET_KEY=your_secret_key
   DJANGO_ALLOWED_HOSTS=your_allowed_hosts
   CORS_ALLOWED_ORIGINS=your_frontend_route
   ```

6. Run database migrations:
   ```bash
   python manage.py migrate
   ```

7. Start the backend server:
   ```bash
   python manage.py runserver :8000
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_BASE_URL=your_backend_route
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```

## Docker Compose Setup
To run the project using Docker Compose:

1. Ensure Docker and Docker Compose are installed.
2. Create the necessary `.env` files:
   ```env
   # Backend env variables
   SECRET_KEY=your_secret_key
   DJANGO_ALLOWED_HOSTS=your_allowed_hosts
   CORS_ALLOWED_ORIGINS=your_frontend_route

   # Frontend env variables
   NEXT_PUBLIC_API_BASE_URL=your_backend_route
   ```
3. Build and start the containers:
   ```bash
   docker-compose up --build
   ```
4. Access the services:
   - Backend API: `http://localhost:8000`
   - Frontend: `http://localhost:3000`

## Contribution
Feel free to contribute to this project by submitting pull requests or reporting issues.

## License
This project is licensed under the MIT License.

## Contributors
- **Nguyen Phuong Binh**
- **Nguyen Ho Ba Doan**
- **Ho Xuan Huy**

