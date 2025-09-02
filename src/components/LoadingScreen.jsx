import logo from "../assets/logo.png";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <img src={logo} alt="Logo" className="w-24 h-24 mb-4" />
      <p className="text-black text-2xl mb-3 font-semibold">LOADING..</p>
      <div className="w-8 h-8 border-4 border-black/60 border-t-black rounded-full animate-spin" />
    </div>
  );
};

export default LoadingScreen;
