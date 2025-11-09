/**
 * Utility functions for downloading images from the application
 */

/**
 * Downloads a static image file
 * @param imageUrl - URL or path to the image
 * @param filename - Name for the downloaded file
 */
export function downloadImage(imageUrl: string, filename: string = 'elevator-system.png'): void {
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = filename;
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Downloads the current view as a screenshot
 * @param elementId - ID of the element to capture (default: 'root')
 * @param filename - Name for the downloaded file
 */
export async function downloadScreenshot(
  elementId: string = 'root',
  filename: string = 'elevator-screenshot.png'
): Promise<void> {
  try {
    // Dynamically import html2canvas only when needed
    const html2canvas = (await import('html2canvas')).default;
    
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id "${elementId}" not found`);
      return;
    }

    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      backgroundColor: '#1a202c',
      scale: 2, // Higher quality
      logging: false,
    });

    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        downloadImage(url, filename);
        URL.revokeObjectURL(url); // Clean up
      }
    });
  } catch (error) {
    console.error('Failed to capture screenshot:', error);
    alert('Failed to download screenshot. Please try again.');
  }
}

/**
 * Downloads a data URL as an image
 * @param dataUrl - Data URL of the image
 * @param filename - Name for the downloaded file
 */
export function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

