import React, { useState, useMemo } from 'react'
import { Link } from 'gatsby'
import Logo from '../img/logo.inline.svg'
import './styles/navbar.sass'

function Navbar() {
  const [active, setActive] = useState(false)
  const navBarActiveClass = useMemo(() => {
    return active ? 'is-active' : ''
  }, [active])

  const toggleHamburger = () => {
    setActive(!active)
  }

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <Logo style={{ width: '150px' }} />
          </Link>
          {/* Hamburger menu */}
          <div
            className={`navbar-burger burger ${navBarActiveClass}`}
            data-target="navMenu"
            onClick={toggleHamburger}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div
          id="navMenu"
          className={`navbar-menu ${navBarActiveClass}`}
        >
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/about">
              About
          </Link>
            <Link className="navbar-item" to="/blog">
              Blog
          </Link>
            <Link className="navbar-item" to="/contact">
              Contact
          </Link>
          </div>
        </div>
      </div>
    </nav>

  )
}

export default Navbar
