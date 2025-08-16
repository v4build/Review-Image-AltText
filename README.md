# Review Alt Text
This tool is designed to help web developers, content creators, and accessibility testers quickly see the alternative text (alt text) for images on a webpage.

## What It Does
The primary goal of this extension is to make invisible alt text visible. When activated, it scans the current webpage and displays an overlay on top of every image and iFrame, showing the following information:

- For Images with Alt Text: It displays the exact alt text provided (e.g., Alt: "A majestic lion resting in the savanna."). This helps you verify that the description is accurate and helpful.

- For Images with an Empty Alt Attribute (alt=""): It displays the message: "Alt attribute is empty. Is the image decorative?". An empty alt attribute is used to tell screen readers to ignore an image, which is appropriate for purely decorative images. This message serves as a reminder to confirm the image's purpose.

- For Images Missing an Alt Attribute: It displays "Missing alt text". This is an accessibility issue, as it provides no information to users of assistive technology.

- For iFrames: Because the content of an iFrame is a separate document, the extension cannot scan it directly for security reasons. Instead, it displays a link: "Open iFrame in new tab to view alt text of images". Clicking this will open the iFrame's content in a new tab, where you can then activate the extension again.

Each overlay has a small '×' button that allows you to close it individually.

## Privacy Policy - Review Alt Text

Last updated: 16th Aug, 2025 (minor edits)

This Privacy Policy describes how the <strong><a href="https://chromewebstore.google.com/detail/review-image-alt-text/lgbpecaalejnpibeemnpellkiofhgpak" target="_blank">Review Image Alt Text</a></strong> Chrome extension collects, uses, and protects your information. We are committed to protecting your privacy and ensuring transparency in our data practices.

### Information Collection and Use
We do not collect any personal data from you. This Extension operates entirely locally within your Chrome browser. It does not transmit any information to external servers or services. The Extension only processes the HTML content of the currently active tab within your browser to identify and display image alt text. This processing happens in real-time and entirely within your browser. No data is stored or transmitted. Specifically, we do not collect:
- Your browsing history
- Information from the web pages you visit
- Your IP address or location

### Data Storage
The Extension does not store any user data. All processing is temporary and occurs only while you are using the Extension on a specific webpage. Once you close the tab or disable the Extension, any processed data is immediately discarded.

### Changes to this Privacy Policy
We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised “Effective Date.” We encourage you to review this Privacy Policy periodically.
