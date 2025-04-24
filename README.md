# Bitcoin Pleb Block Explorer

A simple, educational Bitcoin block explorer that fetches and displays information about Bitcoin blocks using the mempool.space API.

## Project Overview

This application allows users to:
- View details about the latest Bitcoin block
- Navigate through the blockchain to explore previous blocks
- See raw JSON data for each block
- Refresh to get the most recent block data

## Live Demo

Open `index.html` in your browser to see the application in action.

## Project Structure

- `index.html` - The HTML structure and CSS styles
- `index.js` - JavaScript code that handles data fetching and UI updates

## Implementation Guide

Follow these steps to build the application from scratch:

### Step 1: Create the Basic HTML Structure

1. Set up the HTML document with proper meta tags
2. Create containers for:
   - Page title
   - Date/time display
   - Loading message
   - Block data display
   - Navigation buttons

### Step 2: Add CSS Styling

1. Style the main container and background
2. Format the block information rows
3. Style buttons with proper hover and disabled states
4. Create styles for the raw data display

### Step 3: Initialize JavaScript Setup

1. Set up the event listener for DOM content loaded
2. Get references to all the HTML elements needed
3. Define variables to track state (current block height, latest block height)

### Step 4: Create UI Helper Functions

1. Implement `updateDateTime()` to show the current time
2. Create `toggleRawData()` to show/hide raw block data
3. Add `updateNavigationButtons()` to enable/disable navigation buttons
4. Build `updateBlockDisplay()` to show block data in the UI

### Step 5: Implement Data Fetching

1. Create `fetchLatestBlockData()` to get the most recent block
2. Implement `fetchBlockByHeight()` to get a specific block
3. Add proper error handling for API requests
4. Parse and process the JSON responses

### Step 6: Set Up Event Listeners

1. Add click handler for the "Latest Block" button
2. Set up navigation with "Previous Block" and "Next Block" buttons
3. Implement the raw data toggle button
4. Initialize the application with data

## Key Features

### Block Navigation

The application allows users to navigate through the blockchain:
- The "Previous Block" button goes back one block
- The "Next Block" button advances one block (if not at the latest)
- The "Latest Block" button jumps to the most recent block

### Raw Data Display

Users can see the complete API response for educational purposes:
- Toggle raw data visibility with the "Show/Hide Raw Block Data" button
- Data is formatted as indented JSON for readability
- A scrollable container allows viewing large JSON objects

### Real-time Updates

- The current date and time are updated every second
- Block data can be refreshed by clicking the "Latest Block" button

## API Endpoints Used

The application uses these endpoints from mempool.space:
1. `https://mempool.space/api/v1/blocks` - Get recent blocks
2. `https://mempool.space/api/block-height/{height}` - Get block hash by height
3. `https://mempool.space/api/block/{hash}` - Get detailed block data

## Learning Concepts

This project demonstrates several important programming concepts:
- Asynchronous JavaScript (async/await, Promises)
- API requests using fetch
- DOM manipulation
- JSON parsing and display
- Error handling
- Event listeners
- State management
- Conditional rendering

## Future Enhancements

Possible features to add:
1. Transaction list display
2. Block reward calculation
3. Time-ago format (e.g., "mined 10 minutes ago")
4. Mining difficulty visualization
5. Mempool information

---
