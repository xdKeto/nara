import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

const LoadingScreen = ({ loading, error, hasData, onRetry }) => {
  // Only show the screen if we are loading or have an error AND we don't have cached data to show
  const isBlocking = (loading || error) && !hasData;

  return (
    <AnimatePresence>
      {isBlocking && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-white p-6 text-center"
        >
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            src={logo} 
            alt="Logo" 
            className="w-24 h-24 mb-6 object-contain" 
          />
          
          {error ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="max-w-md"
            >
              <h2 className="text-black text-2xl mb-2 font-bold uppercase tracking-tighter">Connection Issue</h2>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed whitespace-pre-wrap">
                {error.includes("Cold Start") 
                  ? "Our server is taking a moment to wake up. Please try again in a few seconds." 
                  : "We couldn't connect to the server. Please check your internet connection."}
              </p>
              <button
                onClick={onRetry}
                className="px-8 py-3 bg-black text-white font-bold text-sm tracking-widest hover:bg-gray-800 transition-colors uppercase"
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <p className="text-black text-xs mb-4 font-bold tracking-[0.3em] uppercase">Initializing</p>
              <div className="w-12 h-[2px] bg-gray-100 overflow-hidden">
                <motion.div 
                  className="w-full h-full bg-black"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;