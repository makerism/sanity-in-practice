import * as Types from '@/lib/types';
import * as Text from '@/ui/text';

import Image from '@/ui/image';

type FullWidthImageProps = {
  key: string;
  section: Types.FullWidthImageSection;
};

const FullWidthImage: React.FC<FullWidthImageProps> = (props) => {
  return (
    <section id={props.key} className="@container full-width-image relative px-gutter">
      <div className="absolute inset-0 bg-background/50 z-10 flex flex-col items-center justify-center px-gutter text-center">
        <div className="max-w-site-container-editorial mx-auto">
          <Text.Heading>{props.section.heading}</Text.Heading>
          <Text.Subheading>{props.section.subheading}</Text.Subheading>
        </div>
      </div>
      <div className="relative aspect-square @md:aspect-video">
        <Image image={props.section.image} className="h-full w-full object-cover " />
      </div>
    </section>
  );
};

export default FullWidthImage;
