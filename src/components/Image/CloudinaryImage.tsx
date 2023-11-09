import React from 'react';

interface ImageProps {
  url: string;
  width: number;
  height?: number;
  alt?: string;
}

const CloudinaryImage: React.FC<ImageProps> = ({ url, width, height, alt }) => {
  const cloudinaryUrl = `https://res.cloudinary.com/combariza/image/upload/w_${width},h_${height},c_limit/${encodeURIComponent(url.replace(/^https?:\/\//, ''))}`;

  return <img src={cloudinaryUrl} alt={alt} style={{ maxWidth: '100%', height: 'auto' }} />;
};

export { CloudinaryImage };
