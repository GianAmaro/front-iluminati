import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Video Background Placeholder - Aquí pondrás tu video */}

      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="/videos/clouds.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Header minimalista */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 right-0 z-50 px-8 py-6"
      >
      </motion.header>

      {/* Contenido central */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        {/* Avión animado - escala inicial y luego flotación */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: -120 }}
          animate={{ scale: 1.3, opacity: 1, y: 0 }}
          transition={{
            duration: 3.8,
            type: "spring",
            stiffness: 60,
            damping: 14,
          }}
          className="relative mb-16"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.9,
            }}
          >
            <img
              src="/images/plane.png"
              alt="Aircraft"
              className="w-[900px] h-auto drop-shadow-2xl select-none"
              draggable={false}
            />
          </motion.div>
        </motion.div>

        {/* Texto principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center space-y-6 px-4"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight">
            Discover the world
          </h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className=" 1
            !mt-16 !px-16 !py-6 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-full hover:bg-white/20 transition-all duration-500 text-lg font-light tracking-wide"
          >
            Explore Dashboard
          </motion.button>
        </motion.div>
      </div>

      {/* Footer minimalista */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-0 right-0 z-20"
      ></motion.div>
    </div>
  );
};

export default HomePage;
