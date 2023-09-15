document.addEventListener("DOMContentLoaded", () =>{
    createSquares()

    let keys = document.querySelectorAll(".keyboard-row button")
    let guessedWords = [[]] //guessed words into this list 
    let word = "HEYLO"
    let availableSpace = 1
    let guessedWordCount =0;

    function getCurrentWordArr() { //gives you the current word you're entering
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function getTileColor(letter, index){
        letterAtPos = word.charAt(index); 
        if (!word.includes(letter)) {
            //console.log('gray')
            return "rgb(58,58,60)";
        }
        else{
            if (letterAtPos === letter) {
                //console.log('green'); 
                return "rgb(83, 141, 78)"; 
            }
            else {
                //console.log('yellow'); 
                return "rgb(181, 159, 59)"; 
            }
        }
        
    }

    function submitWord(){
        const currentWordArr = getCurrentWordArr(); 
        if (currentWordArr.length !== 5){
            window.alert("Word length must be 5");
            return; 
        }
        //if (currentWordArr.length == 5) guessedWords.push(currentWordArr)
        let currWord = currentWordArr.join("")
        //console.log(guessedWords.length)
        currWord = currWord.toUpperCase(); 
        list = []; 
        for (let ind = 0; ind<5;ind++) list.push(currWord[ind]); 
        const firstLetterId = guessedWordCount*5 + 1; 
        const interval = 200; 

        list.forEach((letter, index) => {
            setTimeout(() => {
              const tileColor = getTileColor(letter, index);
              const letterId = firstLetterId + index;
              const letterEl = document.getElementById(letterId);
              letterEl.classList.add("animate__flipInX");
              letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
          });
  

        guessedWordCount += 1;
        if (currWord.toUpperCase() === word){
            window.alert("Congratulations you won!!!!!!!!!!!!!!!");
            return; 
        }

        if (guessedWords.length === 6){
            window.alert(`No more tries left, the word is ${word}`)
            return; 
        }
        guessedWords.push([])
    }

    function deleteLetter(){
        const currentWordArr = getCurrentWordArr(); 
        const removed = currentWordArr.pop(); 

        guessedWords[guessedWords.length - 1]  = currentWordArr; 
        const lastEl = document.getElementById(String(availableSpace-1)); 

        lastEl.textContent = ''; 
        availableSpace = availableSpace - 1; 
    }

    function updateGuessedWord(letter){ //takes in the current word letter by letter and prints it
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr && currentWordArr.length<5){
            currentWordArr.push(letter)
        
            const availableSpaceEl = document.getElementById(String(availableSpace));

            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }
    }

    function createSquares(){ //making the 30 squares
        const gameBoard = document.getElementById("board")

        for (let ind = 0; ind<30; ind++){
            let square = document.createElement("div")
            square.classList.add("square")
            square.classList.add("animate__animated"); //for the animation part
            square.setAttribute("id", ind+1) //id of the box is index+1, boxes are identified by numbers
            gameBoard.appendChild(square) 
        }
    }

    for (let ind = 0; ind < keys.length; ind++) { //to make the keys respond when we click on them
        keys[ind].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");
            
            //if (len === 5) 
            if (letter === 'enter'){
                submitWord() //if u press enter submit the word
                return; 
            }

            if (letter === 'del'){ 
                deleteLetter(); 
                return; 
            }
            updateGuessedWord(letter)
        }
        
    }
})