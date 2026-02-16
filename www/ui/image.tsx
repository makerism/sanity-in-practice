import * as Sanity from '@/lib/sanity';
import * as Types from '@/lib/types';

import NextImage from 'next/image';

type ImageBaseProps = Omit<
  React.ComponentProps<typeof NextImage>,
  'src' | 'alt' | 'width' | 'height'
>;

type ImageProps = {
  image: {
    _type: 'image' | 'richImage';
    asset?: Types.Sanity.SanityImageAsset | null;
    hotspot?: Types.Sanity.SanityImageHotspot;
    crop?: Types.Sanity.SanityImageCrop;
  };
} & ImageBaseProps;

export const Image: React.FC<ImageProps> = (props) => {
  if (!props.image.asset) throw new Error('Image asset is required');

  const url = Sanity.urlForImage(props.image.asset);

  return (
    <NextImage
      {...props}
      src={url.toString()}
      alt={props.image.asset.altText ?? 'Image'}
      width={props.image.asset.metadata!.dimensions!.width}
      height={props.image.asset.metadata!.dimensions!.height}
    />
  );
};

export default Image;
