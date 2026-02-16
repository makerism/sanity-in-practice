import * as Text from '@/ui/text';

import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="flex items-center justify-center gap-x-8 h-nav-height sticky top-0 z-10 backdrop-blur-xs border-b border-line">
      <NavItem href="/">Home</NavItem>
      <NavItem href="/about">About</NavItem>
      <NavItem href="/events">Events</NavItem>
      <NavItem href="/articles">Articles</NavItem>
    </nav>
  );
};

type NavItemProps = React.PropsWithChildren<{
  href: string;
}>;

const NavItem: React.FC<NavItemProps> = (props) => {
  return (
    <Link href={props.href}>
      <Text.Body>{props.children}</Text.Body>
    </Link>
  );
};

export default Navigation;
