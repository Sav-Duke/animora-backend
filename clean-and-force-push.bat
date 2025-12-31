@echo off
REM Remove .env from all git history, add to .gitignore, and force-push clean repo

REM 1. Remove .env from all commits
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all

REM 2. Add .env to .gitignore if not already
findstr /C:".env" .gitignore >nul 2>&1 || echo .env>>.gitignore

REM 3. Commit .gitignore change if needed
git add .gitignore
git commit -m "chore: ensure .env is in .gitignore" || echo ".gitignore already up to date"

REM 4. Force-push the cleaned history to origin
git push origin --force --all

echo "Done. .env removed from all history and repo force-pushed."
pause
