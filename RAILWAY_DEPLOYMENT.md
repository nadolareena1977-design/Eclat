# 🚀 Deploy Èclat Website on Railway

This guide will walk you through deploying your Èclat coffee mug website on Railway.

## 📋 Prerequisites

- [Railway account](https://railway.app/) (free tier available)
- [Git](https://git-scm.com/) installed on your computer
- Your Èclat website files ready

## 🛠️ Setup Steps

### 1. Install Dependencies Locally (Optional but Recommended)

First, test that everything works locally:

```bash
# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` to verify your site works correctly.

### 2. Initialize Git Repository (if not already done)

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Èclat coffee website"
```

### 3. Deploy to Railway

#### Option A: Deploy via Railway Dashboard

1. **Go to [Railway.app](https://railway.app/)**
2. **Sign in/Sign up** with your GitHub account
3. **Click "New Project"**
4. **Choose "Deploy from GitHub repo"**
5. **Select your repository** (or create a new one)
6. **Railway will automatically detect** the Node.js project
7. **Click "Deploy"**

#### Option B: Deploy via Railway CLI

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Initialize Railway project:**
   ```bash
   railway init
   ```

4. **Deploy:**
   ```bash
   railway up
   ```

### 4. Configure Environment Variables

Railway will automatically set the `PORT` environment variable, but you can add custom ones if needed:

1. Go to your Railway project dashboard
2. Click on your service
3. Go to "Variables" tab
4. Add any custom environment variables

### 5. Get Your Live URL

After deployment, Railway will provide you with a live URL like:
```
https://your-project-name.railway.app
```

## 🔧 Configuration Files Created

- **`package.json`** - Node.js project configuration
- **`server.js`** - Express server to serve static files
- **`railway.json`** - Railway-specific configuration
- **`.gitignore`** - Git ignore rules

## 🌐 Custom Domain (Optional)

To use your own domain:

1. **Add custom domain** in Railway dashboard
2. **Update DNS records** with your domain provider
3. **Configure SSL** (Railway handles this automatically)

## 📊 Monitoring & Logs

- **View logs** in Railway dashboard
- **Monitor performance** with built-in metrics
- **Set up alerts** for downtime

## 🚀 Automatic Deployments

Railway automatically redeploys when you push to your main branch:

```bash
# Make changes to your code
git add .
git commit -m "Update product images"
git push origin main

# Railway will automatically redeploy
```

## 🔍 Troubleshooting

### Common Issues:

1. **Build fails:**
   - Check `package.json` for correct dependencies
   - Verify Node.js version compatibility

2. **Site not loading:**
   - Check Railway logs for errors
   - Verify `server.js` is correct

3. **Static files not serving:**
   - Ensure all files are committed to git
   - Check file paths in `server.js`

### Debug Commands:

```bash
# View Railway logs
railway logs

# Check service status
railway status

# Restart service
railway restart
```

## 💰 Cost Considerations

- **Free tier**: 500 hours/month, 1GB RAM
- **Paid plans**: Start at $5/month for more resources
- **Custom domains**: Free on all plans

## 🎯 Next Steps After Deployment

1. **Test all functionality** on the live site
2. **Update Google Analytics** with your live URL
3. **Test contact form** to ensure it works
4. **Check mobile responsiveness**
5. **Set up monitoring** and alerts

## 📞 Support

- **Railway Docs**: [docs.railway.app](https://docs.railway.app/)
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **GitHub Issues**: For code-specific problems

---

## 🎉 Congratulations!

Your Èclat coffee mug website is now live on Railway! 

**Live URL**: `https://your-project-name.railway.app`

Share your beautiful coffee mug website with the world! ☕✨
