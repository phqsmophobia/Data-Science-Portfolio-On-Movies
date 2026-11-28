let search = document.querySelector("input");
let list = document.getElementById("movies");
let grid = document.getElementById("grid");
//Empty variables that will hold the JSON data once fetched
let lr1, dt1, rf1, lr2, dt2, rf2;

//turns raw numbers into dollar counts
function money(n) {
  return typeof n === "number" ? "$" + Math.round(n).toLocaleString() : n ?? "—";
}

//look for a value by checking a list of names.
// Checks inside the individual movie object first (budget, predicted, actual),
// then grabs (R2, RMSE, MAE)
function pick(movie, data, keys) {
  for (let k of keys) {
    if (movie[k] !== undefined) return movie[k];
    if (data[k] !== undefined) return data[k];
  }
  return "—";
}
// builds the clickable dropdown item
function fillbox(id, label, data, title) {
  let box = document.getElementById(id);
  let movie = data.movies.find((m) => m.title === title);
  if (!movie) return;

  //obtain every metric from the JSON
  let budget = pick(movie, data, ["budget"]);
  let predicted = pick(movie, data, ["predicted", "prediction", "predictedrevenue"]);
  let actual = pick(movie, data, ["actual", "revenue", "actualrevenue"]);
  let r2 = pick(movie, data, ["R2", "r2"]);
  let r2Pct = pick(movie, data, ["R2%", "r2_percent", "r2_pct"]);
  if (r2Pct === "—" && typeof r2 === "number") r2Pct = (r2 * 100).toFixed(2) + "%";
  let rmse = pick(movie, data, ["RMSE", "rmse"]);
  let mae = pick(movie, data, ["MAE", "mae"]);

  box.innerHTML = `
    <h3>${label}</h3>
    <div>Budget:<br> <strong>${money(budget)}</strong></div>
    <div>Predicted:<br> <strong>${money(predicted)}</strong></div>
    <div>Actual:<br> <strong>${money(actual)}</strong></div>
    <div>R2:<br> <strong>${typeof r2 === "number" ? r2.toFixed(4) : r2}</strong></div>
    <div>R2%:<br> <strong>${r2Pct}</strong></div>
    <div>RMSE:<br> <strong>${money(rmse)}</strong></div>
    <div>MAE:<br> <strong>${money(mae)}</strong></div>
  `;
}

//Populates all 6 cards at once
function showAll(title) {
  fillbox("lr1", "Linear Regression (Budget)", lr1, title);
  fillbox("dt1", "Decision Tree (Budget)", dt1, title);
  fillbox("rf1", "Random Forest (Budget)", rf1, title);
  fillbox("lr2", "Linear Regression (Budget + IMDb)", lr2, title);
  fillbox("dt2", "Decision Tree (Budget + IMDb)", dt2, title);
  fillbox("rf2", "Random Forest (Budget + IMDb)", rf2, title);
  grid.style.display = "grid";
}

function menufill(text) {
  list.innerHTML = "";
  if (!lr1 || text === "") return;

  for (let i = 0; i < lr1.movies.length; i++) {
    let title = lr1.movies[i].title;
    if (title.toLowerCase().startsWith(text)) {
      let item = document.createElement("li");
      item.textContent = title;

      item.addEventListener("mousedown", function () {
        search.value = title; //put full movie name in search bar
        list.innerHTML = "";
        showAll(title); //fill the boxes
      });

      list.appendChild(item);
    }
  }
}

async function loadfiles() {
  lr1 = await (await fetch("../../linearregression.json")).json();
  dt1 = await (await fetch("../../decisiontree.json")).json();
  rf1 = await (await fetch("../../randomforest.json")).json();
  lr2 = await (await fetch("../../linearregression_v2.json")).json();
  dt2 = await (await fetch("../../decisiontree_v2.json")).json();
  rf2 = await (await fetch("../../randomforest_v2.json")).json();
}


//re-filter the dropdown for each new string update
search.addEventListener("input", function () {
  menufill(search.value.toLowerCase());
});
//close the dropdown if the user clicks outside
document.addEventListener("mousedown", function (e) {
  if (!e.target.closest(".searchsection")) {
    list.innerHTML = "";
  }
});


//loading the JSON files immediately when the page opens
loadfiles();