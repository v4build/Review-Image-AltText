/**
 * @file popup.js
 * @description Manages the state of the toggle switch in the popup.
 * Saves the on/off state for each tab and injects scripts to
 * show or hide the alt text overlays accordingly.
 */
const toggleSwitch = document.getElementById('toggleSwitch');
const switchLabel = document.getElementById('switch-label');

// Get the current active tab to manage its state
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab || !activeTab.id) return;

    const tabId = activeTab.id;

    // Load the saved state for the current tab when the popup is opened
    chrome.storage.local.get([`tab_${tabId}`], (result) => {
        const isEnabled = result[`tab_${tabId}`] || false;
        toggleSwitch.checked = isEnabled;
        updateLabel(isEnabled);
    });

    // Add listener for when the switch is toggled
    toggleSwitch.addEventListener('change', () => {
        const isEnabled = toggleSwitch.checked;
        updateLabel(isEnabled);

        // Save the new state for the current tab
        chrome.storage.local.set({ [`tab_${tabId}`]: isEnabled });

        // Execute the appropriate script based on the new state
        if (isEnabled) {
            // Inject CSS first, then the content script to show overlays
            chrome.scripting.insertCSS({
                target: { tabId: tabId },
                files: ["styles.css"]
            }, () => {
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["content.js"]
                });
            });
        } else {
            // Execute script to hide overlays
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["hide.js"]
            });
        }
    });
});

/**
 * Updates the text label next to the switch.
 * @param {boolean} isEnabled - The current state of the switch.
 */
function updateLabel(isEnabled) {
    if (isEnabled) {
        switchLabel.textContent = 'Hide Alt Text';
    } else {
        switchLabel.textContent = 'Show Alt Text';
    }
}
