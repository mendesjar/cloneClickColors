window.onload = function(){
    const wrapper = document.getElementById("tiles");

    let columns = 0,
    rows = 0;

    const colors = [
        "#192A8C",
        "#1C92A7",
        "#36D791",
        "#E4DA4B",
        "#7451DF",
        "#E34C4A"
    ]

    let count = -1

    const handleOnClick = index => {
        count = count + 1

        anime({
            targets: ".tile",
            backgroundColor: colors[count % (colors.length - 1)],
            delay: anime.stagger(50, {
                grid: [columns, rows],
                from: index
            }),
        })
    }

    const createTile = index => {
        const tile = document.createElement("div");

        tile.classList.add("tile");

        tile.onclick = e => handleOnClick(index);

        return tile;
    }

    const createTiles = quatity => {
        Array.from(Array(quatity)).map((tile, index) => {
            wrapper.appendChild(createTile(index));
        })
    }

    const createGrid = () => {
        wrapper.innerHTML = "";
        columns = Math.floor(document.body.clientWidth / 50);
        rows = Math.floor(document.body.clientHeight / 50);

        wrapper.style.setProperty("--columns", columns);
        wrapper.style.setProperty("--rows", rows);

        createTiles(columns * rows);
    }

    window.onresize = () => createGrid();
}