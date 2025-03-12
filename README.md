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
- PostgreSQL (Database)
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
4. Run database migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the backend server:
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
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

## Contribution
Feel free to contribute to this project by submitting pull requests or reporting issues.

## License
This project is licensed under the MIT License.

## Contributors
- **Nguyen Phuong Binh**
- **Nguyen Ho Ba Doan**
- **Ho Xuan Huy**