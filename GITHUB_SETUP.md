# GitHub-ում Project-ը ավելացնելու հրահանգներ

## 1. GitHub-ում Repository ստեղծել

1. Գնացեք [GitHub.com](https://github.com)
2. Մուտք գործեք ձեր account-ը
3. Կտտացրեք **"New"** կամ **"+"** button-ին (վերևի աջ անկյունում)
4. Լրացրեք repository-ի տեղեկությունները:
   - **Repository name**: `micro-front-app` (կամ ձեր ընտրած անուն)
   - **Description**: "MicroFrontend application with Module Federation"
   - **Visibility**: Public կամ Private (ընտրեք ձեր նախասիրության համաձայն)
   - **Չնշեք** "Initialize with README" (մենք արդեն ունենք)
5. Կտտացրեք **"Create repository"**

## 2. Local Project-ը Git-ի հետ կապել

Ձեր terminal-ում (project folder-ում) գործարկեք հետևյալ հրամանները:

```bash
# Git repository initialize անել (եթե դեռ չեք արել)
git init

# Բոլոր ֆայլերը add անել
git add .

# Առաջին commit-ը ստեղծել
git commit -m "Initial commit: MicroFrontend app with Module Federation"

# GitHub repository-ի URL-ը ավելացնել (փոխարինեք YOUR_USERNAME-ը ձեր username-ով)
git remote add origin https://github.com/YOUR_USERNAME/micro-front-app.git

# Main branch-ը set անել (եթե պետք է)
git branch -M main

# Code-ը push անել GitHub
git push -u origin main
```

## 3. Հրամանների ամբողջական օրինակ

```bash
# 1. Git init (եթե դեռ չեք արել)
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit: MicroFrontend application with Module Federation, shared components, and 2 React apps"

# 4. Add remote (փոխարինեք YOUR_USERNAME-ը)
git remote add origin https://github.com/YOUR_USERNAME/micro-front-app.git

# 5. Push to GitHub
git push -u origin main
```

## 4. Հետագա փոփոխություններ push անելու համար

```bash
# Փոփոխությունները add անել
git add .

# Commit անել
git commit -m "Your commit message here"

# Push անել GitHub
git push
```

## 5. SSH Key օգտագործելու դեպքում

Եթե SSH key-ով եք աշխատում, remote URL-ը կլինի:

```bash
git remote add origin git@github.com:YOUR_USERNAME/micro-front-app.git
```

## 6. Repository-ի կարգավորումներ

GitHub-ում repository-ը ստեղծելուց հետո կարող եք:

- **README.md** ավտոմատ կցուցադրվի repository-ի գլխավոր էջում
- **Topics/Tags** ավելացնել: `microfrontend`, `module-federation`, `react`, `webpack`
- **Description** ավելացնել repository-ի մասին
- **License** ավելացնել (եթե ցանկանում եք)

## 7. .gitignore-ի ստուգում

Մեր `.gitignore` file-ը արդեն կարգավորված է և կբացառի:
- `node_modules/`
- `dist/` և `build/` folders
- IDE settings
- Environment files
- Log files

## 8. Troubleshooting

### Եթե "remote origin already exists" սխալ եք ստանում:

```bash
# Remote-ը հեռացնել
git remote remove origin

# Նոր remote ավելացնել
git remote add origin https://github.com/YOUR_USERNAME/micro-front-app.git
```

### Եթե authentication error եք ստանում:

1. GitHub-ում ստեղծեք Personal Access Token
2. Օգտագործեք token-ը password-ի փոխարեն
3. Կամ կարգավորեք SSH keys

### Եթե "branch 'main' does not exist" սխալ եք ստանում:

```bash
# Branch ստեղծել
git checkout -b main

# Push անել
git push -u origin main
```

## 9. Repository-ի կառուցվածքը GitHub-ում

GitHub-ում ձեր repository-ը կունենա հետևյալ կառուցվածքը:

```
micro-front-app/
├── apps/
│   ├── host/
│   └── remote/
├── build-config/
├── shared/
├── .gitignore
├── package.json
└── README.md
```

## 10. GitHub Pages-ում Deploy (Optional)

Եթե ցանկանում եք deploy անել GitHub Pages-ում, կարող եք ավելացնել GitHub Actions workflow:

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      # ... deploy steps
```

---

**Հաջողություն GitHub-ում project-ը ավելացնելու համար:**

