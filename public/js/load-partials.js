function loadPartial(elementId, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error loading ${filePath}`);
      }
      return response.text();
    })
    .then(html => {
      const element = document.getElementById(elementId);
      if (element) {
          element.innerHTML = html;
      } else {
          console.error(`Element with id "${elementId}" not found.`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// When the DOM is fully loaded, load all partials
document.addEventListener('DOMContentLoaded', function() {
  loadPartial('header', 'partials/common/header.html');
  loadPartial('assessment', 'partials/sections/assessment.html');
  loadPartial('project-intro', 'partials/sections/project-intro.html');
  loadPartial('links', 'partials/sections/links.html');
  loadPartial('narratives', 'partials/sections/narratives.html');
  loadPartial('details', 'partials/sections/details.html');
  loadPartial('future', 'partials/sections/future.html');
  loadPartial('footer', 'partials/common/footer.html');
});
