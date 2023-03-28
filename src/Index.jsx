import Card from "./components/card/Card"
import Sidebar from "./components/sidebar/Sidebar"

import Navbar from "./components/navbar/Navbar"

import './index.css'

const App = () => {
  return (
    <>
      <Navbar />

      <section className="app_container">

        <div className="cards_container">
          <Card className='card' />
          <Card className='card' />
          <Card className='card' />
          <Card className='card' />
          <Card className='card' />
          <Card className='card' />
          <Card className='card' />
          <Card className='card' />
        </div>

        <Sidebar className='sidebar' />

      </section>
    </>
  )
}

export default App