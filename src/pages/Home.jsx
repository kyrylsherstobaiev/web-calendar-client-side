import { useSelector } from "react-redux";
import { UserNotFound } from "../components/UserNotFound.jsx";
import { UserSignedIn } from "../components/UserSignedIn/UserSignedIn.jsx";

export const Home = () => {
  const userData = useSelector((state) => state.isSignedInUser);
  const isUserSignedIn = !!userData?.user;

  return isUserSignedIn ? <UserSignedIn /> : <UserNotFound />;
};
