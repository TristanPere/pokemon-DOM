import pokemonArray from "./data/pokemon.js";
const cardContainer = document.querySelector(".card-container");
const inputName = document.querySelector("#search-bar-name");
const inputType = document.querySelector("#search-bar-type");
const inputNumber = document.querySelector("#search-bar-number");
const typeCheckBox = document.querySelector("#sort-button-type");
const dropdown = document.querySelector("#types")
// Depending on number of types of the pokemon it will load correct display text
// Only an if else statement as there's only two posibilities for number of types
const typeDisplay = (typeArr) => {
  if (typeArr.length == 1) {
    return typeArr[0];
  } else {
    return `${typeArr[0]} & ${typeArr[1]}`;
  }
};

// generates the HTML for the card
const makeCardHTML = (pokemonObject) => {
  const cardHtml = `<div class="card">
    <img src=${pokemonObject.sprite} alt="" class="card__image">
    <div class="card__content">
      <div class="card__heading">${pokemonObject.name}</div>
      <div class="card__text">${pokemonObject.name} (#${pokemonObject.id}) 
      is a ${typeDisplay(pokemonObject.types)} type pokemon.</div>
    </div>
    </div>`;
  return cardHtml;
};

// populates the page with a (filtered) pokemon array
const populatePage = (pokemonArray) => {
  cardContainer.innerHTML = pokemonArray
    .map((pokemon) => makeCardHTML(pokemon))
    .join("");
};
populatePage(pokemonArray);
//populates a dropdown of types
const typesArr = [ "Bug", "Dragon", "Electric", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Water"]
const populatePageSelect = (typesArr) =>{
    dropdown.innerHTML = typesArr.map((type)=>`<option value=${type}>${type}</option>`)
}
populatePageSelect(typesArr)
let filteredPokemonArr = [...pokemonArray];
let typeSortedPokemonArr = [...pokemonArray];

// Handles Name Search
const handleNameSearch = (event) => {
  filteredPokemonArr = typeSortedPokemonArr.filter((pokemonObject) => {
    const searchTerm = event.target.value;
    return pokemonObject.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  populatePage(filteredPokemonArr);
};

const handleNumbers = (event) => {
  filteredPokemonArr = typeSortedPokemonArr.filter(
    (pokemonObject) => pokemonObject.id <= event.target.value
  );
  populatePage(filteredPokemonArr);
};

const handleTypeSearch = (event) => {
  filteredPokemonArr = typeSortedPokemonArr.filter((pokemonObject) => {
    const searchTerm = event.target.value;
    return pokemonObject.types
      .join("")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });
  populatePage(filteredPokemonArr);
};

const handleCheck = (event) => {
  if (event.target.checked) {
    // Must use .slice() to stop .sort() from mutating original array.
    // Used inline if else statement for sorting
    typeSortedPokemonArr = pokemonArray
      .slice()
      .sort((pokemonA, pokemonB) =>
      pokemonA.types[0] < pokemonB.types[0] ? -1 : pokemonA.types[0] > pokemonB.types[0] ? 1 : 0
      );
    populatePage(typeSortedPokemonArr);
  } else {
    typeSortedPokemonArr = [...pokemonArray];
    populatePage(typeSortedPokemonArr);
  }
};

// const handleDropDown = (event) => {
//     ilteredPokemonArr = typeSortedPokemonArr.filter((pokemonObject) => {
//         const searchTerm = event.target.value;
//         return pokemonObject.types
//           .join("")
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase());
//       });
//       populatePage(filteredPokemonArr);
// }

inputType.addEventListener("input", handleTypeSearch);

inputName.addEventListener("input", handleNameSearch);

inputNumber.addEventListener("input", handleNumbers);

typeCheckBox.addEventListener("click", handleCheck);

dropdown.addEventListener("click", handleTypeSearch);
