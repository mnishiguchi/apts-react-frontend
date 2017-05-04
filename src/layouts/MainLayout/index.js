import React     from 'react'
import AppHeader from './AppHeader'

const MainLayout = (props) =>  {
  return (
    <div className="MainLayout">

      <AppHeader />

      <main>
        {props.children}
      </main>

      <footer className="AppFooter">
        <div className="container">
          <div className="contact-info">
            Masatoshi Nishiguchi |
            <a href="http://www.mnishiguchi.com/">
              mnishiguchi.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
