import { motion } from "framer-motion";

export default function GlassCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-lg bg-white/30 border border-white/20 shadow-xl rounded-2xl p-6"
    >
      {children}
    </motion.div>
  );
}