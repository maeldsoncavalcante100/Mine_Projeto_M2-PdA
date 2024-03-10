let allFilms = [];
const emptyFilmList = document.querySelector("#emptyFilmList");
const fields = document.querySelectorAll("input");
const modal = document.querySelector("#myModal");
const modalTitle = document.querySelector("#modalTitle");
const synopsis = document.querySelector("#synopsis");
const txtSynopsis = document.querySelector("#txtSynopsis");
const btnRegister = document.querySelector("#btnRegister");
const btnSearch = document.querySelector("#btnSearch");

function findFilms() {
  return allFilms.findIndex(
    (elem) => elem.filmName === event.target.parentNode.className
  );
}

function showSynopsis(event) {
  if (event.target.id === "btnSinopsys") {
    modalTitle.innerHTML = `Sinopse do filme "${
      allFilms[findFilms()].filmName
    }"`;
    txtSynopsis.innerHTML = allFilms[findFilms()].synopsis;
    modal.style.display = "block";
  }
}

function showError(filmName) {
  const contentModel = document.querySelector("#contentModel");
  modalTitle.innerHTML = `Filme ou Série "${filmName}" não encontrado!`;
  txtSynopsis.innerHTML = "";
  contentModel.style.width = "50%";
  modal.style.display = "block";
}

function closeModal(event) {
  modal.style.display = "none";
}

function closeModalWindow(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

function clearFields() {
  fields.forEach(function (elem) {
    elem.value = "";
  });
  synopsis.value = "";
}

function createCard(
  filmCard,
  filmName,
  nameAuthor,
  yearPublisher,
  numberOfSeason,
  filmCover
) {
  filmCard.className = filmName;
  filmCard.innerHTML = `
    <p id="filmTitle">${filmName}</p>
    <img src="${filmCover}"/>
    Nome do Diretor: ${nameAuthor}
    <br>Ano de Lançamento: ${yearPublisher}
    <br>Duração: ${numberOfSeason}
    <button id="btnSinopsys">Sinopse</button>
    <button id="btnRemove">Remover</button>
    `;
}

function appendElements(divSelect, filmCard) {
  const btnCloseModal = document.querySelector("#btnCloseModal");
  divSelect.append(filmCard);
  divSelect.addEventListener("click", showSynopsis);
  btnCloseModal.addEventListener("click", closeModal);
  window.addEventListener("click", closeModalWindow);
}

function removeCard(parentDiv) {
  return function remove(event) {
    if (event.target.id === "btnRemove") {
      parentDiv.removeChild(event.target.parentNode);
      const indexToRemove = findFilms();
      if (indexToRemove !== -1) {
        allFilms.splice(indexToRemove, 1);
        alert(`Filme ou Série "${event.target.parentNode.className}" removido com sucesso!`);
      }
    }
  };
}

function registerFilm() {
  const listOfAllFilms = document.querySelector("#listOfAllFilms");
  const filmName = document.querySelector("#filmName").value;
  const nameAuthor = document.querySelector("#nameAuthor").value;
  const yearPublisher = document.querySelector("#yearPublisher").value;
  const numberOfSeason = Number(
    document.querySelector("#numberOfSeason").value
  );
  const filmCover = document.querySelector("#filmCover").value;

  event.preventDefault();

  allFilms.push({
    filmName,
    nameAuthor,
    yearPublisher,
    numberOfSeason,
    filmCover,
    synopsis: synopsis.value,
  });

  emptyFilmList.remove();
  const filmCard = document.createElement("div");

  createCard(
    filmCard,
    filmName,
    nameAuthor,
    yearPublisher,
    numberOfSeason,
    filmCover
  );
  appendElements(listOfAllFilms, filmCard);

  const remove = removeCard(listOfAllFilms);
  listOfAllFilms.addEventListener("click", remove);

  clearFields();
}

function searchFilm() {
  const filmNameSearch = document.querySelector("#filmNameSearch").value;
  const listOfFilmsSearch = document.querySelector("#listOfFilmsSearch");
  const foundFilms = document.querySelector("#foundFilms");
  const filmCard = document.createElement("div");

  foundFilms.innerHTML = "";
  listOfFilmsSearch.append(foundFilms);

  const findFilmsArray = allFilms.filter((elem) => elem.filmName === filmNameSearch);

  if (findFilmsArray.length !== 0) {
    findFilmsArray.forEach((elem) => {
      createCard(
        filmCard,
        elem.filmName,
        elem.nameAuthor,
        elem.yearPublisher,
        elem.numberOfSeason,
        elem.filmCover
      );
      appendElements(foundFilms, filmCard);
    });
  } else {
    showError(filmNameSearch);
  }

  const remove = removeCard(foundFilms);
  listOfFilmsSearch.addEventListener("click", remove);

  clearFields();
}

btnRegister.addEventListener("click", registerFilm);
btnSearch.addEventListener("click", searchFilm);
