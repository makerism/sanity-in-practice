import * as Types from '@/lib/types';

type TextImageProps = {
  key: string;
  section: Types.TextImageSection;
};

const TextImage: React.FC<TextImageProps> = (props) => {
  return (
    <section id={props.key} className="text-image">
      TextImage
    </section>
  );
};

export default TextImage;
