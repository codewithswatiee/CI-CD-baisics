# Getting Started with Real GitHub Integration

## Prerequisites
- GitHub account
- Vercel account
- Basic understanding of environment variables

## Step 1: Get GitHub Personal Access Token

1. Visit: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Set expiration and select scopes:
   - ✅ repo
   - ✅ workflow
4. Copy the token (starts with `ghp_`)

## Step 2: Set Up Environment Variables

Create `.env.local` in your project root:

```bash
# GitHub Integration
NEXT_PUBLIC_GITHUB_TOKEN=ghp_your_token_here
GITHUB_OWNER=codewithswatiee
GITHUB_REPO=CI-CD-baisics

# Vercel Integration (for GitHub Actions)
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJ_ID=your_project_id
```

## Step 3: Get Vercel Tokens

1. Go to: https://vercel.com/account/tokens
2. Create a new token
3. Get your project details:
   ```bash
   npx vercel env ls
   ```

## Step 4: Add GitHub Secrets

In your GitHub repository settings → Secrets and variables → Actions:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID` 
- `VERCEL_PROJ_ID`

## Step 5: Test the Real Implementation

Replace the demo `handleDeploy` function with the real GitHub API calls.

## Security Notes

⚠️ **Never commit tokens to git**
- Add `.env.local` to `.gitignore`
- Use GitHub secrets for production
- Rotate tokens regularly

## Alternative: Backend API

For better security, create API routes:
- `/api/github/create-component`
- Handle authentication server-side
- Validate user permissions
- Rate limit requests
