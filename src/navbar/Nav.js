import React, { Fragment } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { Menu, Image } from "semantic-ui-react";
import "./Nav.css"


const Nav = ({ location: { pathname }, logged_in, onLogOut, resetSearch, onClickReset, myBreweriesClick }) => {

  let logout = () => { onLogOut() }
  let clearStates = () => { resetSearch() }
  let favs = () => { myBreweriesClick() }
  let clear = () => { onClickReset() }

  return (
    <>
    <Menu pointing secondary >
      {logged_in ? (
        <Fragment>
          <Link to='/'>
            <Menu.Item>
              <img id="nav-logo" src={require("../images/BeerDiary.png")} />
            </Menu.Item>
          </Link>
          <Menu.Item
            className="link"
            as={NavLink}
            to="/profile"
            name="My Profile"
            active={pathname === "/profile"}
          />

          <Menu.Item
            className="link"
            as={NavLink}
            to="/search-breweries"
            name="Search Breweries"
            active={pathname === "/search-breweries"}
            onClick={clearStates}
          />

          <Menu.Item
            className="link"
            as={NavLink}
            to="/breweries"
            name="My Breweries"
            active={pathname === "/breweries"}
            onClick={favs}
          />

          <Menu.Item
            className="link"
            as={NavLink}
            to="/beers"
            name="My Beers"
            active={pathname === "/beers"}
            onClick={clear}
          />

          <Menu.Menu position="right">
            <Menu.Item
              className="link"
              to="/logout"
              name="Logout"
              onClick={logout}
            />
          </Menu.Menu>

        </Fragment>
      ) : (
        <Fragment>
          <Link to='/'>
            <Menu.Item>
              <img id="nav-logo" src={require("../images/BeerDiary.png")} />
            </Menu.Item>
          </Link>
            
          <Menu.Item
            className="link"
            as={NavLink}
            to="/login"
            name="Login"
            active={pathname === "/login"}
          />
          <Menu.Item
            className="link"
            as={NavLink}
            to="/signup"
            name="Sign Up"
            active={pathname === "/signup"}
          />
        <Menu.Item
            className="link"
            as={NavLink}
            to="/search-breweries"
            name="Search Breweries"
            active={pathname === "/search-breweries"}
            onClick={clearStates}
          />
        </Fragment>
      )}
    </Menu>
    </>
  );
};

export default withRouter(Nav);

      // <Menu.Item
      //   as={NavLink}
      //   to="/add-beer"
      //   name="Add a Beer"
      //   active={pathname === "/add-beer"}
      // />
