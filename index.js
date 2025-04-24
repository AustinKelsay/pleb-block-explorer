// This is our Bitcoin Block Explorer script
// It fetches information about Bitcoin blocks and displays them

// Wait for the DOM (Document Object Model) to be fully loaded before running our code
document.addEventListener("DOMContentLoaded", function() {
    // ---- STEP 1: Get references to HTML elements we'll need to work with ----
    const loadingElement = document.getElementById("loading");          // Loading message
    const blockDataElement = document.getElementById("block-data");     // Container for block data
    const refreshButton = document.getElementById("refresh-button");    // Button to fetch latest block
    const prevBlockButton = document.getElementById("prev-block-button"); // Button for previous block
    const nextBlockButton = document.getElementById("next-block-button"); // Button for next block
    const rawDataButton = document.getElementById("raw-data-button");   // Button to show/hide raw data
    const rawDataContainer = document.getElementById("raw-data-container"); // Container for raw data
    const rawDataContent = document.getElementById("raw-data-content"); // Pre element for raw JSON

    // ---- STEP 2: Set up variables to track state ----
    let currentBlockHeight = 0;     // Current block being displayed
    let latestBlockHeight = 0;      // Latest block in the blockchain
    let currentBlockData = null;    // Current block data object (for raw data display)

    // ---- STEP 3: Define our helper functions ----

    // Function to update the date and time display
    function updateDateTime() {
        // Get the element where we'll show the date/time
        const dateTimeElement = document.getElementById("datetime");
        // Create a string with the current date and time
        const currentDateTime = new Date().toLocaleString();
        // Update the element's text to show the current date/time
        dateTimeElement.textContent = currentDateTime;
    }

    // Function to toggle the raw data display
    function toggleRawData() {
        if (rawDataContainer.classList.contains("hidden")) {
            // Show raw data
            rawDataContainer.classList.remove("hidden");
            rawDataButton.textContent = "Hide Raw Block Data";
            
            // Format and display the raw JSON data
            if (currentBlockData) {
                // Convert the JavaScript object to a formatted JSON string
                // The null, 2 parameters add proper indentation for readability
                rawDataContent.textContent = JSON.stringify(currentBlockData, null, 2);
            } else {
                rawDataContent.textContent = "No block data available";
            }
        } else {
            // Hide raw data
            rawDataContainer.classList.add("hidden");
            rawDataButton.textContent = "Show Raw Block Data";
        }
    }

    // Function to update navigation button states
    function updateNavigationButtons() {
        // Disable the Previous Block button if we're at block 0 (genesis block)
        prevBlockButton.disabled = (currentBlockHeight <= 0);
        
        // Disable the Next Block button if we're at the latest block
        nextBlockButton.disabled = (currentBlockHeight >= latestBlockHeight);
    }

    // Function to update the UI with block data
    function updateBlockDisplay(blockData) {
        // Block height (number of blocks in the blockchain)
        document.getElementById("block-height").textContent = blockData.height;
        
        // Block hash (unique identifier for this block)
        document.getElementById("block-hash").textContent = blockData.id;
        
        // Convert Unix timestamp to readable date
        // Bitcoin timestamps are in seconds, JavaScript uses milliseconds
        const blockDate = new Date(blockData.timestamp * 1000);
        document.getElementById("block-timestamp").textContent = blockDate.toLocaleString();
        
        // Number of transactions in this block
        document.getElementById("tx-count").textContent = blockData.tx_count;
        
        // Size of the block in kilobytes (converting from bytes)
        const sizeInKB = (blockData.size / 1024).toFixed(2);
        document.getElementById("block-size").textContent = `${sizeInKB} KB`;
        
        // Weight is a measure used in Bitcoin to calculate transaction fees
        document.getElementById("block-weight").textContent = blockData.weight.toLocaleString();
        
        // Information about who mined this block (if available)
        let minerInfo = "Unknown";
        if (blockData.extras && blockData.extras.coinbaseRaw) {
            // The coinbase transaction often contains information about the miner
            minerInfo = "Available in coinbase data";
        }
        document.getElementById("miner").textContent = minerInfo;
        
        // Show the block data and hide the loading message
        loadingElement.classList.add("hidden");
        blockDataElement.classList.remove("hidden");
    }

    // ---- STEP 4: Define functions for fetching data from the API ----

    // Function to fetch data for a specific block height
    async function fetchBlockByHeight(height) {
        // Show loading message and hide the block data while we're fetching
        loadingElement.classList.remove("hidden");
        blockDataElement.classList.add("hidden");
        loadingElement.textContent = `Loading data for block #${height}...`;
        
        try {
            // Get the block hash for this height
            const hashResponse = await fetch(`https://mempool.space/api/block-height/${height}`);
            if (!hashResponse.ok) {
                throw new Error(`Hash API responded with status: ${hashResponse.status}`);
            }
            
            const blockHash = await hashResponse.text();
            console.log(`Block #${height} hash:`, blockHash);
            
            // Get the block details using the hash
            const blockResponse = await fetch(`https://mempool.space/api/block/${blockHash}`);
            if (!blockResponse.ok) {
                throw new Error(`Block API responded with status: ${blockResponse.status}`);
            }
            
            // Get the raw text and parse it as JSON
            const rawData = await blockResponse.text();
            let blockData;
            
            try {
                blockData = JSON.parse(rawData);
            } catch (parseError) {
                throw new Error(`Failed to parse JSON: ${parseError.message}`);
            }
            
            console.log(`Block #${height} data:`, blockData);
            
            // Update our tracking variables
            currentBlockData = blockData;
            currentBlockHeight = height;
            
            // Update the UI with the block information
            updateBlockDisplay(blockData);
            
            // If raw data is visible, update it with new block data
            if (!rawDataContainer.classList.contains("hidden")) {
                rawDataContent.textContent = JSON.stringify(blockData, null, 2);
            }
            
            // Update navigation buttons based on new position
            updateNavigationButtons();
            
        } catch (error) {
            // If anything goes wrong, show an error message
            console.error(`Error fetching block #${height}:`, error);
            loadingElement.textContent = `Error loading block data: ${error.message}. Please try again.`;
        }
    }

    // Function to fetch the latest Bitcoin block data from the mempool.space API
    async function fetchLatestBlockData() {
        // Show loading message and hide the block data while we're fetching
        loadingElement.classList.remove("hidden");
        blockDataElement.classList.add("hidden");
        loadingElement.textContent = "Loading latest block data...";
        
        try {
            // The API URL that returns a list of recent blocks
            const blocksUrl = "https://mempool.space/api/v1/blocks";
            console.log("Fetching data from:", blocksUrl);
            
            // Use the fetch API to get data from the URL
            // This is an asynchronous operation (we use 'await' to wait for it to complete)
            const response = await fetch(blocksUrl);
            
            // Check if the fetch was successful
            if (!response.ok) {
                throw new Error(`API responded with status: ${response.status}`);
            }
            
            // Get the text content of the response
            const responseText = await response.text();
            
            // Parse the JSON data
            let blocks;
            try {
                // Convert the text response to a JavaScript object
                blocks = JSON.parse(responseText);
                console.log("Data received from API:", blocks);
            } catch (parseError) {
                // If there's an error parsing the JSON, log it and throw an error
                console.error("Failed to parse JSON:", responseText.substring(0, 200));
                throw new Error(`Failed to parse JSON: ${parseError.message}`);
            }
            
            // Check if we got any blocks back
            if (!Array.isArray(blocks) || blocks.length === 0) {
                throw new Error("No blocks returned from API");
            }
            
            // The first block in the array is the most recent one
            const latestBlock = blocks[0];
            console.log("Latest block data:", latestBlock);
            
            // Update our tracking variables
            latestBlockHeight = latestBlock.height;
            currentBlockHeight = latestBlock.height;
            currentBlockData = latestBlock;
            
            // Update the UI with block information
            updateBlockDisplay(latestBlock);
            
            // If raw data is visible, update it with new block data
            if (!rawDataContainer.classList.contains("hidden")) {
                rawDataContent.textContent = JSON.stringify(latestBlock, null, 2);
            }
            
            // Update navigation buttons
            updateNavigationButtons();
            
        } catch (error) {
            // If anything goes wrong during the process, show an error message
            console.error("Error fetching block data:", error);
            loadingElement.textContent = `Error loading block data: ${error.message}. Please try again.`;
        }
    }
    
    // ---- STEP 5: Set up event listeners for user interactions ----
    
    // When the refresh button is clicked, fetch the latest block data
    refreshButton.addEventListener("click", fetchLatestBlockData);
    
    // When the previous block button is clicked, go back one block
    prevBlockButton.addEventListener("click", function() {
        if (currentBlockHeight > 0) {
            fetchBlockByHeight(currentBlockHeight - 1);
        }
    });
    
    // When the next block button is clicked, go forward one block
    nextBlockButton.addEventListener("click", function() {
        if (currentBlockHeight < latestBlockHeight) {
            fetchBlockByHeight(currentBlockHeight + 1);
        }
    });
    
    // When the raw data button is clicked, toggle the raw data display
    rawDataButton.addEventListener("click", toggleRawData);

    // ---- STEP 6: Initialize the application ----
    // Get the initial block data
    fetchLatestBlockData();
    
    // Show the current date and time
    updateDateTime();
    
    // Update the date and time display every second
    setInterval(updateDateTime, 1000);
});
