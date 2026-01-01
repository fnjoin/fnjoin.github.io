# Calendar Matrix - Full Year Planning Tool

A powerful interactive calendar application that displays an entire year in a customizable matrix format, perfect for project planning, vacation scheduling, and pattern visualization.

## Core Features

### 📅 Full Year Matrix View

-   **Complete year display** - View all 365/366 days at once in a grid layout
-   **Customizable matrix** - Adjust days per row (7 = weekly, 14 = biweekly, 91 = quarterly)
-   **Visual day representation** - Each cell shows day number and month abbreviation
-   **Leap year detection** - Automatically handles leap years with proper day counts

### 🎯 Dual Selection Modes

#### Date Range Selection (Default)

-   **Sequential date selection** - Click and drag to select consecutive days
-   **Date-based logic** - Selects Jan 15-25 regardless of matrix position
-   **Perfect for** - Vacation periods, project timelines, event ranges

#### Matrix Position Selection (Shift + Drag)

-   **Geometric selection** - Hold Shift and drag to select by grid position
-   **Pattern-based logic** - Select 4 consecutive Mondays in a 7-day matrix
-   **Perfect for** - Recurring patterns, weekly schedules, matrix analysis
-   **Visual feedback** - "Matrix Selection Mode" indicator when Shift is held

### 🎨 Highlighting System

-   **Multiple highlight types**:
    -   **Row highlights** - Entire horizontal rows (hover row edge for + button)
    -   **Column highlights** - Entire vertical columns (hover day names for + button)
    -   **Date ranges** - Sequential day selections
    -   **Matrix selections** - Rectangular grid areas
-   **Color coding** - 7 distinct colors (Red, Blue, Green, Yellow, Purple, Pink, Orange)
-   **Comments** - Add notes and descriptions to any highlight
-   **Persistent highlights** - Maintain selections when changing matrix layout

### 📚 Multi-Calendar Management

-   **Multiple calendars** - Create separate calendars for different projects/years
-   **Calendar switching** - Click any calendar to load it instantly
-   **Rename calendars** - Edit names inline with click-to-edit functionality
-   **Delete calendars** - Remove unwanted calendars (protection against deleting last one)
-   **Calendar overview** - See highlight count and last updated date for each
-   **Independent data** - Each calendar has its own year, layout, and highlights

### 🔗 Shareable Links

-   **Generate share URLs** - Create links containing complete calendar data
-   **Base64 encoding** - Secure URL-safe encoding of calendar JSON
-   **One-click sharing** - Copy shareable link to clipboard with visual feedback
-   **Import handling** - Automatic detection and import of shared calendars
-   **Conflict resolution** - Prompt to overwrite existing calendars with same ID
-   **URL cleanup** - Remove share parameters after successful import

### 💾 Persistent Storage

-   **Browser localStorage** - All data automatically saved locally
-   **Session persistence** - Calendars survive page reloads and browser restarts
-   **Unique calendar IDs** - Each calendar gets a timestamp-based unique identifier
-   **Auto-save** - Changes saved immediately as you work
-   **Storage keys**:
    -   `calendar-builder-calendars` - Array of all calendar data
    -   `calendar-builder-current-id` - Currently active calendar ID

### 📋 Export Capabilities

-   **HTML table export** - Copy formatted calendar to clipboard
-   **Google Docs compatible** - Paste directly into Google Docs with colors preserved
-   **Inline CSS styling** - Colors and formatting maintained in export
-   **Comments included** - Highlights and comments section below calendar table
-   **Calendar metadata** - Includes calendar name and year in export

## User Interface

### Navigation & Management

-   **Calendar manager panel** - Toggle view of all calendars
-   **Current calendar info** - Shows active calendar name and statistics
-   **Action buttons**:
    -   **New** - Create new calendar
    -   **Manage** - Toggle calendar list
    -   **Share Calendar** - Generate shareable link
    -   **Copy to Clipboard** - Export as HTML table
    -   **Clear Highlights** - Remove all highlights from current calendar

### Interactive Elements

-   **Hover interactions** - + buttons appear on row/column edges
-   **Drag selection** - Visual preview of selection area
-   **Click-to-edit** - Rename calendars and edit comments inline
-   **Keyboard shortcuts** - Shift key for matrix selection mode
-   **Visual feedback** - Button state changes, hover effects, selection previews

### Responsive Design

-   **Mobile friendly** - Works on tablets and mobile devices
-   **Overflow handling** - Horizontal scroll for large matrices
-   **Flexible layout** - Adapts to different screen sizes
-   **Touch support** - Drag selection works with touch interfaces

## Technical Implementation

### Architecture

-   **Next.js App Router** - Server-side rendering for SEO
-   **Client components** - Interactive features run client-side
-   **TypeScript** - Full type safety throughout
-   **Tailwind CSS** - Utility-first styling
-   **Lucide React** - Consistent icon system

### Data Structure

```typescript
interface CalendarData {
    id: string; // Unique identifier
    name: string; // User-defined name
    year: number; // Calendar year
    daysPerRow: number; // Matrix layout (7, 14, 21, etc.)
    highlights: Highlight[]; // Array of highlights
    createdAt: number; // Creation timestamp
    updatedAt: number; // Last modification timestamp
}

interface Highlight {
    id: number; // Unique highlight ID
    type: "row" | "column" | "range" | "matrix";
    index: number | null; // Row/column index (if applicable)
    comment: string; // User comment
    color: Color; // Color scheme
    dayIndices: number[]; // Array of affected day numbers
    matrixCells?: number[]; // Matrix positions (for matrix type)
}
```

### Key Algorithms

-   **Matrix calculation** - Converts between day indices and grid positions
-   **Date range logic** - Handles leap years and month boundaries
-   **Selection algorithms** - Different logic for date vs. matrix selection
-   **Conflict detection** - Identifies calendar ID collisions during import
-   **Base64 encoding** - URL-safe calendar data serialization

## Use Cases

### Project Planning

-   **Sprint planning** - Highlight development cycles and milestones
-   **Resource allocation** - Visualize team availability and workload
-   **Deadline tracking** - Mark important dates and dependencies

### Personal Organization

-   **Vacation planning** - Block out time off and travel dates
-   **Habit tracking** - Mark recurring activities and patterns
-   **Event coordination** - Plan parties, meetings, and social events

### Business Applications

-   **Marketing campaigns** - Plan launch dates and promotional periods
-   **Seasonal planning** - Visualize busy periods and quiet times
-   **Compliance tracking** - Mark regulatory deadlines and requirements

### Educational Use

-   **Academic calendars** - Plan semesters, breaks, and exam periods
-   **Course scheduling** - Visualize class patterns and conflicts
-   **Research timelines** - Track project phases and deliverables

## Browser Compatibility

-   **Modern browsers** - Chrome, Firefox, Safari, Edge (latest versions)
-   **Clipboard API** - Required for copy/share functionality
-   **localStorage** - Required for data persistence
-   **Base64 support** - Built into all modern browsers
-   **Touch events** - Supported on mobile devices

## Future Enhancement Ideas

-   **Calendar templates** - Pre-built layouts for common use cases
-   **Import/export formats** - Support for .ics, CSV, JSON files
-   **Collaboration features** - Real-time sharing and editing
-   **Advanced patterns** - More complex selection algorithms
-   **Print optimization** - CSS print styles for physical calendars
-   **Keyboard navigation** - Full keyboard accessibility
-   **Undo/redo system** - Action history and reversal
-   **Search functionality** - Find highlights by comment text
-   **Calendar merging** - Combine multiple calendars
-   **Recurring events** - Automatic pattern generation

---

_Built with Next.js, TypeScript, and Tailwind CSS. Designed for modern browsers with localStorage support._
