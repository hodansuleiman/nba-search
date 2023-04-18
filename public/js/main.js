

/* These lines of code are declaring variables and assigning them values using DOM manipulation. */
let resultContainer = document.querySelector("#results");
const searchButton = document.getElementById('submit');
const searchButton2 = document.getElementById('submit2');
let playerData = [];

/* These are event listeners that listen for a click event on the `searchButton` and `searchButton2`
elements respectively. When a click event is detected, the function passed as the second argument to
the `addEventListener` method is executed. */
searchButton.addEventListener("click", function(e){
    console.log("click")
    e.preventDefault();
    search();

})

searchButton2.addEventListener("click", function(e){
    console.log("click")
    e.preventDefault();
    searchByName();

})



 /**
  * The function searches for MVPs based on a user-inputted year and displays the results on the
  * webpage.
  */
 async function search() {
    const inputData = document.querySelector("#year").value;
    // fetch 
     console.log("did i get the year ?", inputData)
     const call = await fetch(`http://localhost:8080/mvps/${inputData}`)
     const data = await call.json();

     console.log("did i get th data back?", data)

     /* These lines of code are hiding the HTML elements with class "form1" and "form2" by setting
     their `display` property to "none". Then, the function `renderObject` is called with the `data`
     parameter passed in as an argument. This function renders the player information on the webpage
     based on the input data. Finally, the `data` variable is logged to the console for debugging
     purposes. */
     document.querySelector(".form1").style.display = "none";
     document.querySelector(".form2").style.display = "none";
     console.log(data);
   
     renderObject(data);
 }

/**
 * This function fetches data from a server based on user input and renders it on the webpage.
 */

 
 async function searchByName() {
    const inputData = document.querySelector("#name").value;
    // fetch 
     const call = await fetch(`http://localhost:8080/mvps/name/${inputData}`)
     const data = await call.json();
     document.querySelector(".form1").style.display = "none";
     document.querySelector(".form2").style.display = "none";
   
  
     renderArray(data);
 }

 

 /**
  * The function renders an array of data by creating and appending HTML elements for each item in the
  * array.
  * @param data - The parameter `data` is an array of objects that contains information about players,
  * including their name, team, and year. The function `renderArray` takes this array as input and
  * renders the data on the webpage by creating HTML elements for each player's year, name, and team.
  */
 function renderArray(data){
    //this data is referring to the array object when searching by name
    resultContainer.innerHTML = "";

   
    createHeader();

    data.map(d => {
         
        let yearBox = document.createElement("div");
        yearBox.textContent = `${d.year}`
        resultContainer.appendChild(yearBox);

        let playerBox = document.createElement("div");
        playerBox.textContent = `${d.player}`
        resultContainer.appendChild(playerBox);

        let teamBox = document.createElement("div");
        teamBox.textContent = `${d.team}`
        resultContainer.appendChild(teamBox);
    })

 }


 /**
  * The function renders an object's year, player, and team properties in separate div elements.
  * @param data - The parameter `data` is an object that contains information about a player's
  * performance in a particular year. It has three properties: `year`, `player`, and `team`. The
  * `renderObject` function takes this object as input and creates a header followed by three div
  * elements, each containing the
  */
 function renderObject(data){
 //this data is referring to the object when searching by year
    resultContainer.innerHTML = "";
    createHeader();
    let yearBox = document.createElement("div");
    yearBox.textContent = `${data.year}`
    resultContainer.appendChild(yearBox);

    let playerBox = document.createElement("div");
    playerBox.textContent = `${data.player}`
    resultContainer.appendChild(playerBox);

    let teamBox = document.createElement("div");
    teamBox.textContent = `${data.team}`
    resultContainer.appendChild(teamBox);

 };


 /**
  * The function creates and appends three header elements to a result container.
  */
 function createHeader(){
    let yearHeader = document.createElement("div");
    yearHeader.textContent = "Year";
    resultContainer.appendChild(yearHeader);

    let playerHeader = document.createElement("div");
    playerHeader.textContent = "Player";
    resultContainer.appendChild(playerHeader);

    let teamHeader = document.createElement("div");
    teamHeader.textContent = "Year";
    resultContainer.appendChild(teamHeader);
 }