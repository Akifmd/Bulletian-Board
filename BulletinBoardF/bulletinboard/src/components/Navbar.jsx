import React, { useEffect, useState } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { doLogout, islogin } from "../auth";
import { getCurrentUserDetail } from "../auth";
import { useNavigate } from "react-router-dom";

function Navigationbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const logout = () => {
    doLogout(() => {
      setLogin(false);
      navigate("/");
    });
  };

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setLogin(islogin());
    setUser(getCurrentUserDetail());
  }, [login, localStorage.getItem("login")]);

  return (
    <>
      <Navbar color="dark" dark expand="md" fixed="" className="px-5">
        {login && (
          <NavbarBrand href={"/" + user.UserName + "/" + user.Email}>
            Bulletin Board
          </NavbarBrand>
        )}
        {!login && <NavbarBrand href={"/"}>Bulletin Board</NavbarBrand>}

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={ReactLink} to="/about">
                  About
                </DropdownItem>
                {/* <DropdownItem tag={ReactLink} to="/login">
                  Login
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="/registration">
                  Registration
                </DropdownItem> */}
                <DropdownItem tag={ReactLink} to="/contact">
                  Contact
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>

        <Nav navbar>
          {login && (
            <>
              <NavItem>
                <NavLink onClick={logout}>Logout</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Hi,{user.Email}</NavLink>
              </NavItem>
            </>
          )}
          {!login && (
            <>
              <NavItem>
                <NavLink tag={ReactLink} to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/registration">
                  Registration
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
}

export default Navigationbar;
