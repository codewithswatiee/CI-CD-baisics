# 🚀 CI/CD Component Builder

A production-ready demonstration of a complete CI/CD pipeline featuring a live component builder that automatically commits to GitHub and deploys via Vercel.

## ✨ Features

- **🔧 Live Component Builder**: Create React components through a web interface
- **🚀 Automated Deployment**: Components automatically commit to GitHub and deploy
- **🧪 CI/CD Pipeline**: GitHub Actions handle linting, testing, and deployment
- **📱 Responsive Design**: Modern, professional UI with dark mode support
- **🔒 Production Security**: Secure API endpoints and environment variable management

## 🌐 Live Demo

**🔗 [View Live Site](https://ci-cd-baisics.vercel.app)**

- **Homepage**: Overview of CI/CD pipeline
- **Component Builder**: `/builder` - Create custom components
- **Showcase**: `/showcase` - View deployed components

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel
- **Integration**: GitHub API

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/codewithswatiee/CI-CD-baisics.git
cd CI-CD-baisics/ci-cd_test
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
cp .env.example .env
# Edit .env with your GitHub token and repository details
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🔑 Environment Variables

### Required for Production:
```bash
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repository_name
```

### Optional (for enhanced features):
```bash
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=your_deployment_url
GITHUB_CLIENT_ID=your_oauth_client_id
GITHUB_CLIENT_SECRET=your_oauth_client_secret
```

## 📋 How It Works

1. **User Creates Component**: Uses the web interface to build a custom React component
2. **API Processes Request**: Backend validates and processes the component code
3. **GitHub Commit**: Component is automatically committed to the repository
4. **CI/CD Triggers**: GitHub Actions run linting, testing, and building
5. **Auto Deploy**: Vercel automatically deploys the updated application
6. **Live Update**: New component appears on the live website

## 🏗️ Project Structure

```
ci-cd_test/
├── src/
│   ├── app/
│   │   ├── api/deploy-component/    # API endpoint for component deployment
│   │   ├── builder/                 # Component builder page
│   │   ├── showcase/                # Component showcase page
│   │   └── page.js                  # Homepage
│   ├── components/
│   │   ├── ComponentBuilder.js      # Main component builder interface
│   │   └── user-generated/          # User-created components (auto-generated)
│   └── lib/
│       └── github.js               # GitHub API utilities
├── .github/workflows/              # CI/CD pipeline configuration
├── GITHUB_SETUP.md                # Detailed setup instructions
└── README.md                      # This file
```

## 🔒 Security Features

- **Environment Variables**: All secrets stored securely
- **API Validation**: Server-side input validation and sanitization
- **Rate Limiting**: Prevents abuse of the component creation endpoint
- **Error Handling**: Comprehensive error handling and logging

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Fork this repository
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Other Platforms
The application is platform-agnostic and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting provider

## 📊 CI/CD Pipeline

The GitHub Actions workflow automatically:
1. **Lints** code for quality assurance
2. **Builds** the application
3. **Tests** functionality (when tests are added)
4. **Deploys** to production via Vercel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Resume Highlights

This project demonstrates:
- **Full-Stack Development**: Next.js with API routes
- **CI/CD Implementation**: Complete pipeline from code to deployment
- **GitHub Integration**: API usage and webhook handling
- **Modern UI/UX**: Professional, responsive design
- **Production Security**: Environment variables and API security
- **Automated Testing**: Quality assurance in CI pipeline

## 📞 Contact

**Developer**: [Your Name]  
**Email**: [your.email@example.com]  
**LinkedIn**: [Your LinkedIn]  
**GitHub**: [@codewithswatiee](https://github.com/codewithswatiee)

---

⭐ **Star this repository if it helped you learn about CI/CD!**
