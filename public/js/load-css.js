function loadCSS(filePath) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = filePath;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS: ${filePath}`));
    document.head.appendChild(link);
  });
}