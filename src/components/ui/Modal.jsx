import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../styles/utils/cn";

const Modal = ({ isOpen, onClose, title, children, className }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-slate-900/60 backdrop-blur-xs
            p-3 sm:p-6
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className={cn(
              "w-full max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden",
              className,
            )}
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 12,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            {/* Header */}
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-100
                px-5
                py-4
                sm:px-6
                bg-slate-50/50
                shrink-0
              "
            >
              <h2
                className="
                  text-base
                  sm:text-lg
                  font-bold
                  text-slate-800
                "
              >
                {title}
              </h2>

              <button
                onClick={onClose}
                className="
                  rounded-xl
                  p-1.5
                  text-slate-400
                  transition-colors
                  hover:bg-slate-200/60
                  hover:text-slate-700
                  cursor-pointer
                "
                title="إغلاق"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 py-5 sm:px-6 overflow-y-auto flex-1">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
