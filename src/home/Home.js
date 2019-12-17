import React from "react";
import "./home.css"

const Home = () => {
  return(
    <>
      <div id="home-container">
        <div className="hero">
          <img id="hero-logo" src={require("../images/BeerDiary.png")} />
        </div>

        <div className="about">
          <h1 id="about-header">ABOUT</h1>
          <p id="about-p">Beer Diary is your digital journal for remembering tasty and delicious beers!</p>
          <p id="about-p">This is application is a personal project created by Kiley Bobbitt, a web developer based out of Washington, D.C. and an avid beer enthusiast!</p>
        </div>

        <div className="beer-type-img-cont">
          <img src={require("../images/beer-types.png")} />
          <img src={require("../images/beer-types.png")} />
          <img src={require("../images/beer-types.png")} />
        </div>
        <div id="divider-1"></div>
        <div id="divider-2"></div>
      </div>
    </>
  )
}

export default Home
