
import './App.css'
import { Link, Outlet } from "react-router-dom";


function App() {

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to={`vista-1`}>Vista 1</Link>
            </li>
            <li>
              <Link to={`vista-2`}>Vista 2</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </>
  )
}

export default App
