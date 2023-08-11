/*The first thing would be to get the current time hour, minutes, seconds
then separate the two digits of the minutes to be able to operate them */
function getCurrentTimeComponents() { //Format 24
    const now = new Date(); //Get specific date and time
    const hours = now.getHours(); //Hour contains the time 
    const minutes = now.getMinutes(); //Mminutes contains the minutes 
    const seconds = now.getSeconds();  //Seconds contains the seconds

    const ampm = hours >= 12 ? 'PM' : 'AM'; // We set standard time format hh:mm:ss PM or AM -- if it is greater than or equal to 12 it will be pm but if not then it is less and it will be am
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; //We make sure it is a number from 1 to 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; //In the minutes, if it is less than 10, it will be shown with a 0 before the second digit.
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds; //In seconds, if it is less than 10, it will be displayed with a 0 before the second digit.
    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`; //FormattedTime will store the current time in standard pm or am format

    return { hours, minutes, seconds, formattedTime }; // Able to call any of these
}

/* Function that separates the digits from the minutes */
function getIndividualDigits(number) { //Create function to separate the 2 digits of the minutes
    const digit1 = Math.floor(number / 10); //First digit
    const digit2 = number % 10; // Second digit
    return [digit1, digit2]; //Return the 2 digits
}

/* We listen to the elements of the html */
document.addEventListener("DOMContentLoaded", function () { // When you're listening to the dome
    const button = document.getElementById("mybutton"); //Receive me the mybutton element of the html
    const horaDiv = document.getElementById("output"); //Receive me the output element of the html
    const hour = document.getElementById("hour"); //Receive me the hour element of the html

    /*  */
    function updateClock() { //We create a function with the time formatted to later insert
        const currentTime = getCurrentTimeComponents().formattedTime; //We get the current formatted time and store it in currentTime
        hour.textContent = currentTime; //Actualizamos la hora en el elemento hour
    }
    updateClock(); //Actualizar la hora al cargar la página
    const currentTime = setInterval(updateClock, 1000); //Update time every second

    /* add the event to the button */
    button.addEventListener("click", function () { //We listen to the event of the button mybutton
        const { minutes, seconds } = getCurrentTimeComponents(); //From the function getCurrentTime Components we get minutes, seconds
        const [minute1, minute2] = getIndividualDigits(minutes); //
        const Segundos = seconds; //Only the seconds are stored in the variable
        let num2 = minute2; // Initialize the sequence with the second digit of the minutes
        let num1 = minute1; // Store the first digit of the minutes to calculate the next term
        horaDiv.innerHTML = ""; // Clear old content "insert empty content"

        for (let i = 0; i < Segundos; i++) { //i is worth 1 so that it can count from the second 1 depends on what you want you can modify and it will reach the maximum number of seconds shown
            const nextFibo = num2 + num1; // Calculate the next term of the sequence
            num1 = num2; // Update previous value
            num2 = nextFibo; // Update sequence value

            const output = document.createElement("p"); //We create an element p (paragraph)
            output.textContent = `Segundo ${i}: fibo: ${num2}`; //Inside we put Segundo and fibo
            horaDiv.appendChild(output); //We add it to the we add everything by the element (output)
        }
    });
});
