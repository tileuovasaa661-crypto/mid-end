
document.addEventListener("DOMContentLoaded", function () {
  const search = document.getElementById("characterSearch");
  const worldFilter = document.getElementById("worldFilter");
  const grid = document.getElementById("charactersGrid");
  const count = document.getElementById("characterCount");

  if (!search || !grid || !count) return;

  const characters = [
    {
      name: "Coraline Jones",
      image: "images/коралина2.jpeg",
      description: "A curious, brave 11-year-old who would rather explore than sit still — which is exactly how she finds the door.",
      world: "Real World"
    },
    {
      name: "Wybie Lovat",
      image: "images/Wybie.jpeg",
      description: "The talkative neighbor boy who can't stop apologizing — and ends up being Coraline's only real-world ally.",
      world: "Real World"
    },
    {
      name: "The Other Mother",
      image: "images/өтірік мама.jpeg",
      description: "Warm and attentive at first — until Coraline realizes she wants to keep her forever, button eyes and all.",
      world: "Other World"
    },
    {
      name: "The Cat",
      image: "images/кэт2.jpeg",
      description: "A sarcastic stray who can talk in the Other World and walks between both worlds whenever he pleases.",
      world: "Both Worlds"
    },
    {
      name: "Mel & Charlie Jones",
      image: "images/отбасы.jpeg",
      description: "Coraline's real parents — loving, but buried in deadlines and too distracted to notice she's gone missing.",
      world: "Real World"
    },
    {
      name: "Mr. Bobinsky",
      image: "images/бобинский2.jpeg",
      description: "The upstairs neighbor training an acrobatic mouse circus, always sure it will be ready soon.",
      world: "Real World"
    },
    {
      name: "Miss Spink & Miss Forcible",
      image: "images/сестры.jpeg",
      description: "Retired actresses downstairs who read Coraline's fortune in tea leaves and know more than they let on.",
      world: "Real World"
    },
    {
      name: "The Three Ghost Children",
      image: "images/призраки.jpeg",
      description: "Earlier victims of the Other Mother, trapped behind the mirror, warning Coraline not to make their mistake.",
      world: "Other World"
    }
  ];

  function renderCharacters(list) {
    grid.innerHTML = "";

    count.textContent = "Showing " + list.length + " of " +
      characters.length + " characters";

    if (list.length === 0) {
      const message = document.createElement("p");
      message.textContent = "No characters found. Try another name.";
      message.className = "char-card__desc";
      grid.appendChild(message);
      return;
    }

    list.forEach(function (character) {
      const card = document.createElement("article");
      card.className = "char-card";

      const img = document.createElement("img");
      img.className = "char-card__img";
      img.src = character.image;
      img.alt = character.name;

      const title = document.createElement("h3");
      title.className = "char-card__name";
      title.textContent = character.name;

      const description = document.createElement("p");
      description.className = "char-card__desc";
      description.textContent = character.description;

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(description);

      grid.appendChild(card);
    });
  }

  
function applyFilters() {
  const query = search.value.trim().toLowerCase();
  const selectedWorld = worldFilter.value;

  const filtered = characters.filter(function (character) {
    const matchesName = character.name.toLowerCase().includes(query);
    const matchesWorld =
      selectedWorld === "all" || character.world === selectedWorld;

    return matchesName && matchesWorld;
  });

  renderCharacters(filtered);
}

search.addEventListener("input", applyFilters);
worldFilter.addEventListener("change", applyFilters);

applyFilters();  
});