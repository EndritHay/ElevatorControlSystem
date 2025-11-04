# Elevator Control System

A responsive, modular, and testable web application that simulates multi-elevator scheduling in a building with intelligent queue management and real-time animations.

![CI](https://github.com/yourusername/elevator-app/workflows/CI/badge.svg)

## Features

- 🏢 **Multi-Elevator Simulation**: Intelligent scheduling algorithm that assigns requests to the optimal elevator
- 🌐 **Internationalization**: Built-in support for multiple languages (English, Albanian) with easy-to-extend adapter pattern
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations powered by Framer Motion
- 🧪 **Fully Tested**: Comprehensive unit and integration tests with Jest and React Testing Library
- 🚀 **Production Ready**: CI/CD pipeline with GitHub Actions and easy deployment to Vercel/Netlify
- ♿ **Accessible**: ARIA labels and keyboard navigation support
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Styled Components with custom theme system
- **State Management**: Zustand
- **Internationalization**: react-i18next with adapter pattern
- **Animation**: Framer Motion
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/elevator-app.git
cd elevator-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Architecture

### Folder Structure

```
src/
├── components/       # Reusable UI components
│   ├── Building.tsx
│   ├── ElevatorCar.tsx
│   ├── ElevatorShaft.tsx
│   ├── Floor.tsx
│   ├── Header.tsx
│   ├── Button.tsx
│   └── ControlPanel.tsx
├── stores/          # Zustand stores and state management
│   ├── elevatorStore.ts
│   └── scheduler.ts
├── hooks/           # Custom React hooks
│   └── useElevatorController.ts
├── i18n/            # Internationalization
│   ├── translator.ts
│   └── reactAdapter.ts
├── locales/         # Translation files
│   ├── en/
│   └── sq/
├── theme/           # Theme tokens and styling
│   ├── index.ts
│   ├── ThemeProvider.tsx
│   └── GlobalStyles.ts
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── tests/           # Test files
├── App.tsx          # Main app component
└── main.tsx         # App entry point
```

### Elevator Scheduling Algorithm

The system uses an intelligent scheduling algorithm that:

1. **Estimates Arrival Time**: For each elevator, calculates the time to serve a request considering:
   - Current position
   - Existing queue of stops
   - Travel time and door open/close time

2. **Selects Best Elevator**: Chooses the elevator with:
   - Minimum estimated arrival time
   - Tie-breaker: Smaller queue length

3. **Queue Processing**: Each elevator processes its queue using FIFO with:
   - Smooth animations using easing functions
   - Status updates (idle, moving, stopped, doorOpen)
   - Duplicate request prevention

**Complexity**: O(E × Q) where E = number of elevators, Q = average queue length

## Adding New Languages

1. Create a new folder under `src/locales/`, e.g., `src/locales/de/`
2. Add a `translation.json` file with translated keys
3. Import the translations in `src/i18n/reactAdapter.ts`
4. The language will be automatically available in the app

Example:
```json
{
  "app": {
    "title": "Aufzugssteuerungssystem"
  },
  "elevator": {
    "status": {
      "idle": "Leerlauf",
      "moving": "In Bewegung"
    }
  }
}
```

## Customization

### Changing Number of Elevators/Floors

Edit `src/App.tsx`:

```typescript
useEffect(() => {
  // Initialize with 5 elevators and 15 floors
  initializeElevators(5, 15, 500);
}, [initializeElevators]);
```

### Adjusting Speed

Modify the speed parameter (ms per floor):

```typescript
initializeElevators(3, 10, 300); // Faster: 300ms per floor
```

### Theme Customization

Edit `src/theme/index.ts` to customize colors, spacing, fonts, etc.

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

Key test files:
- `src/stores/__tests__/scheduler.test.ts` - Scheduler algorithm tests
- `src/stores/__tests__/elevatorStore.test.ts` - State management tests
- `src/components/__tests__/Button.test.tsx` - Component tests
- `src/utils/__tests__/helpers.test.ts` - Utility function tests

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Configure:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect repository in Netlify
3. Configure:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Deploy!

## Performance Considerations

- **Efficient Rendering**: Uses `React.memo` and optimized re-renders
- **Animation Performance**: Leverages `requestAnimationFrame` for smooth 60fps animations
- **State Management**: Zustand provides minimal re-renders
- **Bundle Size**: Code splitting and tree-shaking enabled

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by real-world elevator control systems
- Built with modern web technologies
- Designed for educational and demonstration purposes

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/elevator-app](https://github.com/yourusername/elevator-app)

---

Made with ❤️ and React

