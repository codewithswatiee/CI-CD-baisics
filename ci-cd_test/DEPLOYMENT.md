# CI/CD Component Builder - Production Deployment Guide

## 🚀 Project Overview

This is a production-ready Next.js application that demonstrates CI/CD concepts through an interactive component builder. Users can create React components in real-time and deploy them automatically to GitHub, triggering a CI/CD pipeline for live deployment.

## ✨ Features

- **Live Component Builder**: Create React components with predefined templates
- **GitHub Integration**: Automatically commit components to your repository
- **CI/CD Pipeline**: Automated deployment via GitHub Actions and Vercel
- **Real-time Preview**: See components as you build them
- **Responsive Design**: Professional styling with Tailwind CSS
- **Dark Mode Support**: Modern UI/UX design

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **API Integration**: GitHub REST API

## 📋 Prerequisites

1. **GitHub Account** with a public repository
2. **Vercel Account** connected to your GitHub
3. **GitHub Personal Access Token** with `repo` scope
4. **Node.js 18+** for local development

## 🔧 Environment Setup

### 1. GitHub Personal Access Token

1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Add note: "CI-CD Component Builder"
4. Select scopes: ✅ `repo` (Full control of private repositories)
5. Generate and copy the token (starts with `ghp_`)

### 2. Environment Variables

Create a `.env.local` file in your project root:

```bash
GITHUB_TOKEN=ghp_your_token_here
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repository_name
```

**Example:**
```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=codewithswatiee
GITHUB_REPO=CI-CD-baisics
```

### 3. Vercel Environment Variables

In your Vercel project dashboard:

1. Go to **Settings > Environment Variables**
2. Add these variables:
   - `GITHUB_TOKEN`: Your GitHub personal access token
   - `GITHUB_OWNER`: Your GitHub username
   - `GITHUB_REPO`: Your repository name
3. Set for: ✅ Production ✅ Preview ✅ Development

## 🚢 Deployment Steps

### Option 1: Direct Vercel Deployment

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically

2. **Add Environment Variables** (as described above)

3. **Redeploy** after adding environment variables

### Option 2: GitHub Actions + Vercel

1. **GitHub Actions is already configured** in `.github/workflows/`
2. **Push to main branch** triggers deployment
3. **Vercel integration** handles the deployment

## 🧪 Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.js                    # Homepage with CI/CD explanation
│   ├── builder/page.js            # Component builder interface
│   ├── showcase/page.js           # User components showcase
│   └── api/
│       └── deploy-component/      # GitHub API integration
└── components/
    ├── ComponentBuilder.js        # Main builder component
    └── user-generated/           # Generated components go here
        └── placeholder.js        # Prevents build errors
```

## 🔒 Security Best Practices

- ✅ Environment variables for sensitive data
- ✅ GitHub token with minimal required scopes
- ✅ Input validation and sanitization
- ✅ Error handling and logging
- ✅ No hardcoded secrets in code

## 🐛 Troubleshooting

### Build Errors
- **Missing directory**: Ensure `src/components/user-generated/` exists
- **Module not found**: Check import paths in showcase page
- **Environment variables**: Verify all required vars are set

### GitHub API Issues
- **Authentication**: Check token validity and scopes
- **Repository access**: Ensure token has access to target repo
- **Rate limits**: GitHub API has rate limits for free accounts

### Vercel Deployment
- **404 errors**: Check `vercel.json` configuration
- **Build failures**: Review build logs in Vercel dashboard
- **Environment variables**: Ensure all vars are set in Vercel

## 📊 Monitoring & Analytics

- **Vercel Analytics**: Monitor performance and usage
- **GitHub Actions**: Check deployment status and logs
- **Error Tracking**: Monitor console for runtime errors

## 🔄 CI/CD Pipeline Flow

1. **User creates component** in the builder
2. **Component gets committed** to GitHub via API
3. **GitHub Actions triggered** on push to main
4. **Tests run** and build executes
5. **Vercel deploys** the updated application
6. **New component appears** in the showcase

## 🎯 Production Checklist

- ✅ Environment variables configured
- ✅ GitHub token with correct permissions
- ✅ Vercel project connected
- ✅ Domain configured (optional)
- ✅ Error monitoring setup
- ✅ Analytics configured
- ✅ README.md updated

## 📝 Contributing

This project demonstrates CI/CD concepts and is designed for educational purposes. To extend functionality:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues related to:
- **Deployment**: Check Vercel logs and documentation
- **GitHub API**: Review GitHub API documentation
- **Build errors**: Check Next.js documentation

---

**Built with ❤️ for demonstrating modern CI/CD practices**
