# Localstorage Todo App

## Description

A todo-app with some added spice! Try it out online at https://turunenv.github.io/localstorage-todo-app/

## Features

- Data persistence with the browser's local storage
- Responsive design - works smoothly on different screen sizes
- Option to add timer todos

## Run locally
1. Clone the project
2. From the project root, run _**npm install**_
3. Run _**npm run dev**_ -> project will be available at http://localhost:5173/localstorage-todo-app/

## Lessons learned
My first thought was that adding the timer-todos was going to be straight forward after creating the custom timer-hook. This turned out not quite to be the case. 

Whenever the timer was on, but the application tab would be on the background, the timer just fell completely off sync. After some googling I learned that this is due to how web browsers prioritize code-execution - it makes sense that non-active windows are low-priority. 

The solution I came up with was to create state to track changes in the visibility of the window, and then

- take a timestamp and stop the timer when the window becomes unvisible
- calculate the elapsed time, update the timer and restart it when the window becomes visible again

With this solution, we are also able to avoid re-rendering the timer component every second, when the user is unable to see the app.


