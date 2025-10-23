
## Features

### ✅ Must-Have Features (Completed)
- **Pokémon List View**: Displays first 50 Pokémon in a responsive grid layout
- **Pokémon Details View**: Shows comprehensive information including stats, types, and 

### 🚀 Nice-to-Have Features (Completed)
- **Scroll Position Persistence**: Remembers scroll position when returning from details - testing scenario added below
- **Pokémon Highlighting**: Visual feedback showing which Pokémon was last viewed - testing scenario added below
- **Performance Optimization**: React.memo and useCallback for optimal rendering - missing testing functionality for console.log can be implemented with more time
- **Image Lazy Loading**: Efficient loading of Pokémon sprites - testing scenario added below

## Getting Started

### Prerequisites
- Node.js (version 20.19+ or 22.12+ recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Pokemon_pokedex_React
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Application Demonstration 
https://www.loom.com/share/59da8fbbea2549cb9713d84dd9c52792?sid=9b371de9-1446-4da4-98a7-dcf2b9d173da

## Design Decisions & Tradeoffs

### Future Enhancements (with more time)
1. **State Management**: Implement React Query or Zustand for better caching
2. **Search & Filter**: Add search functionality and type filtering
3. **Pagination**: Load more Pokémon with infinite scroll or pagination
4. **Favorites**: Allow users to favorite Pokémon
6. **Testing**: Unit tests with Jest for memo and usecallback
9. **Dark Mode**: Cause evryone loves a darkmode 
10. **Advanced Animations**: More sophisticated transitions and micro-interactions

### 🎯 Technical Tradeoffs
- **Simplicity**: Chose local state over complex state management for faster development
- **CSS**: Used traditional CSS for better performance and smaller bundle size
- **Used Fetch**: Used native fetch API to reduce dependencies
- **Inline Styles**: Balanced maintainability with development speed

## Performance Optimizations

### React.memo Implementation
- **PokemonTile Component**: Memoized to prevent unnecessary re-renders
- **Shallow Comparison**: Only re-renders when props actually change
- **Performance Impact**: Significant improvement with 50+ Pokemon tiles

### useCallback Optimization
- **Stable Function References**: Memoized click handlers to prevent child re-renders
- **Dependency Management**: Proper dependency arrays for optimal performance
- **Memory Efficiency**: Reduces function recreation on every render

### Scroll Position Management
- **State Persistence**: Saves scroll position when navigating to details
- **Smooth Restoration**: Uses requestAnimationFrame for optimal timing
- **User Experience**: Seamless navigation without losing context

### Visual Feedback System
- **Pokemon Highlighting**: Golden animation for recently viewed Pokemon
- **Auto-cleanup**: Highlights automatically disappear after 3 seconds
- **Smooth Animations**: CSS keyframes for professional feel

## Testing All Features

### Scroll Position Persistence

#### Test Steps
1. **Navigate to**: `http://localhost:5173/`
2. **Scroll down** the Pokemon list to the middle or bottom
3. **Click any Pokemon** tile to go to details page
4. **Click "← Back to Pokédex"** button
5. **Verify**: You return to the exact scroll position you were at

#### Expected Behavior
- **Scroll position is preserved** when returning from details
- **Smooth restoration** using requestAnimationFrame
- **No jarring jumps** to top of page

### Pokemon Highlighting Feature

#### Test Steps
1. **Navigate to**: `http://localhost:5173/`
2. **Scroll down** and click on any Pokemon tile
3. **Click "← Back to Pokédex"** button
4. **Observe**: The Pokemon tile you clicked should be highlighted
5. **Wait 3 seconds** and verify the highlight disappears

#### Expected Behavior
- **Golden border** around the clicked Pokemon tile
- **Pulsing animation** for 3 seconds
- **Auto-cleanup** - highlight disappears after 3 seconds
- **Visual feedback** showing which Pokemon was last viewed

### Image Lazy Loading

#### Test Steps
1. **Navigate to**: `http://localhost:5173/`
2. **Open DevTools** → **Network tab**
3. **Refresh the page**
4. **Scroll slowly** through the Pokemon list
5. **Observe**: Images load as they come into view

#### Expected Behavior
- **Images load on demand** as you scroll
- **Faster initial page load** (not all 50 images at once)
- **Bandwidth efficient** - only loads visible images
- **Smooth scrolling** without waiting for all images

### Responsive Design

#### Test Steps
1. **Desktop**: Open `http://localhost:5173/` in full browser window
2. **Tablet**: Resize browser to tablet width (768px)
3. **Mobile**: Resize browser to mobile width (375px)
4. **Test both pages**: List view and Pokemon details

#### Expected Behavior
- **Grid adapts** to screen size (more columns on desktop, fewer on mobile)
- **Text remains readable** at all sizes
- **Images scale properly** without distortion
- **Touch-friendly** buttons and tiles on mobile


### Pokemon Details Page

#### Test Steps
1. **Click any Pokemon** tile from the list
2. **Verify URL**: Should be `/pokemon/[pokemon-name]`
3. **Check all sections**:
   - Pokemon image and name
   - Pokemon ID number
   - Height and weight measurements
   - Type badges
   - Ability badges
   - Key stats (HP, Attack, Defense) with progress bars
4. **Test back navigation**: Click "← Back to Pokédex"

#### Expected Behavior
- **Complete Pokemon information** displayed
- **Proper formatting** (height in meters, weight in kg)
- **Visual stats bars** showing relative strength
- **Type and ability badges** with proper styling
- **Back button** returns to list with scroll position




