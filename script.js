window.onload = function () {
  const wrapper = document.getElementById("tiles");

  let columns = 0,
    rows = 0;

  const randomHexColorCode = () => {
    let hexCode = (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
    return "#" + hexCode;
  };

  let count = -1;

  const handleOnClick = (index) => {
    count = count + 1;

    anime({
      targets: ".tile",
      backgroundColor: randomHexColorCode(),
      delay: anime.stagger(50, {
        grid: [rows, columns],
        from: index,
      }),
      update: ({ progress }) => {
        const tiles = wrapper.querySelectorAll(".tile");
        const canInteract = progress >= 50;
        tiles.forEach(
          (tile) => (tile.style.pointerEvents = canInteract ? "auto" : "none")
        );
      },
    });
  };

  const createTile = (index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.onclick = (e) => handleOnClick(index);
    return tile;
  };

  const createTiles = (quatity) => {
    Array.from(Array(quatity)).map((_, index) => {
      wrapper.appendChild(createTile(index));
    });
  };

  const createGrid = () => {
    wrapper.innerHTML = "";
    columns = Math.floor(document.body.clientWidth / 50);
    rows = Math.floor(document.body.clientHeight / 50);

    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);

    createTiles(columns * rows);
  };

  window.onresize = () => createGrid();
  createGrid();
};
