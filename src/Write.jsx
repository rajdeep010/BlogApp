import Navbar from "./components/navbar/Navbar"
import Editor from "./components/editor/Editor"

import EditSidebar from './components/editorSidebar/EditSidebar'

import './write.scss'

const Write = () => {
  return (
    <>
      <Navbar />

      <div className="writing_section">
        <Editor />
        <EditSidebar />
      </div>

    </>
  )
}

export default Write