import { TComponentPropsWithClassName } from '../utils/models';
import { FC, useState } from 'react';

export const DEFAULT_IMAGE = 'https://www.mallofqatar.com.qa/placeholder-img.svg';

interface IImageProps extends TComponentPropsWithClassName {
  src: string;
  alt: string;
};

export const Image: FC<IImageProps> = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src || DEFAULT_IMAGE);
  const [error, setError] = useState(false);

  const handleImageError = (): void => {
    if (!error) {
      setImgSrc(DEFAULT_IMAGE);
      setError(true);
    }
  };

  return <img className={className} src={imgSrc} onError={handleImageError} alt={alt} />;
};
