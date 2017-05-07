import React     from 'react'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'

const MainLayout = (props) =>  {
  const { location } = props

  return (
    <div className="MainLayout">

      <AppHeader />

      <main style={{ minHeight: '80vh' }}>
        {props.children}
      </main>

      {
        // Do not show footer on listing screen.
        location.pathname !== '/' && (
          <AppFooter />
        )
      }
    </div>
  )
}

export default MainLayout
