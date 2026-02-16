import * as Page from '@/ui/page';
import * as Text from '@/ui/text';

const Footer = () => {
  return (
    <footer className="footer py-8 border-t border-line">
      <Page.Container className="text-center">
        <Text.Body className="text-muted">
          &copy; {new Date().getFullYear()} Sanity in Practice
        </Text.Body>
      </Page.Container>
    </footer>
  );
};

export default Footer;
