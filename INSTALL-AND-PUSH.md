# Install Git & Push to GitHub

Follow these steps once. After this, you can push with: `git add .` → `git commit -m "message"` → `git push`.

---

## Step 1: Install Git

1. **Download Git for Windows**  
   https://git-scm.com/download/win  

2. **Run the installer**  
   - Keep the default options (just click Next).  
   - When you see "Adjusting your PATH", leave **"Git from the command line and also from 3rd-party software"** selected.  
   - Finish the install.

3. **Close and reopen** Cursor/VS Code (or any terminal) so it picks up Git.

---

## Step 2: Push this project

**Option A – Use the script (easiest)**

1. Open **PowerShell** or **Command Prompt**.
2. Go to this folder:
   ```powershell
   cd "c:\Users\Ananya\OneDrive\Desktop\sak"
   ```
3. Run:
   ```powershell
   .\push-to-github.ps1
   ```
4. When Git asks for **password**, paste your **Personal Access Token** (the one that starts with `ghp_`).  
   Username: **sakshamtikekar19**

**Option B – Run commands yourself**

In a terminal in the `sak` folder:

```powershell
git init
git add .
git commit -m "Initial commit: The Gamer's Hideout website"
git remote add origin https://github.com/sakshamtikekar19/gamers-hideout.git
git branch -M main
git push -u origin main
```

When asked for **password**, use your **GitHub Personal Access Token**, not your GitHub account password.

---

## If you get "git is not recognized"

- Make sure you **closed and reopened** Cursor/terminal after installing Git.
- Or use Git’s full path in the script (see `push-to-github.ps1` – it tries common install paths).

---

## Your repo

After a successful push, the site code will be at:  
**https://github.com/sakshamtikekar19/gamers-hideout**
