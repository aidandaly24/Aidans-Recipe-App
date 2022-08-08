import React from "react"
import "./Recipe.css"

const Recipe = ({ title, image, ingredients, link }) => {

    return (
        <div className = "recipe">
            <h1><a href={link}>{title}</a></h1>
            <ol>
                {ingredients.map(ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <img className="image" src={image} alt=""/>
        </div>
    )

}

export default Recipe