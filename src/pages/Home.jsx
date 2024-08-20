import { UserNotFound } from "../components/UserNotFound.jsx";
import { UserSignedIn } from "../components/UserSignedIn/UserSignedIn.jsx";
import { useSelector } from "react-redux";

export const Home = () => {
  let dataUser = useSelector((state) => state.isSignedInUser);

  // noinspection JSUnresolvedReference
  return !dataUser?.user ? <UserNotFound /> : <UserSignedIn />;
};
