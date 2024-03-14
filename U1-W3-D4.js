document.addEventListener("DOMContentLoaded", function () {
  const mainTable = document.getElementById("mainTable")
  const playerTablesContainer = document.getElementById("playerTablesContainer")
  const extractionButton = document.getElementById("extractionButton")
  const refreshButton = document.getElementById("refreshButton")
  const numPlayerTablesInput = document.getElementById("numPlayerTables")
  const numPlayerTablesForm = document.getElementById("numPlayerTablesForm")
  const cellsMain = []
  const cellsPlayer = []
  const extractedNumbers = new Set()

  // Funzione per creare una "cella" (div) dentro la tabella (div con dentro classe e id table)
  function createCell(textContent) {
    const cell = document.createElement("div")
    cell.textContent = textContent
    cell.classList.add("cell")
    return cell
  }

  // Funzione per creare una tabellina per gli utenti con numeri casuali da 1 a 76
  function createPlayerTable() {
    const playerTable = document.createElement("div")
    playerTable.classList.add("table", "playerTable")
    const cells = []

    // Genera 24 numeri casuali unici alle tabelline degli utenti
    const uniqueNumbers = new Set()
    while (uniqueNumbers.size < 24) {
      uniqueNumbers.add(Math.floor(Math.random() * 76) + 1)
    }

    // Aggiunge le celle alla tabellina del giocatore
    uniqueNumbers.forEach((number) => {
      const cell = createCell(number)
      cells.push(cell)
      playerTable.appendChild(cell)
    })

    return { playerTable, cells }
  }

  // Funzione per evidenziare la cella corrispondente al numero estratto
  function highlightCell(number, cells) {
    cells.forEach((cell) => {
      if (parseInt(cell.textContent) === number) {
        cell.classList.add("highlight")
      }
    })
  }

  // Gestione del click sul bottone "Estrai Numero"
  extractionButton.addEventListener("click", function () {
    if (extractedNumbers.size < 76) {
      let drawnNumber
      do {
        drawnNumber = Math.floor(Math.random() * 76) + 1
      } while (extractedNumbers.has(drawnNumber))

      highlightCell(drawnNumber, cellsMain)
      highlightCell(drawnNumber, cellsPlayer)
      extractedNumbers.add(drawnNumber)
    } else {
      alert("Sono stati estratti tutti i numeri!")
    }
  })

  // Gestione del submit del form per generare le tabelline del giocatore
  numPlayerTablesForm.addEventListener("submit", function (event) {
    event.preventDefault()
    const numTables = parseInt(numPlayerTablesInput.value)
    playerTablesContainer.innerHTML = "" 
    for (let i = 0; i < numTables; i++) {
      const { playerTable, cells } = createPlayerTable()
      playerTablesContainer.appendChild(playerTable)
      cellsPlayer.push(...cells)
    }
  })

  // Gestione del click sul bottone "Nuova Partita"
  refreshButton.addEventListener("click", function () {
    location.reload() 
  })

  // Crea le celle del tabellone main
  for (let i = 1; i <= 76; i++) {
    const cell = createCell(i)
    cellsMain.push(cell)
    mainTable.appendChild(cell)
  }
})
