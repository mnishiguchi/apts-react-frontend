import React from 'react'
import { Link } from 'react-router'

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const NavLink = (props) => {
  return (<Link {...props} activeClassName="active"/>);
}; // end NavLink

export default NavLink;
