import * as Paths from '@/lib/paths';

import NextLink from 'next/link';

export type Props = React.PropsWithChildren<
  {
    className?: string;
  } & (LinkProps | SanityLink)
>;

type LinkProps = {
  href: HTMLAnchorElement['href'];
  target?: HTMLAnchorElement['target'];
};

type SanityLink = {
  link: {
    reference?: {
      _type: string;
      slug: {
        current: string;
      };
    } | null;
    href?: string;
    openInNewTab?: boolean;
  };
};

const Link: React.FC<Props> = (props) => {
  const getTarget = () => {
    if ('link' in props) {
      if (props.link.openInNewTab === true) return '_blank';
      if (props.link.openInNewTab === false) return '_self';
      if (!!props.link.reference) return '_self';
      if (props.link.href && props.link.href.startsWith('/')) return '_self';
      return '_blank';
    }
    if ('target' in props && props.target !== undefined) return props.target;
    return undefined;
  };

  if ('link' in props && !!props.link.reference) {
    return (
      <NextLink
        href={Paths.forEntity(props.link.reference)}
        target={getTarget()}
        className={props.className}
      >
        {props.children}
      </NextLink>
    );
  }

  if ('link' in props && !!props.link.href) {
    return (
      <NextLink href={props.link.href} target={getTarget()} className={props.className}>
        {props.children}
      </NextLink>
    );
  }

  if ('href' in props && props.href !== undefined) {
    return (
      <NextLink href={props.href} target={getTarget()} className={props.className}>
        {props.children}
      </NextLink>
    );
  }

  throw new Error(`[Link] Unknown link type: ${JSON.stringify(props)}`);
};

export default Link;
