import React from 'react'
import NavLink from './NavLink'

import logo_src from '../../assets/mn_logo.png'

const AppHeader = (props) => {
  return (
    <div className="AppHeader">
      <NavLink to="/">
        <img src={logo_src} className="logo" alt="logo" />
      </NavLink>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default AppHeader
