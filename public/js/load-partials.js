function loadMultipleContentPlaceholders(container) {
  // Find content placeholders
  const placeholders = container.querySelectorAll('.content-placeholder');
  
  placeholders.forEach(placeholder => {
    // Get the content file path
    const contentFile = placeholder.getAttribute('data-file');
    if (contentFile) {
      // Fetch and load content into the placeholder
      fetch(contentFile)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error loading content from ${contentFile}`);
          }
          return response.text();
        })
        .then(content => {
          placeholder.innerHTML = content;
        })
        .catch(error => {
          console.error('Error loading content:', error);
        });
    }
  });
}

function loadPartial(elementId, filePath, contentPath) {
  // Fetch the partial HTML file
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
        // Set the inner HTML
        element.innerHTML = html;
        // Load single content file if provided
        if (contentPath) {
          fetch(contentPath)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Error loading content from ${contentPath}`);
              }
              return response.text();
            })
            .then(content => {
              const placeholder = element.querySelector('.content-placeholder');
              if (placeholder) {
                placeholder.innerHTML = content;
              }
            })
            .catch(error => {
              console.error('Error loading content:', error);
            });
        }
        loadMultipleContentPlaceholders(element);
      } else {
        console.error(`Element with id "${elementId}" not found.`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Load all partials when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  loadPartial('header', 'partials/common/header.html');
  loadPartial('assessment', 'partials/sections/assessment.html');
  loadPartial('project-intro', 'partials/sections/project-intro.html');
  loadPartial('code-review', 'partials/sections/code-review.html');
  loadPartial('links', 'partials/sections/links.html');
  loadPartial('narratives', 'partials/sections/narratives.html');
  loadPartial('details', 'partials/sections/details.html');
  loadPartial('future', 'partials/sections/future.html');
  loadPartial('footer', 'partials/common/footer.html');
});
