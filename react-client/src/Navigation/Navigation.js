import React from 'react';
import NavItem from './NavItem';

const Nav = (props) => {
  // props.updateNav.bind(this,'tracking')
  // props.activeNav

  return (
    <header>

      {/* <ul>
        <li><Link to='/tracking'>Tracking</Link></li>
        <li><Link to='/trending'>Trending</Link></li>
        <li><Link to='/bills'>Bills</Link></li>
        <li><Link to='/legislators'>Legislators</Link></li>
      </ul> */}

      <a className="navbar-brand" href="#"><h1>BillHub</h1></a>
      {/* <nav class="nav nav-pills nav-fill">
          <Link to='/tracking' class="nav-item nav-link" href="#">Tracking</Link>
          <Link to='/trending' class="nav-item nav-link" href="#">Trending</Link>
          <Link to='/bills' class="nav-item nav-link" href="#">Bills</Link>
          <Link to='/legislators' class="nav-item nav-link" href="#">Legislators</Link>
      </nav> */}

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