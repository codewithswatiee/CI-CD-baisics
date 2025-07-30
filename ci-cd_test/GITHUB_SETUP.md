# 🚀 Production Setup Guide

This guide will help you deploy the CI/CD Component Builder to production.

## 📋 Prerequisites

- GitHub account with repository access
- Vercel account for deployment
- Basic understanding of environment variables

## 🔑 Required Environment Variables

### For Local Development (.env)
```bash
# GitHub Integration (Required)
GITHUB_TOKEN=ghp_your_personal_access_token_here
GITHUB_OWNER=codewithswatiee
GITHUB_REPO=CI-CD-baisics

# NextAuth Configuration
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### For Production (Vercel Dashboard)
```bash
# GitHub Integration (Required)
GITHUB_TOKEN=ghp_your_personal_access_token_here
GITHUB_OWNER=codewithswatiee
GITHUB_REPO=CI-CD-baisics

# NextAuth Configuration
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
```

## 🔧 Step 1: Get GitHub Personal Access Token

1. **Go to GitHub Settings**:
   - Visit: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"

2. **Configure Token**:
   - **Note**: "CI-CD Component Builder"
   - **Expiration**: Choose duration (90 days recommended)
   - **Scopes**: Check these boxes:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)

3. **Copy Token**:
   - Click "Generate token"
   - **⚠️ IMPORTANT**: Copy the token immediately (starts with `ghp_`)

## 🌐 Step 2: Deploy to Vercel

### Option A: Quick Deploy Button
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/codewithswatiee/CI-CD-baisics)

### Option B: Manual Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   cd ci-cd_test
   vercel --prod
   ```

3. **Add Environment Variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add the required environment variables listed above

## 🔐 Step 3: Add GitHub Secrets (for CI/CD)

In your GitHub repository settings → Secrets and variables → Actions, add:

```bash
# Vercel Integration
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
```

### To get Vercel tokens:
```bash
# Get Vercel token
npx vercel login
npx vercel env ls
```

## 🚀 Step 4: Test the Production Setup

1. **Visit your deployed site**
2. **Go to `/builder`**
3. **Create a test component**
4. **Verify it commits to GitHub**
5. **Check if CI/CD pipeline triggers**

## 🔒 Security Best Practices

### ✅ Do:
- Use environment variables for all secrets
- Rotate GitHub tokens regularly
- Use fine-grained personal access tokens when available
- Add `.env*` to `.gitignore`

### ❌ Don't:
- Commit secrets to git
- Use the same token for multiple projects
- Share tokens in public channels
- Set overly broad token permissions

## 🐛 Troubleshooting

### Common Issues:

1. **"GitHub token not configured"**
   - Ensure `GITHUB_TOKEN` is set in environment variables
   - Verify token has correct permissions

2. **"Repository rule violations"**
   - Your GitHub token was detected in commits
   - Generate a new token and remove old commits

3. **"API rate limit exceeded"**
   - GitHub API has rate limits
   - Implement caching or request throttling

4. **Build fails on Vercel**
   - Check environment variables are set correctly
   - Verify all dependencies are in package.json

## 📊 Monitoring

### Check deployment status:
- **GitHub Actions**: Repository → Actions tab
- **Vercel**: Dashboard → Deployments
- **Component Builder**: `/builder` page status

## 🎯 Success Indicators

✅ Component Builder loads without errors  
✅ Can create and customize components  
✅ Components commit to GitHub successfully  
✅ GitHub Actions pipeline triggers  
✅ Changes deploy to Vercel automatically  

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify environment variables are set correctly
3. Check GitHub Actions logs for errors
4. Review Vercel deployment logs
