import Index from './Index'
import Write from './Write'
import Registration from './components/signuplogin/Registration'
import Post from './Post'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import BlogProvider from './context/BlogContext'
import TitleProvider from './context/TitleContext'
import AuthProvider from './context/AuthContext'
import Profile from './Profile'
import Home from './Home'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import Footer from './components/footer/Footer'

TimeAgo.addDefaultLocale(en)


const App = () => {
  return (
    <>
      <AuthProvider>
        <TitleProvider>
          <BlogProvider>
            <BrowserRouter>
              <Navbar />

              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/dashboard' element={<Index />}></Route>
                <Route path='/write' element={<Write />}></Route>
                <Route path='/blog' element={<Post />}></Route>
                <Route path='/blog/:bid' element={<Post />}></Route>
                <Route path='/users/:uid' element={<Profile />}></Route>
                <Route path='/login' element={<Registration />}></Route>
              </Routes>

              <Footer />

            </BrowserRouter>
          </BlogProvider>
        </TitleProvider>
      </AuthProvider>
    </>
  )
}

export default App