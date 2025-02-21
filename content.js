let processedImages = new WeakSet(); // Keep track of processed images

function displayAltText() {
  const images = document.querySelectorAll('img');

  images.forEach(img => {
    if (!processedImages.has(img)) { // Check if the image has already been processed
      processedImages.add(img); // Mark the image as processed

      const altText = img.alt;
      const div = document.createElement('div');
      div.style.fontSize = "small";
      div.style.marginTop = "10px";
      div.style.paddingTop = "5px";

      let message = "";

      if (altText === null || altText === undefined) {
        message = "MISSING ALT TEXT";
        div.style.color = "red";
        div.style.fontWeight = "bold";
      } else if (altText.trim() === "") {
        message = "Decorative image?";
        div.style.color = "red";
        div.style.fontWeight = "bold";
      } else {
        message = "ALT TEXT: " + altText;
        div.style.color = "blue";
      }

      div.textContent = message;
      img.parentNode.insertBefore(div, img.nextSibling);
    }
  });
}

displayAltText(); // Initial run

const observer = new MutationObserver(displayAltText);
observer.observe(document.body, { childList: true, subtree: true });