import React from 'react';
import NavItem from './NavItem';

const Nav = (props) => {
  return (
    <header>
      {/* BILLHUB HEADER */}
      <a className="navbar-brand" href="#"><img src="https://unsplash.com/photos/InsHJ5sg2vc"/><span>BillHub</span></a>

      <nav className="nav nav-pills nav-fill">
          <NavItem updateNav={props.updateNav.bind(this)} path="tracking"/>
          <NavItem updateNav={props.updateNav.bind(this)} path="trending"/>
          <NavItem updateNav={props.updateNav.bind(this)} path="bills"/>
          <NavItem updateNav={props.updateNav.bind(this)} path="legislators"/>
      </nav>
      
    </header>
    )
}

export default Nav;