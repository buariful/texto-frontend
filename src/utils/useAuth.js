import { useSelector } from "react-redux";

export default async function useAuth() {
  const auth = useSelector((state) => state.user);
  if (auth) {
    return true;
  } else {
    return false;
  }
}
