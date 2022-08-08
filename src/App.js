import React, { useState, useEffect } from "react"
import Recipe from "./Recipe"
import axios from "axios"
import './App.css';
import Logo from "./logo.png"
import Alert from "./Alert";
import { APP_ID, APP_KEY } from "./config";



const App = () => {

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("chicken")
  const [alert, setAlert] = useState("");

  
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getRecipes = async () => {
    if (query !== "") {
      const result = await axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      console.log(result);
      setRecipes(result.data.hits);
      setQuery("");
      setAlert("");
    } else {
      setAlert("Please fill the form");
    }
  }

  useEffect(() => {
    getRecipes()
  }, [query])

  const getSearch = (e) => {
    e.preventDefault()
    setQuery(search)
  }


  return (
    <div className="App">
      <img className = "imageLogo" src={Logo} alt="Logo" target="_blank" rel="noopener noreferrer"/>
      <form onSubmit={getSearch} className="search-form">
        <input className='search-bar' type='text' value={search} placeholder="Search any food..." onChange={e => setSearch(e.target.value)}></input>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          link={recipe.recipe.url}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
