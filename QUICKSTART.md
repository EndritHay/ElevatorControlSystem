# Quick Start Guide

Get the Elevator Control System up and running in 5 minutes!

## Prerequisites

Before you begin, ensure you have:
- **Node.js** version 18 or higher
- **npm** or **yarn** package manager

Check your versions:
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 8.0.0 or higher
```

## Installation Steps

### 1. Install Node.js (if not already installed)

**Windows:**
- Download from [nodejs.org](https://nodejs.org/)
- Run the installer
- Verify installation in PowerShell: `node --version`

**macOS:**
```bash
brew install node
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install Project Dependencies

Navigate to the project folder and run:

```bash
npm install
```

This will install all required packages including React, TypeScript, Vite, and testing libraries.

### 3. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## First Steps

Once the app is running:

1. **Call an Elevator**: Click the 📞 button on any floor
2. **Watch the Magic**: The scheduler assigns the best elevator
3. **Switch Language**: Click the language button (EN/SQ) in the header
4. **Reset**: Click the reset button to clear all queues

## Project Configuration

### Change Number of Elevators/Floors

Edit `src/App.tsx` line 20:

```typescript
initializeElevators(3, 10, 500);
// Parameters: (elevators, floors, speedMsPerFloor)
```

### Adjust Elevator Speed

Faster elevators:
```typescript
initializeElevators(3, 10, 300); // 300ms per floor
```

Slower elevators:
```typescript
initializeElevators(3, 10, 800); // 800ms per floor
```

### Customize Theme

Edit `src/theme/index.ts` to change colors, spacing, fonts, etc.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run lint` | Check code quality |
| `npm run format` | Format code |

## Troubleshooting

### Port 5173 already in use

Change the port in `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Use different port
  },
});
```

### Dependencies not installing

Clear npm cache:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Tests failing

Ensure you're using Node 18+:
```bash
node --version
```

### TypeScript errors

Restart your IDE/editor or run:
```bash
npx tsc --noEmit
```

## Next Steps

1. **Add More Languages**: See `README.md` section "Adding New Languages"
2. **Customize UI**: Edit components in `src/components/`
3. **Modify Algorithm**: Edit `src/stores/scheduler.ts`
4. **Add Features**: Check `CONTRIBUTING.md` for guidelines

## Getting Help

- 📖 Read the full [README.md](./README.md)
- 🐛 Report issues on GitHub
- 💬 Ask questions in Discussions

## Demo

Try the live demo: [Coming Soon]

---

**Happy Coding! 🚀**

