import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

const ActionMenu = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          rounded-md
          p-1.5
          text-slate-300
          transition
          hover:bg-slate-100
          hover:text-slate-400
        "
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div
          className="
             absolute
              right-7
              top-0
              z-15
              mr-px
              w-5
              flex
              items-center
              justify-center   
              flex-col
              
          "
        >
          <button
            onClick={onEdit}
            className="
              rounded-md
              pb-1
              text-slate-600
              transition
              hover:bg-blue-50
              hover:text-blue-600
            "
          >
            <Pencil size={14} />
          </button>

          <button
            onClick={onDelete}
            className="
              rounded-md
              p-1
              text-red-600
              transition
              hover:bg-red-50
            "
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
