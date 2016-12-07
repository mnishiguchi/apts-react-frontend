import React from 'react'
import { Link } from 'react-router'

// https://github.com/reactjs/react-router-tutorial/tree/master/lessons/05-active-links#nav-link-wrappers

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const NavLink = (props) => {
  return (<Link {...props} activeClassName="active"/>);
}

export default NavLink;
