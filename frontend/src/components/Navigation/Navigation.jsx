import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navi">
        <div className="leftlogo">
            <i className="fa-brands fa-airbnb"></i>
            <NavLink to={"/"}> Vincent Air Bnb</NavLink>
        </div>

        <div className="rightlogo">
            {sessionUser && <NavLink to={'/spots/new'}>Create a New Spot</NavLink>}
            {isLoaded && (
                <ProfileButton user={sessionUser} />
            )}
        </div>
    </div>
  );
};

export default Navigation;
