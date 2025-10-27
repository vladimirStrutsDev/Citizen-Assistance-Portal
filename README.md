## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- OpenAI API Key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Citizen-Assistance-Portal
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   Write in Bash

   ```bash
   cp .env
   ```

4. **Configure OpenAI API Key**
   Add your OpenAI API key to the `.env` file:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

### Running the Project

1. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in your terminal)

3. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🔑 OpenAI API Key Setup

### Getting an OpenAI API Key

1. **Visit OpenAI Platform**
   Go to [https://platform.openai.com/](https://platform.openai.com/)

2. **Sign up or Log in**
   Create an account or log in to your existing account

3. **Navigate to API Keys**

   - Go to the API section
   - Click on "API Keys" in the left sidebar
   - Click "Create new secret key"

4. **Create API Key**
   - Give your key a name (e.g., "Citizen Assistance Portal")
   - Select appropriate permissions
   - Click "Create secret key"
   - **Important**: Copy the key immediately as it won't be shown again

### Configuring the API Key

1. **Add to Environment Variables**

   ```env
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

2. **Restart the Development Server**
   ```bash
   npm run dev
   ```

### API Key Security

- ✅ **Do**: Store your API key in `.env` file
- ✅ **Do**: Add `.env` to `.gitignore`
- ❌ **Don't**: Commit API keys to version control
- ❌ **Don't**: Share API keys in public repositories

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🌐 Features

- **Multi-step Form**: Step-by-step assistance request process
- **AI-Powered Help**: OpenAI integration for form assistance
- **Internationalization**: English and Arabic language support
- **Responsive Design**: Mobile-first responsive layout
- **Form Validation**: Comprehensive client-side validation
- **Progress Tracking**: Visual progress indicator

## 🔧 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form
- **Internationalization**: react-i18next
- **AI Integration**: OpenAI API
- **Routing**: React Router
