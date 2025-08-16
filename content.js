/**
 * @file content.js
 * @description This script is injected into the webpage to find all images
 * and iframes, and display their alt text or a relevant message.
 */

(function() {
    // A namespace to avoid conflicts with the host page's scripts.
    const altTextViewer = {
        overlayContainer: null,

        /**
         * Initializes the alt text viewer.
         * Removes any existing overlays and creates a new container.
         * Then, finds and processes all images and iframes.
         * Sets up event listeners for resize and scroll to keep overlays positioned correctly.
         */
        init: function() {
            this.removeOverlays(); // Clean up previous runs
            this.overlayContainer = document.createElement('div');
            this.overlayContainer.id = 'alt-text-viewer-container';
            document.body.appendChild(this.overlayContainer);

            this.processElements();

            // Reposition overlays on window resize or scroll for accuracy
            window.addEventListener('resize', this.debounce(this.processElements.bind(this), 200));
            window.addEventListener('scroll', this.debounce(this.processElements.bind(this), 200), true);
        },

        /**
         * Main function to find and process all images and iframes on the page.
         */
        processElements: function() {
            // Clear only the contents of the container, not the container itself
            if (this.overlayContainer) {
                this.overlayContainer.innerHTML = '';
            } else {
                // If container was removed for some reason, re-create it
                this.overlayContainer = document.createElement('div');
                this.overlayContainer.id = 'alt-text-viewer-container';
                document.body.appendChild(this.overlayContainer);
            }

            const images = document.getElementsByTagName('img');
            const iframes = document.getElementsByTagName('iframe');

            for (const img of images) {
                this.createImageOverlay(img);
            }

            for (const iframe of iframes) {
                this.createIframeOverlay(iframe);
            }
        },

        /**
         * Creates and displays an overlay for a single image element.
         * @param {HTMLImageElement} img - The image element to process.
         */
        createImageOverlay: function(img) {
            const rect = img.getBoundingClientRect();

            // Do not display for hidden or very small images
            if (rect.width < 1 || rect.height < 1) {
                return;
            }

            let altText;
            let messageType; // To potentially style them differently later

            if (img.hasAttribute('alt')) {
                const altAttr = img.getAttribute('alt');
                if (altAttr === '') {
                    altText = 'Review: Empty alt attribute';
                    messageType = 'empty';
                } else {
                    altText = `Alt text: "${altAttr}"`;
                    messageType = 'present';
                }
            } else {
                altText = 'Error: Missing alt text';
                messageType = 'missing';
            }
            
            this.createOverlay(rect, altText);
        },
        
        /**
         * Creates and displays an overlay for a single iframe element.
         * @param {HTMLIFrameElement} iframe - The iframe element to process.
         */
        createIframeOverlay: function(iframe) {
            const rect = iframe.getBoundingClientRect();
            if (rect.width < 1 || rect.height < 1) {
                return;
            }

            const link = document.createElement('a');
            link.href = iframe.src;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = 'iFrame CORS restriction: Open in new tab to review alt text';

            const content = document.createElement('div');
            content.appendChild(link);
            
            this.createOverlay(rect, content);
        },

        /**
         * Generic function to create a styled overlay div with content and a close button.
         * @param {DOMRect} rect - The position and dimensions for the overlay.
         * @param {string|HTMLElement} content - The text or HTML element to display in the overlay.
         */
        createOverlay: function(rect, content) {
            const overlay = document.createElement('div');
            overlay.className = 'alt-text-viewer-overlay';

            // Position the overlay at the top-left corner of the element
            overlay.style.top = `${window.scrollY + rect.top}px`;
            overlay.style.left = `${window.scrollX + rect.left}px`;
            
            const contentContainer = document.createElement('div');
            contentContainer.className = 'alt-text-viewer-overlay-content';
            if (typeof content === 'string') {
                contentContainer.textContent = content;
            } else {
                contentContainer.appendChild(content);
            }

            const closeBtn = document.createElement('button');
            closeBtn.className = 'alt-text-viewer-close-btn';
            closeBtn.innerHTML = '&times;'; // 'x' character
            closeBtn.onclick = () => overlay.remove();

            overlay.appendChild(contentContainer);
            overlay.appendChild(closeBtn);
            
            this.overlayContainer.appendChild(overlay);
        },

        /**
         * Removes all overlays created by this script.
         */
        removeOverlays: function() {
            const existingContainer = document.getElementById('alt-text-viewer-container');
            if (existingContainer) {
                existingContainer.remove();
            }
        },

        /**
         * Debounce utility to limit the rate at which a function gets called.
         * @param {Function} func - The function to debounce.
         * @param {number} delay - The debounce delay in milliseconds.
         * @returns {Function} - The debounced function.
         */
        debounce: function(func, delay) {
            let timeout;
            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), delay);
            };
        }
    };

    // Run the initializer
    altTextViewer.init();

})();
