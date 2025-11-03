displayActivityCards();

const radioButtons = document.querySelectorAll(".interval");

for (let i = 0; i < radioButtons.length; i++) {
  const radioButton = radioButtons[i];
  radioButton.addEventListener("change", () => {
    const cardGroup = document.getElementById("card-group");
    cardGroup.innerHTML = "";

    displayActivityCards();
  });
}

function displayActivityCards() {
  const cardGroup = document.getElementById("card-group");

  const selected = document.querySelector('input[name="interval"]:checked');

  const value = selected?.value;

  fetch("./data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let html = "";

      for (let i = 0; i < 6; i++) {
        const object = data[i];
        const title = object.title.toLowerCase();
        const current = object.timeframes[value].current;
        const previous = object.timeframes[value].previous;

        html += `
    <div class="card work card${i}">
      <div class="card-color">
        <img src="./images/icon-${title.replaceAll(" ", "-")}.svg" alt="" />
      </div>
      <div class="card-content">
        <div class="card-header">
          <span class="card-title">${title}</span>
          <button>
            <img src="./images/icon-ellipsis.svg" alt="" />
          </button>
        </div>
        <div class="card-details">
          <span class="card-current-hours">${current}hrs</span>
          <span class="card-previous-hours">Last Week - ${previous}hrs</span>
        </div>
      </div>
    </div>
  `;
      }
      cardGroup.innerHTML = html;
    });
}
