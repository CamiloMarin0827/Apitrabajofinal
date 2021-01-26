
let question_correct = [];
let question_correctC = [];

function getCategories() {
  const url = "https://opentdb.com/api_category.php";
  fetch(url)
    .then((response) => response.json())
    .then((data) => printCategories(data.trivia_categories));
}

function getQuestions() {
  const totalQuestions = document.getElementById("total-questions").value;
  const category = document.getElementById("select-category").value;
  const difficulty = document.getElementById("total-difficulty").value;
  const type = document.getElementById("total-type").value;
  fetch(
    `https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`
  )
    .then((response) => response.json())
    .then((data) => printData(data));
}

function printData(data) {
  question_correctC = [];
  let question_correct = [];

  if (question_correctC.length > 0) {
    console.log(question_correctC);
  } else {
    console.log("arreglo vacio");
    console.log(question_correctC);
  }
  const selectT = document.getElementById("total-type").value;
  const container2 = document.getElementById("container2");
  container2.lastElementChild.innerHTML = "";
  for (let i = 0; i < data.results.length; i++) {
    question_correct.push(data.results[i].correct_answer);
  }

  question_correctC.push(...question_correct);

  question_correct = [];

  if (data.response_code == 0) {
    if (selectT === "multiple") {
      for (let i = 0; i < data.results.length; i++) {
        let copy = [];
        copy.push(...data.results[i].incorrect_answers);
        let dato = Math.round(Math.random() * 3);
        copy.splice(dato, 0, data.results[i].correct_answer);
        container2.lastElementChild.innerHTML += `<div class="col-md-6 "  style="margin: auto; margin-top: 30px;">
                                                    <div class="card">
                                                      <div class="card-body">
                                                        ${data.results[i].question}
                                                      </div>
                                                      <div class="text-center">
                                                        <select id="Value-select${i}" style="width: 30%; display: inline-block;" class="mb-3 form-select" aria-label="Default select example" required>
                                                          <option></option>
                                                          <option id="${copy[0]}" value="${copy[0]}">${copy[0]}</option>
                                                          <option id="${copy[1]}" value="${copy[1]}">${copy[1]}</option>
                                                          <option id="${copy[2]}" value="${copy[2]}">${copy[2]}</option>
                                                          <option id="${copy[3]}" value="${copy[3]}">${copy[3]}</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                  </div>`;
                                                       
      }
      container2.lastElementChild.innerHTML += `<button id="buttonC" class="btn btn-primary button-add">Enviar respuestas</button>`;
    } else {
      let booleano = ["False", "True"];
      for (let i = 0; i < data.results.length; i++) {
        container2.lastElementChild.innerHTML += `<div class="col-md-6 mb-3" style="margin: auto; margin-top: 30px;">
                                                    <div class="card">
                                                      <div class="card-body">
                                                        ${data.results[i].question}
                                                      </div>
                                                      <div class="text-center">
                                                        <select id="Value-select${i}" style="width: 30%; display: inline-block;" class="mb-3 form-select" aria-label="Default select example" required>
                                                        <option></option> 
                                                          <option id="${booleano[0]}" value="${booleano[0]}">${booleano[0]}</option>
                                                          <option id="${booleano[1]}" value="${booleano[1]}">${booleano[1]}</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                  </div>`;
      }
      container2.lastElementChild.innerHTML += `<button id="buttonC" class="mb-3 btn btn-primary button-add form-check">Enviar respuestas</button>`;
    }
  } else {
    container2.lastElementChild.innerHTML += `<div class="col-md-6" style="margin: auto;">
                                                  <div class="alert alert-info">
                                                      <div class="alert-body">
                                                        Sin resultados, no se pudieron devolver los resultados. La API no tiene suficientes preguntas para su consulta. (Por ejemplo, pedir 50 preguntas en una categoría que solo tiene 20)
                                                      </div>
                                                  </div>
                                              </div>`;
  }
}

function printCategories(categories) {
  const categoriesContainer = document.getElementById("select-category");
  categories.forEach((category) => {
    categoriesContainer.innerHTML += `<option value="${category.id}">${category.name}</option>`;
  });
}

function buttonDC() {
  const selec = document.getElementById("total-type").value;
  const form2 = document.getElementById("questions-container");
  let mas = 0;

  console.log(question_correctC);
  if (selec == "boolean") {
    for (let i = 0; i < question_correctC.length; i++) {
      console.log(document.getElementById(`Value-select${i}`).value);
      if (
        document.getElementById(`Value-select${i}`).value ===
        question_correctC[i]
      ) {
        mas++;
      }
    }
  } else {
    for (let i = 0; i < question_correctC.length; i++) {
      if (
        document.getElementById(`Value-select${i}`).value ===
        question_correctC[i]
      ) {
        mas++;
      }
    }
  }
  form2.innerHTML = "";
  form2.innerHTML = `<div class="col-md-6" style="margin: auto;">
                          <div class="alert alert-info">
                              <div class="alert-body">
                                  Tienes ${mas} respuestas correctas de un total de ${question_correctC.length} preguntas.
                              </div>
                          </div>
                    </div>`;

  question_correctC = [];
}

getCategories();




