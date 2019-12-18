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
          <p id="about-p">This is application is a personal project created by <a id="link" href="https://www.kileybobbitt.com/">Kiley Bobbitt</a>, a web developer and beer enthusiast based out of Washington, D.C.!</p>
        </div>

        <div className="beer-type-img-cont">
          <img src={require("../images/beer-types.png")} />
          <img src={require("../images/beer-types.png")} />
          <img src={require("../images/beer-types.png")} />
        </div>
        <div id="divider-1">
          <p id="about-p"> Many thanks to the <a id="link" href="https://www.openbrewerydb.org/">Open Brewery Database</a> for free access to brewery data.</p>
        </div>
        <div id="divider-2">
          <p id="about-p">This project would not be posible without your willingness to share.</p>
          <p id="thx">Thank you!</p>
        </div>
      </div>
    </>
  )
}

export default Home
