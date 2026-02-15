import * as Types from '@/lib/types';

type CenteredImageProps = {
  key: string;
  section: Types.CenteredImageSection;
};

const CenteredImage: React.FC<CenteredImageProps> = (props) => {
  return (
    <section id={props.key} className="centered-image">
      CenteredImage
    </section>
  );
};

export default CenteredImage;
