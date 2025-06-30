import { FOOTER_CONTENT } from "../constants";

const Footer = () => {
  return (
    <footer className="bg-white fixed bottom-0 left-0 right-0 text-center py-3 z-40">
      <span className="text-sm">{FOOTER_CONTENT}</span>
    </footer>
  );
};

export default Footer;
