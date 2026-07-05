import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 font-lato font-bold text-brand-inactive hover:text-red-500 transition-colors"
    >
      <FiLogOut size={18} />
      <span className="hidden md:inline">Logout</span>
    </button>
  );
}
