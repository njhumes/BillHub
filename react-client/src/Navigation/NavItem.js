import React from 'react'
import { Link } from 'react-router-dom';

const NavItem = (props) => {

    let currPage = props.path.charAt(0).toUpperCase() + props.path.substring(1,props.path.length)
    let itemClass = "nav-item nav-link";
    let isActive = window.location.pathname === props.path;
    let className = isActive ? itemClass + ' active' : itemClass;

    return (
        <Link to={'/' + props.path} onClick={props.updateNav.bind(this,props.path)} className={className} href="#">{currPage}</Link>
    )
}

export default NavItem