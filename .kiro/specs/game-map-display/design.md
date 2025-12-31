# Game Map Display Design Document

## Overview

The Game Map Display is a static HTML application that presents an interactive visual interface showing six game maps with their current and upcoming modes. The application displays a background map image with overlaid mode indicators, timers, and visual effects to create an immersive gaming experience. The system operates entirely client-side using vanilla JavaScript for timer functionality and CSS for visual styling.

## Architecture

The application follows a simple client-side architecture:

- **Static HTML Structure**: Single HTML file containing the map layout and UI elements
- **CSS Styling**: Responsive styles for map positioning, mode indicators, and visual effects
- **JavaScript Timer Engine**: Client-side logic for countdown timers and mode transitions
- **Asset Management**: Image assets for background map and mode icons
- **Deployment Pipeline**: GitHub Actions workflow for automated publishing to GitHub Pages

The architecture prioritizes simplicity and performance, avoiding external dependencies while maintaining rich visual functionality.

## Components and Interfaces

### HTML Structure Components

**Map Container**
- Main wrapper element containing the background map image
- Positioned overlay elements for each game map location
- Responsive viewport configuration for different screen sizes

**Map Location Elements**
- Individual containers for each of the six game maps
- Positioned absolutely over the background image coordinates
- Contains mode indicators, timers, and map labels

**Mode Indicator Components**
- Active mode display with bright styling
- Next mode display with dimmed styling
- Visual icons representing different game modes
- Timer display in MM:SS format

### CSS Interface Specifications

**Visual State Classes**
- `.active-mode`: Bright, prominent styling for current modes
- `.next-mode`: Dimmed, subdued styling for upcoming modes
- `.mode-indicator`: Base styling for all mode displays
- `.timer-display`: Consistent formatting for countdown timers

**Responsive Breakpoints**
- Desktop: Full-size map display (1200px+)
- Tablet: Scaled map with adjusted text sizes (768px-1199px)
- Mobile: Compact layout with simplified indicators (< 768px)

### JavaScript Interface

**Timer Management**
```javascript
interface MapTimer {
  mapId: string;
  currentMode: GameMode;
  nextMode: GameMode;
  timeRemaining: number; // seconds
  updateCallback: Function;
}

interface GameMode {
  name: string;
  icon: string;
  displayName: string;
}
```

**Core Functions**
- `initializeTimers()`: Set up initial timer states for all maps
- `updateTimer(mapId)`: Decrement timer and update display
- `transitionMode(mapId)`: Switch from next mode to active mode
- `formatTime(seconds)`: Convert seconds to MM:SS format

## Data Models

### Map Configuration

```javascript
const mapConfigurations = {
  "buried-city": {
    name: "Buried City",
    position: { x: 15, y: 45 },
    currentMode: "normal",
    nextMode: "cold-snap",
    timeRemaining: 1749 // 29:09
  },
  "dam-battlegrounds": {
    name: "Dam Battlegrounds", 
    position: { x: 50, y: 65 },
    currentMode: "cold-snap",
    nextMode: "normal",
    timeRemaining: 1749 // 29:09
  },
  "space-port": {
    name: "Space Port",
    position: { x: 25, y: 25 },
    currentMode: "night-raid",
    nextMode: "normal", 
    timeRemaining: 1749 // 29:09
  },
  "the-blue-gate": {
    name: "The Blue Gate",
    position: { x: 75, y: 45 },
    currentMode: "normal",
    nextMode: "electromagnetic-storm",
    timeRemaining: 1749 // 29:09
  },
  "stella-montis": {
    name: "Stella Montis",
    position: { x: 85, y: 15 },
    currentMode: "normal", 
    nextMode: "night-raid",
    timeRemaining: 1749 // 29:09
  },
  "practice-range": {
    name: "Practice Range",
    position: { x: 50, y: 35 },
    currentMode: "normal",
    nextMode: "normal",
    timeRemaining: null // No timer for practice
  }
};
```

### Game Mode Definitions

```javascript
const gameModes = {
  "normal": {
    displayName: "Normal",
    icon: "⚪",
    description: "Standard gameplay mode"
  },
  "night-raid": {
    displayName: "Night Raid", 
    icon: "🌙",
    description: "Nighttime combat scenario"
  },
  "cold-snap": {
    displayName: "Cold Snap",
    icon: "❄️", 
    description: "Frozen environment conditions"
  },
  "electromagnetic-storm": {
    displayName: "Electromagnetic Storm",
    icon: "⚡",
    description: "Electrical interference effects"
  },
  "hidden-bunker": {
    displayName: "Hidden Bunker",
    icon: "🏠",
    description: "Underground facility mode"
  }
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

After analyzing the acceptance criteria, several properties can be consolidated to eliminate redundancy while maintaining comprehensive validation:

**Property 1: Map positioning consistency**
*For any* map configuration, each map element should be positioned at coordinates that correspond to its defined location on the background image
**Validates: Requirements 1.3**

**Property 2: Active mode styling consistency**
*For any* map with an active mode, the mode indicator should display with bright, prominent visual styling using the active CSS class
**Validates: Requirements 2.1, 2.5**

**Property 3: Next mode styling consistency**
*For any* map with a next mode, the upcoming mode indicator should display with dimmed, subdued visual styling that visually distinguishes it from active modes
**Validates: Requirements 3.1, 3.5**

**Property 4: Timer format consistency**
*For any* active timer, the display should format the countdown in MM:SS format where MM represents minutes and SS represents seconds
**Validates: Requirements 4.1**

**Property 5: Timer transition behavior**
*For any* timer that reaches zero, the system should transition the next mode to active status and update the visual styling accordingly
**Validates: Requirements 4.2, 4.3**

**Property 6: Timer update frequency**
*For any* running timer, the countdown display should decrement by exactly one second every 1000 milliseconds
**Validates: Requirements 4.4**

**Property 7: Timer positioning association**
*For any* map with a timer, the timer display should be positioned within or immediately adjacent to the map's container element
**Validates: Requirements 4.5**

**Property 8: Mode icon consistency**
*For any* game mode type, the system should display the correct thematic icon (snowflake for Cold Snap, moon for Night Raid, lightning for Electromagnetic Storm, bunker for Hidden Bunker, neutral for Normal)
**Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5**

**Property 9: Accessibility contrast compliance**
*For any* text or indicator element, the color contrast ratio should meet WCAG AA standards for accessibility
**Validates: Requirements 6.4**

**Property 10: Static operation independence**
*For any* application functionality, the system should operate without making external server requests or requiring server-side processing
**Validates: Requirements 7.4**

## Error Handling

### Timer Management Errors
- **Invalid Timer Values**: Handle negative or non-numeric timer values by defaulting to zero
- **Timer Overflow**: Prevent timers from exceeding maximum display values (99:59)
- **Mode Transition Failures**: Log errors if mode transitions fail and maintain current state

### Asset Loading Errors
- **Missing Background Image**: Display fallback background color if map image fails to load
- **Missing Mode Icons**: Use text fallbacks if icon assets are unavailable
- **CSS Loading Failures**: Ensure basic functionality with inline styles as backup

### Browser Compatibility Issues
- **JavaScript Disabled**: Display static content with message about enabling JavaScript
- **Unsupported Features**: Graceful degradation for older browsers
- **Performance Issues**: Throttle timer updates if performance degrades

## Testing Strategy

The application will use a dual testing approach combining unit tests for specific functionality and property-based tests for universal behaviors.

### Unit Testing Approach
Unit tests will verify specific examples and edge cases:
- Initial page load with correct map configuration
- Specific mode transitions (e.g., Space Port Night Raid to Normal)
- Timer display formatting for known values
- CSS class application for active/next mode states
- Accessibility compliance for specific color combinations

### Property-Based Testing Approach
Property-based tests will verify universal properties across all inputs using **fast-check** library for JavaScript:
- Each property-based test will run a minimum of 100 iterations
- Tests will generate random timer values, mode configurations, and map states
- Each test will be tagged with comments referencing the design document property

**Property Test Requirements:**
- Configure fast-check to run 100+ iterations per test
- Tag each test with format: `**Feature: game-map-display, Property {number}: {property_text}**`
- Generate smart test data that constrains to valid input spaces
- Focus on core logic validation without mocking

### Testing Framework Selection
- **Unit Tests**: Jest for JavaScript unit testing
- **Property-Based Tests**: fast-check library for property-based testing
- **DOM Testing**: jsdom for simulating browser environment in tests
- **Visual Regression**: Manual testing for visual design validation

The testing strategy prioritizes functional correctness through property-based testing while using unit tests to catch specific integration issues and edge cases.