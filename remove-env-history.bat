@echo off
REM This script will remove .env from all git history and force-push the clean repo
REM USE WITH CAUTION: This rewrites history and will affect all collaborators

REM 1. Remove .env from all commits
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all

REM 2. Add .env to .gitignore if not already
echo .env>>.gitignore

REM 3. Force-push the cleaned history to origin
git push origin --force --all

echo "Done. .env removed from all history and repo force-pushed."
