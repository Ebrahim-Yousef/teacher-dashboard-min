import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ to = "/dashboard" }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        px-3.5
        py-2
        text-sm
        font-medium
        text-slate-600
        shadow-2xs
        transition-all
        duration-200
        hover:border-primary/30
        hover:bg-primary-light/50
        hover:text-primary
        active:scale-95
        cursor-pointer
      "
      title="العودة"
    >
      <ArrowRight size={18} />
    </button>
  );
};

export default BackButton;
