import React     from 'react'
import AppHeader from './AppHeader'

const MainLayout = (props) =>  {
  return (
    <div className="MainLayout">

      <AppHeader />

      <main>
        {props.children}
      </main>
    </div>
  )
}

export default MainLayout
