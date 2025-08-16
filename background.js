/**
 * @file background.js
 * @description Listens for tab updates to automatically inject the alt text
 * viewer script on page loads if it was previously enabled for that tab.
 */

// Listen for when a tab is updated (e.g., new page loaded)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the tab has finished loading and has a URL that the extension can run on
    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
        // Check the saved state for this tab
        chrome.storage.local.get([`tab_${tabId}`], (result) => {
            const isEnabled = result[`tab_${tabId}`] || false;

            // If the toggle is enabled for this tab, inject the scripts
            if (isEnabled) {
                chrome.scripting.insertCSS({
                    target: { tabId: tabId },
                    files: ["styles.css"]
                }, () => {
                    // Check for errors from CSS injection, like if the page is protected
                    if (chrome.runtime.lastError) {
                        console.warn(`Could not inject CSS into tab ${tabId}: ${chrome.runtime.lastError.message}`);
                        return;
                    }
                    
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        files: ["content.js"]
                    });
                });
            }
        });
    }
});
