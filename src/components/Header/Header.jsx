import React, { useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../Redux/userActions";
import "../../styles/header.css";

const Header = () => {
  const menuRef = useRef(null);
  const dispatch =  useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  const navLinks = 
  [
      { path: "/home", display: "Home" },
      { path: "/about", display: "About" },
      { path: "/cars", display: "Cars" },
      { path: "/autoparts", display: "AutoParts" },
      { path: "/videos", display: "Videos" },
      { path: "/contact", display: "Contact" },
      { path: "/login", display: "Login" },
    ];

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i class="ri-phone-fill"></i> +1-202-555-0149
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6">
            {userInfo ? (
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                <Link to="/userProfile" className=" d-flex align-items-center gap-1">
                  <i class="ri-login-circle-line"></i> User Profile
                </Link>

                <Link to="#" className=" d-flex align-items-center gap-1" onClick={handleLogout}>
                  <i class="ri-user-line"></i> Logout
                </Link>
              </div>
            ) : (
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                <Link to="/login" className=" d-flex align-items-center gap-1">
                  <i class="ri-login-circle-line"></i> Login
                </Link>

                <Link to="register" className=" d-flex align-items-center gap-1">
                  <i class="ri-user-line"></i> Register
                </Link>
              </div>
            )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i className="ri-car-line"></i>
                    <span>
                      Afghan Wheels <br /> Car Buy & Sell
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Afghanistan</h4>
                  <h6>Kabul, Afghanistan</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Monday to Sunday</h4>
                  <h6>24/7 hrs</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i className="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>
            { userInfo ? (
              <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive ? "nav__active nav__item" : "nav__item"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "nav__active nav__item" : "nav__item"
                  }
                >
                  About
                </NavLink>
                <NavLink
                  to="/cars"
                  className={({ isActive }) =>
                    isActive ? "nav__active nav__item" : "nav__item"
                  }
                >
                  Cars
                </NavLink>
                <NavLink
                  to="/autoparts"
                  className={({ isActive }) =>
                    isActive ? "nav__active nav__item" : "nav__item"
                  }
                >
                  AutoParts
                </NavLink>
                <NavLink
                  to="/videos"
                  className={({ isActive }) =>
                    isActive ? "nav__active nav__item" : "nav__item"
                  }
                >
                  Videos
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "nav__active nav__item" : "nav__item"
                  }
                >
                  Contact
                </NavLink>
                  <div className="user-menu">
                    <span className="user-initials" onClick={toggleDropdown}>
                      Hi, {userInfo.firstname}
                    </span>
                    <div className={`dropdown ${dropdownOpen ? 'show' : ''}`}>
                      <NavLink to="/userprofile" className="nav__item">User Profile</NavLink>
                      <span className="nav__item" onClick={handleLogout}>Logout</span>
                    </div>                  
                  </div>
                  </div>
                  </div>
              ) : (
                <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                <div className="menu">
                  {navLinks.map((item, index) => (
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active nav__item" : "nav__item"
                      }
                      key={index}
                    >
                      {item.display}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
