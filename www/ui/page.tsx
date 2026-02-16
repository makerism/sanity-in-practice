import * as Utils from '@/lib/utils';

type ContainerProps = React.PropsWithChildren<{
  className?: string;
}>;

export const Container: React.FC<ContainerProps> = (props) => {
  return (
    <div className={Utils.cx('max-w-site-container mx-auto px-gutter', props.className)}>
      {props.children}
    </div>
  );
};

export const NarrowContainer: React.FC<ContainerProps> = (props) => {
  return (
    <div className={Utils.cx('max-w-site-container-narrow mx-auto px-gutter', props.className)}>
      {props.children}
    </div>
  );
};

export const EditorialContainer: React.FC<ContainerProps> = (props) => {
  return (
    <div className={Utils.cx('max-w-site-container-editorial mx-auto px-gutter', props.className)}>
      {props.children}
    </div>
  );
};
