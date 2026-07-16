# Publish this folder on GitHub

Create an empty GitHub repository named `futurequest-ai`. Do not add a README, license, or `.gitignore` on GitHub because this folder already contains them.

From this folder, run:

```bash
git init
git add .
git commit -m "Initial commit: FutureQuest AI prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/futurequest-ai.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

The repository includes a built APK, so use Git or GitHub Desktop for the initial push. For a lighter long-term repository, move the APK to a GitHub Release and remove it from regular version history.

Recommended repository description:

> A mobile AI companion prototype that helps Indian students turn career confusion into quests, parent clarity, and a college-ready profile.

Suggested topics:

`react-native`, `expo`, `typescript`, `edtech`, `ai-companion`, `career-guidance`, `student-portfolio`, `product-prototype`
