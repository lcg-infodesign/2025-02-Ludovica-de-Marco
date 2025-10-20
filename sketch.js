//VARIABILI GENERALI
let table;

function preload() {
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {

  let outerpadding = 20; //bordo esterno
  let padding = 10; //spazio tra gli elementi
  let itemsize = 30;
  let columnsCount = 0; 
  let rowsCount = 0;

  //con queste dimensioni, quante colonne ci stanno?
  let columns = floor((windowWidth - outerpadding * 2)/(itemsize + padding)); //per arrotondare per difetto uso floor
  let rows = ceil(table.getRowCount()/columns); //per arrotondare per eccesso uso ceil
  let totalHeight = rows * itemsize + (rows-1) * padding + outerpadding * 2;

  createCanvas(windowWidth, totalHeight);
  background(220);
  
  //carico dati riga
  for (let rowNumber = 0; rowNumber < table.getRowCount; rowNumber++){
  let data = table.getRow(rowNumber).obj;
  
  //valore da utilizzare per la grandezza del quadrato
  let value = data("coulumn 0") 

  //valore minimo e max
  let allValues = table.getColumn("column 0");
  let minValue = min(allValues);
  let maxValue = max(allValues);
  //scalo il valore tra 1 e itemsize a seconda del valore
  let scaledValue = map(value, minValue, maxValue, 1, itemsize);

  //secionda variabile per il colore
  let colorValue = data("column 2");
  let allColorValues = table.getColumn("column 2");
  let minColorValue = min(allColorValues);
  let maxColorValue = max(allColorValues);

  let C1 = color("red");
  let C2 = color("blue");
  let scaledColor = map(colorValue, minColorValue, maxColorValue, 0, 1);
  let finalColor = lerpColor(C1, C2, scaledColor);
  fill(finalColor);

  //calcolo posizione x e y
  let xPos = (outerpadding + columnsCount * (itemsize + padding));
  let yPos = (outerpadding + rowsCount * (itemsize + padding));

  rect(xPos, yPos, scaledValue, scaledValue);
  //e ad ogni ciclo aumento di 1 il contatore delle colonne
  
  columnsCount++;

  //controllo se siamo a fine riga, così da andare alla riga successiva
  if (columnsCount == columns); {
    columnsCount = 0; //azzero il contatore delle colonne
    rowsCount++; //aumento il contatore delle righe
    }
  }
}

function draw() {
  // put drawing code here
}
