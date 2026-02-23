'use client';

import * as Types from '@/lib/types';
import * as Text from '@/ui/text';

import Link from '@/ui/link';
import Image from '@/ui/image';

import * as Pt from '@portabletext/react';

type RichTextProps = {
  value: Types.RichText;
};

/*
A link in a rich-text block... sorry for this type 😵
*/
type RichTextLink = Extract<
  NonNullable<Extract<Types.RichText[number], { _type: 'block' }>['markDefs']>[number],
  { _type: 'link' }
>;

type RichTextImage = Extract<Types.RichText[number], { _type: 'richImage' }>;

const ANCHOR_CLASSES =
  'hover:text-muted before:content-["#"] relative cursor-pointer before:absolute before:-left-6 before:flex before:items-center before:text-muted before:opacity-0 hover:before:opacity-100 before:transition-opacity scroll-mt-[calc(var(--spacing-nav-height)+1.5rem)] data-copied:before:content-["✓"] transition-colors';

const copyAnchorLink = (e: React.MouseEvent<HTMLElement>, name?: string) => {
  if (!name) return;
  const url = `${window.location.origin}${window.location.pathname}#${name}`;
  navigator.clipboard.writeText(url);
  const el = e.currentTarget;
  el.setAttribute('data-copied', '');
  setTimeout(() => el.removeAttribute('data-copied'), 1000);
};

const RichText: React.FC<RichTextProps> = (props) => {
  return (
    <div className="rich-text">
      <Pt.PortableText value={props.value} components={Components} />
    </div>
  );
};

const Components: Partial<Pt.PortableTextReactComponents> = {
  block: {
    normal: (props) => {
      return <Text.Body>{props.children}</Text.Body>;
    },
    h1: (props) => {
      return (
        <Text.Heading
          as="h1"
          id={props.value._key}
          className={ANCHOR_CLASSES}
          onClick={(e: React.MouseEvent<HTMLElement>) => copyAnchorLink(e, props.value._key)}
        >
          {props.children}
        </Text.Heading>
      );
    },
    h2: (props) => {
      return (
        <Text.Subheading
          as="h2"
          id={props.value._key}
          className={ANCHOR_CLASSES}
          onClick={(e: React.MouseEvent<HTMLElement>) => copyAnchorLink(e, props.value._key)}
        >
          {props.children}
        </Text.Subheading>
      );
    },
    h3: (props) => {
      return (
        <Text.Paragraph
          as="h3"
          id={props.value._key}
          className={ANCHOR_CLASSES}
          onClick={(e: React.MouseEvent<HTMLElement>) => copyAnchorLink(e, props.value._key)}
        >
          {props.children}
        </Text.Paragraph>
      );
    },
    h4: (props) => {
      return <Text.Body bold>{props.children}</Text.Body>;
    },
  },
  list: {
    bullet: (props) => {
      return <ul>{props.children}</ul>;
    },
    number: (props) => {
      return <ol>{props.children}</ol>;
    },
  },
  types: {
    richImage: (props: Pt.PortableTextComponentProps<RichTextImage>) => {
      if (!props.value) throw new Error('Image value is required');
      return <Image image={props.value} className="image aspect-4/3 w-full object-cover" />;
    },
  },
  marks: {
    em: (props) => {
      return <em>{props.children}</em>;
    },
    strong: (props) => {
      return <strong>{props.children}</strong>;
    },
    link: (props: Pt.PortableTextMarkComponentProps<RichTextLink>) => {
      if (!props.value) throw new Error('Link value is required');
      return <Link link={props.value}>{props.children}</Link>;
    },
  },
};

export default RichText;
