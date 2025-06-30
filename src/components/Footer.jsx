import { FOOTER_CONTENT } from "../constants";

const Footer = () => {
  return (
    <footer className="select-none bg-white fixed bottom-0 left-0 right-0 py-1 text-center z-40">
      <span className="text-sm">{FOOTER_CONTENT}</span>
    </footer>
  );
};

export default Footer;
