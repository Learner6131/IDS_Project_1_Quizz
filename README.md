# IDS_Project_1_Quizz
IDS PROJECT
QUIZZ APP
Quizz starts from main it includes search function
It gets the categeory variable and redirects to the difficulty page
On this page difficulty is selected and stored in local variable
And directs to quiz page

Now the main Quizz page
It uses the API based on categeory and difficulty
Then data is extracted from the API and stored in questions array
startGame() functions starts the game in which availableQuestions are stored
and getNewQuestions are called this function will execute till the questionCounter is equal to the our defined max_numbers_questions
then questions and choices are displayed on the pages
and by applying the click on each choice correct choice is checked and if it is correct then it is displayed in green and if wrong then in red by classList.add once it is checked then again getNewQuestions is called progress bar is also displayed for each question by using 2 divs

in the getNewQuestions start function is also called which will start the timer and update will be called this will get the acutal data of timer and elapsedTime will be updated in the page and once the choice is selected elapsed time will be stoped time for each question will be displayed and reset function will reset the time and time will start again by the getNewQuestion

after completing the questions it will redirect to the end page
this will display the users scores and options for play again which will redirect to the main page
