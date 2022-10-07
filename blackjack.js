function boardStart() {
  document.querySelector(".firstImage").src = ""
  if (getCards.classList = "show-Cards") {
    getCards.classList = "Cards"
    setTimeout(doThis, 600)
  }
  else {
    doThis()
  }
  return 
}


async function doThis() {
  document.getElementById("shuffleImage").src = "background/snoopyshuffling.gif"
  setTimeout(stopShuffleStartGAME, 2750)
  async function stopShuffleStartGAME() {
    document.getElementById("shuffleImage").src = ""
  await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
    .then(response => {
      console.log("Connected to API")
    return response.json()
  })
    .then(data => {
      deckInfo = data
    return deckInfo
  })
  getCards.classList = "show-Cards"
  fetch("https://www.deckofcardsapi.com/api/deck/" + deckInfo.deck_id + "/draw/?count=3")
    .then(response => {
      console.log("Drawing enabled")
      return response.json()
    })
    .then(data => {
      for (let i = 0; i < 3; i++){
        if (i === 0) {
          document.getElementById("p1").childNodes[0].src = data.cards[i].image
          if (data.cards[i].value === "KING" || data.cards[i].value === "QUEEN" || data.cards[i].value === "JACK") {
            playerCard1 = 10
          }
          else if (data.cards[i].value === "ACE") {
            playerCard1 = 11
          }
          else {
            playerCard1 = data.cards[i].value
          }
        }
        if (i === 1) {
          document.getElementById("p2").childNodes[0].src = data.cards[i].image
          if (data.cards[i].value === "KING" || data.cards[i].value === "QUEEN" || data.cards[i].value === "JACK") {
            playerCard2 = 10
          }
          else if(data.cards[i].value === "ACE") {
            playerCard2 = 11
          }
          else {
            playerCard2 = data.cards[i].value
          }
        }
        if (i === 2) {
          document.getElementById("c1").childNodes[0].src = data.cards[i].image
          if (data.cards[i].value === "KING" || data.cards[i].value === "QUEEN" || data.cards[i].value === "JACK") {
            computerCard1 = 10
          }
          else if (data.cards[i].value === "ACE") {
            computerCard1 = 11  
          }
          else {
            computerCard1 = data.cards[i].value
          }
        }
      }
      document.getElementsByClassName("PLAYERSCORE")[0].innerText = (parseFloat(playerCard1) + parseFloat(playerCard2))
      document.getElementsByClassName("CPUSCORE")[0].innerText = (parseFloat(computerCard1))
    })
    return
  }
  return
}
hitNumber = 2
async function hitDeck() {
  hitNumber++ 
  fetch("https://www.deckofcardsapi.com/api/deck/" + deckInfo.deck_id + "/draw/?count=1")
    .then(response => {
      return response.json()
    })
      .then(data => {
      if (data.cards[0].value === "JACK" || data.cards[0].value === "KING" || data.cards[0].value === "QUEEN") {
        addValue = 10
      }
      else if (data.cards[0].value === "ACE") {
        addValue = 11
      }
      else {
        addValue = data.cards[0].value
      }
      
      parseFloat(addValue)
      thisHitNumber = "p" + hitNumber
      newHitImage = data.cards[0].image
      document.getElementById(thisHitNumber).childNodes[0].src = newHitImage
      document.getElementsByClassName("PLAYERSCORE")[0].innerText = parseFloat(document.getElementsByClassName("PLAYERSCORE")[0].innerText) + parseFloat(addValue)
      if (document.getElementsByClassName("PLAYERSCORE")[0].innerText > 21) {
        hitNumber = 2
        ToggleModal()
      }
      return 
      })
  return
}
