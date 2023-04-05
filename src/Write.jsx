import Navbar from "./components/navbar/Navbar"
import Editor from "./components/editor/Editor"
import Title from "./components/editor/Title"

import EditSidebar from './components/editorSidebar/EditSidebar'

import './write.scss'

const Write = () => {

  return (
    <>
      <Navbar />

      <div className="writing_section">

        <div className="title-editor">
          <Title />
          <Editor />
        </div>

        <div className="editor-sidebar">
          <EditSidebar />
        </div>
        
      </div>

    </>
  )
}

export default Write