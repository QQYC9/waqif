/**
 * Helper function to get the correct image URL
 * Handles both uploaded images from backend and local images
 */
export const getImageUrl = (imagePath: string | undefined | null): string => {
  // Return placeholder if no image path
  if (!imagePath) {
    return '/images/placeholder.jpg';
  }
  
  // If it's an uploaded image from backend (starts with /uploads)
  if (imagePath.startsWith('/uploads')) {
    // Get backend URL from environment or use default
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const backendUrl = apiUrl.replace('/api', '');
    return `${backendUrl}${imagePath}`;
  }
  
  // If it's already a full URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a local image path
  return imagePath;
};
