import * as Page from '@/ui/page';
import * as Types from '@/lib/types';
import * as Text from '@/ui/text';

import Image from '@/ui/image';

type CenteredImageProps = {
  key: string;
  section: Types.CenteredImageSection;
};

const CenteredImage: React.FC<CenteredImageProps> = (props) => {
  return (
    <section id={props.key} className="centered-image pt-head">
      <Page.EditorialContainer>
        <div className="text-center mx-auto max-w-[400px]">
          <Text.Heading>{props.section.heading}</Text.Heading>
          {props.section.subheading && (
            <Text.Subheading className="mt-1 text-muted">
              {props.section.subheading}
            </Text.Subheading>
          )}
        </div>
        <div className="pt-6 relative aspect-4/3">
          <Image image={props.section.image} className="h-full w-full object-cover" />
        </div>
        <div className="mt-1">
          <Text.Detail>{props.section.heading}</Text.Detail>
        </div>
      </Page.EditorialContainer>
    </section>
  );
};

export default CenteredImage;
