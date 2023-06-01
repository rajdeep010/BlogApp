import Navbar from "./components/navbar/Navbar"
import Editor from "./components/editor/Editor"
import Title from "./components/editor/Title"
import EditSidebar from './components/editorSidebar/EditSidebar'
import './styles/write.scss'
import Category from "./components/editorSidebar/Category"
import CodioShare from "./components/editorSidebar/CodioShare"


const Write = () => {

  return (
    <>
      {/* <Navbar /> */}

      <div className="writing_section">

        <div className="title-editor">
          <Title />
          <Editor />
        </div>

        <div className="editor-sidebar">
          <div className="element">
            <Category />
          </div>

          <div className="element">
            <CodioShare />
          </div>
        </div>

      </div>

    </>
  )
}

export default Write