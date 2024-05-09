/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:

Get the value of the input text element.  
You will take in the text input , convert it to all lowercase and generate some text statistics based on the input.
You will calculate the following statistics based on the text:
Original Input: you will just show the input that the user entered (see below)
Total Number Letters: total number of letter characters in the text ,
Total Number of Non-Letters: total number of non-letters in the text (including spaces),
Total Number of Vowels: total number of vowels in the text (not counting y),
Total Number of Consonants: total number of consonants in the text (counting y),
Total Number of Words: total number of words in the text; a word is defined as any sequence of letters broken by any not-letter. For example, the phrase to-do is two words; a word does not start until a letter appears,
Total Number of Unique Words: total number of unique words that appear in the lowercased text, if a word appears multiple times in the text, you count one occurrence of the word as a unique word.
Total Number of Long Words: number of words in the text that are 6 or more letters long; this is a total count of individual words, not unique words,
Total Number of Short Words: number of words in the text that are 3 or less letters long; this is a total count of individual words, not unique words
*/
(function() {
    const validateInput = (input) => {
      if (!input) throw `please provide an input`;
      else if(typeof input != "string" || input.trim() == "") {
        throw `input must be a non empty string`;
      }
    }
    const totalNumberOfLetters = (text) => {
      text = text.toLowerCase();
      let letters = 'abcdefghijklmnopqrstuvwxyz';
      let numLetters = 0;
      for (let i = 0; i < text.length; i++) {
        if (letters.includes(text[i])) {
          numLetters++;
        }
      }
      return numLetters;
    }
    const totalNumberOfNonLetters = (text) => {
      return text.length - totalNumberOfLetters(text);
    }
    const totalNumberOfVowels = (text) => {
      text = text.toLowerCase();
      let vowels = 'aeiou';
      let numVowels = 0;
      for (let i = 0; i < text.length; i++) {
        if (vowels.includes(text[i])) {
          numVowels++;
        }
      }
      return numVowels;
    }
    const totalNumberOfConsonants = (text) => {
      return totalNumberOfLetters(text) - totalNumberOfVowels(text);
    }
    const totalNumberOfWords = (text) => {
      return getWords(text).length;
    }
    const totalNumberOfLongWords = (text) => {
      let textList = getWords(text);
      let numLongWords = 0;
      textList.forEach(element => {
        if (element.length >= 6) {
          numLongWords++;
        }
      });
      return numLongWords;
    }
    const totalNumberOfShortWords = (text) => {
      let textList = getWords(text);
      let numShortWords = 0;
      textList.forEach(element => {
        if (element.length <= 3) {
          numShortWords++;
        }
      });
      return numShortWords;
    }
    const totalNumberOfUniqueWords = (text) => {
      let textList = getWords(text.toLowerCase());
      let dictionary = {};
      for (let i = 0; i < textList.length; i++) {
        console.log(textList[i]);
        if (textList[i] in dictionary) {
          dictionary[textList[i]] = dictionary[textList[i]] + 1;
        } else {
          dictionary[textList[i]] = 1;
        }
      } 
      console.log(Object.keys(dictionary));
      return Object.keys(dictionary).length;
    }
    const getWords = (text) => {
      let nonLetters = ",~`1!2@3#4$5%6^7&8*9(0)-_=+[{]}\\;:'\"<.>/?";
      for (let i = 0; i < nonLetters.length; i++) {
        text = text.split(nonLetters[i]).join(' ');
      }
      let temp = text.split(' ');
      let wordList = [];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] != "") {
          wordList.push(temp[i]);
        }
      }
      return wordList;
    }
    const form = document.getElementById("submit_form");
    const output = document.getElementById('text_output');
    const error = document.getElementById('error-msg');

    if (form) {
      form.addEventListener('submit', (event) => {
      event.preventDefault();
      try {
        output.classList.add('hidden');
        error.classList.add('hidden');
        let textToAnalyze = document.getElementById('text_to_analyze').value;
        validateInput(textToAnalyze);
        let dataList = document.createElement("dl");
        let ogInput = document.createElement("dt");
        ogInput.textContent = "Original Input";
        let text = document.createElement("dd");
        text.textContent = textToAnalyze;
        // ogInput.appendChild(text);
        dataList.appendChild(ogInput);
        dataList.appendChild(text);
        let numLetters = document.createElement("dt");
        numLetters.textContent = "Total Number of Letters";
        let letters = document.createElement("dd");
        letters.textContent = totalNumberOfLetters(textToAnalyze);
        // numLetters.appendChild(letters);
        dataList.appendChild(numLetters);
        dataList.appendChild(letters);
        let numNonLetters = document.createElement("dt");
        numNonLetters.textContent = "Total Number of Non-Letters";
        let nonLetters= document.createElement("dd");
        nonLetters.textContent = totalNumberOfNonLetters(textToAnalyze);
        // numNonLetters.appendChild(nonLetters);
        dataList.appendChild(numNonLetters);
        dataList.appendChild(nonLetters);
        let numVowels = document.createElement("dt");
        numVowels.textContent = "Total Number of Vowels";
        let vowels = document.createElement("dd");
        vowels.textContent = totalNumberOfVowels(textToAnalyze);
        // numVowels.appendChild(vowels);
        dataList.appendChild(numVowels);
        dataList.appendChild(vowels);
        let numConsonants = document.createElement("dt");
        numConsonants.textContent = "Total Number of Consonants";
        let consonants = document.createElement("dd");
        consonants.textContent = totalNumberOfConsonants(textToAnalyze);
        // numConsonants.appendChild(consonants);
        dataList.appendChild(numConsonants);
        dataList.appendChild(consonants);
        let numWords = document.createElement("dt");
        numWords.textContent = "Total Number of Words";
        let words = document.createElement("dd");
        words.textContent = totalNumberOfWords(textToAnalyze);
        // numWords.appendChild(words);
        dataList.appendChild(numWords);
        dataList.appendChild(words);
        let numUniqueWords = document.createElement("dt");
        numUniqueWords.textContent = "Total Number of Unique Words";
        let uniqueWords = document.createElement("dd");
        uniqueWords.textContent = totalNumberOfUniqueWords(textToAnalyze);
        // numUniqueWords.appendChild(uniqueWords);
        dataList.appendChild(numUniqueWords);
        dataList.appendChild(uniqueWords);
        let numLongWords = document.createElement("dt");
        numLongWords.textContent = "Total Number of Long Words";
        let longWords = document.createElement("dd");
        longWords.textContent = totalNumberOfLongWords(textToAnalyze);
        // numLongWords.appendChild(longWords);
        dataList.appendChild(numLongWords);
        dataList.appendChild(longWords);
        let numShortWords = document.createElement("dt");
        numShortWords.textContent = "Total Number of Short Words";
        let shortWords = document.createElement("dd");
        shortWords.textContent = totalNumberOfShortWords(textToAnalyze);
        // numShortWords.appendChild(shortWords);
        dataList.appendChild(numShortWords);
        dataList.appendChild(shortWords);
        output.appendChild(dataList);
        output.classList.remove('hidden');
        error.hidden = true;
      } catch (e) {
        error.firstChild.textContent = e;
        error.hidden = false;
      }
  });
    }    
})();
