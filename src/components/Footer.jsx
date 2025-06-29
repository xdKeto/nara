import { FOOTER_CONTENT } from "../constants";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 text-center py-4 z-40">
      <span className="text-sm text-gray-600">{FOOTER_CONTENT}</span>
    </footer>
  );
};

export default Footer;
