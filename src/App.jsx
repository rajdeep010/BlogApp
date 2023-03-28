import Index from './Index'
import Write from './Write'
import Registration from './components/signuplogin/Registration'

import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />}></Route>
          <Route path='/write' element={<Write />}></Route>
          <Route path='/login' element={<Registration />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App