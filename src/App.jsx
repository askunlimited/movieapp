
import './index.css'
import Search from "./components/Search.jsx";
import {useState} from "react";

function App() {
    const [searchTerm, setSearchTerm] = useState("")

  return (
      <>
          <div className="pattern">
              <div className="wrapper">
                  <img src="./hero.png" alt="hero banner"/>
                  <header>
                  <h1> Find <span className="text-gradient">Movies</span>  you can watch without the hassle</h1>
              </header>
                  <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </div>

          </div>
      </>
  )
}

export default App
