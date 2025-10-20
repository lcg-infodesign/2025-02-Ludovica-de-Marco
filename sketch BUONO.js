let drawFunctions = [];
let colorPalette = [];
let table;

function preload() {
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {
  let outerpadding = 20; //bordo esterno
  let padding = 20; //spazio tra gli elementi
  let itemsize = 30;
  let glyphSize = itemsize + padding;

  //con queste dimensioni, quante colonne ci stanno?
  let columns = floor((windowWidth - outerpadding * 2) / glyphSize);
  let usedWidth = columns * itemsize + (columns - 1) * padding;
  let startX = (windowWidth - usedWidth) / 2;

  let rows = ceil(table.getRowCount() / columns);
  let totalHeight = rows * itemsize + (rows - 1) * padding + outerpadding * 2;

  createCanvas(windowWidth, totalHeight);
  background("#faf6f6ff");
  blendMode(BURN);

  // Palette colori
  colorPalette = [
    color(230, 0, 75),
    color(0, 150, 200),
    color(100, 200, 50),
    color(255, 180, 0),
    color(150, 50, 180),
  ];

  drawFunctions = [drawRandomPixelCluster];

  // Calcolo dei valori
  let allValues = table.getColumn("column0").map(v => abs(float(v)));
  let minVal = min(allValues);
  let maxVal = max(allValues);

  let columnsCount = 0;
  let rowsCount = 0;

  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    let valore = abs(float(row.get("column0"))); 

    // numero di pixel (in un range di 20-40) da disegnare in base ai valori nel csv
    let pixelCount = floor(map(valore, minVal, maxVal, 20, 40));
    pixelCount = constrain(pixelCount, 20, 40);

    let x = startX + columnsCount * (itemsize + padding);
    let y = outerpadding + rowsCount * (itemsize + padding);

    push();
    translate(x + itemsize / 2, y + itemsize / 2);
    drawRandomPixelCluster(itemsize, pixelCount);
    pop();

    columnsCount++;
    if (columnsCount == columns) {
      columnsCount = 0;
      rowsCount++;
    }
  }
}

function draw() {
  // non serve stavolta :)
}

function drawRandomPixelCluster(size, pixelCount) {
  noStroke();
  strokeWeight(0);

  let pixelGrid = floor(random(7, 7));
  let pixelSize = size / pixelGrid;

  let maxPixels = constrain(pixelCount, 1, pixelGrid * pixelGrid);

  for (let i = 0; i < maxPixels; i++) {
    let r = floor(random(pixelGrid));
    let c = floor(random(pixelGrid));
    let pixelColor = random(colorPalette);
    fill(pixelColor);

    let offsetX = -size / 2;
    let offsetY = -size / 2;

    rect(offsetX + c * pixelSize, offsetY + r * pixelSize, pixelSize, pixelSize);
  }
}
