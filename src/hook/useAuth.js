import { getProfile } from "../redux/selector";
import { useSelector } from "react-redux";

export default function useAuth() {
  const profileLogin = useSelector(getProfile);

  const isLogged = profileLogin.isLogined;
  const profile = profileLogin.userData;
  const role = profile?.role || null;

  return { isLogged, role, profile };
}
