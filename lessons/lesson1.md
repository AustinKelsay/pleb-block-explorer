# Lesson 1: HTML Foundations & Block Explorer Structure

## Lesson Overview
In this first lesson, we'll lay the groundwork for our Bitcoin Block Explorer by creating the basic HTML structure. We'll focus on building a semantic and accessible foundation that will later be enhanced with CSS and JavaScript.

## Learning Objectives
- Understand the purpose and structure of a block explorer
- Create a well-structured HTML document using semantic elements
- Set up containers and placeholders for block data
- Establish a foundation for future styling and functionality

## Bitcoin Block Explorer Concepts
- What is a block explorer and why is it useful?
- Overview of Bitcoin block data (height, hash, timestamp, etc.)
- How block explorers help visualize the blockchain

## What We'll Build Today
We'll create the basic HTML structure for our block explorer, including:
1. Header with title
2. Container for current date/time
3. Loading message section
4. Block data display area with placeholders for:
   - Block height
   - Block hash
   - Timestamp
   - Transaction count
   - Size
   - Weight
   - Miner information
5. Placeholder for navigation buttons (to be implemented later)

## Step-by-Step Implementation

### 1. Set Up the Basic HTML Document
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bitcoin Pleb Block Explorer</title>
</head>
<body>
    <!-- Content will go here -->
</body>
</html>
```

### 2. Create the Main Container
```html
<div class="container">
    <h1>Bitcoin Pleb Block Explorer</h1>
    
    <!-- Date/time and content will go here -->
</div>
```

### 3. Add Date/Time Display and Loading Message
```html
<div id="datetime"></div>

<div id="loading" class="loading">
    Loading latest block data...
</div>
```

### 4. Create Block Data Structure
```html
<div id="block-data" class="hidden">
    <div class="block-info">
        <div class="info-row">
            <div class="info-label">Block Height:</div>
            <div id="block-height" class="info-value">-</div>
        </div>
        <!-- Add more info rows for other block properties -->
    </div>
</div>
```

### 5. Complete the Block Information Rows
Add rows for hash, timestamp, transaction count, size, weight, and miner information.

### 6. Add Button Placeholders
```html
<button id="refresh-button">Refresh Block Data</button>
```

## Key Takeaways
- The structure of HTML documents forms the foundation of web applications
- Semantic HTML improves accessibility and makes the code more readable
- Using IDs and classes effectively helps with styling and JavaScript manipulation
- Proper planning of the HTML structure makes subsequent development easier

## Preview of Next Lesson
In Lesson 2, we'll style our block explorer using CSS to make it visually appealing and user-friendly.

## Complete Code After This Lesson

Here's the complete HTML file after implementing all steps in this lesson:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bitcoin Pleb Block Explorer</title>
</head>
<body>
    <div class="container">
        <h1>Bitcoin Pleb Block Explorer</h1>
        
        <div id="datetime"></div>
        
        <div id="loading" class="loading">
            Loading latest block data...
        </div>
        
        <div id="block-data" class="hidden">
            <div class="block-info">
                <div class="info-row">
                    <div class="info-label">Block Height:</div>
                    <div id="block-height" class="info-value">-</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Block Hash:</div>
                    <div id="block-hash" class="info-value">-</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Timestamp:</div>
                    <div id="block-timestamp" class="info-value">-</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Transaction Count:</div>
                    <div id="tx-count" class="info-value">-</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Size (KB):</div>
                    <div id="block-size" class="info-value">-</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Weight:</div>
                    <div id="block-weight" class="info-value">-</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Mined By:</div>
                    <div id="miner" class="info-value">-</div>
                </div>
            </div>
            
            <button id="refresh-button">Latest Block</button>
        </div>
    </div>
</body>
</html>
```

At this point, we have only created the HTML structure with no styling or functionality. In the next lesson, we'll add CSS to make it look nice. 