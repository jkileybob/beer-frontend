import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Nav = ({ location: { pathname }, logged_in, onLogOut, resetSearch, myBreweriesClick }) => {
  let logout = () => {onLogOut()}
  let clearStates = () => {resetSearch()}
  let favs = () => {myBreweriesClick()}

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
            to="/search-breweries"
            name="Search Breweries"
            active={pathname === "/search-breweries"}
            onClick={clearStates}
          />

          <Menu.Item
            as={NavLink}
            to="/breweries"
            name="My Breweries"
            active={pathname === "/breweries"}
            onClick={favs}
          />

          <Menu.Item
            as={NavLink}
            to="/beers"
            name="My Beers"
            active={pathname === "/beers"}
          />

          <Menu.Menu position="right">
            <Menu.Item
              to="/logout"
              name="Logout"
              onClick={logout}
            />
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
          <Menu.Item
            as={NavLink}
            to="/search-breweries"
            name="Search Breweries"
            active={pathname === "/search-breweries"}
            onClick={clearStates}
          />
        </Fragment>
      )}
    </Menu>
  );
};

export default withRouter(Nav);

      // <Menu.Item
      //   as={NavLink}
      //   to="/add-beer"
      //   name="Add a Beer"
      //   active={pathname === "/add-beer"}
      // />
