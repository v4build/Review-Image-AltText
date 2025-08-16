/**
 * @file hide.js
 * @description This script is injected into the webpage to remove all
 * alt text overlays created by the extension.
 */
(function() {
    // Find the main container for all overlays by its unique ID
    const overlayContainer = document.getElementById('alt-text-viewer-container');

    // If the container exists, remove it from the page
    if (overlayContainer) {
        overlayContainer.remove();
    }
})();
