import Index from './Index'
import Write from './Write'
import Registration from './components/signuplogin/Registration'
import Post from './Post'

import { BrowserRouter, Routes, Route } from "react-router-dom"

import BlogProvider from './context/BlogContext'
import TitleProvider from './context/TitleContext'

const App = () => {
  return (
    <>
      <TitleProvider>
        <BlogProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Index />}></Route>
              <Route path='/write' element={<Write />}></Route>
              <Route path='/blog' element={<Post />}></Route>
              <Route path='/login' element={<Registration />}></Route>
            </Routes>
          </BrowserRouter>
        </BlogProvider>
      </TitleProvider>
    </>
  )
}

export default App