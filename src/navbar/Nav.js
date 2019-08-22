import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Nav = ({ location: { pathname }, logged_in, onLogOut }) => {
  let logout = () => {onLogOut()}
  return (
    <Menu pointing secondary>
      {logged_in ? (
        <Fragment>

          <Menu.Item
            as={NavLink}
            to="/profile"
            name="My Profile"
            active={pathname === "/profile"}
          />

          <Menu.Item
            as={NavLink}
            to="/breweries"
            name="Search Breweries"
            active={pathname === "/breweries"}
            />

          <Menu.Item name="My Favorites"  />

          <Menu.Menu position="right">
            <Menu.Item to="/logout" name="Logout" onClick={logout} />
          </Menu.Menu>
        </Fragment>
      ) : (
        <Fragment>
          <Menu.Item
            as={NavLink}
            to="/login"
            name="Login"
            active={pathname === "/login"}
          />
          <Menu.Item
            as={NavLink}
            to="/signup"
            name="Sign Up"
            active={pathname === "/signup"}
          />
    </Fragment>
      )}
    </Menu>
  );
};

export default withRouter(Nav);
