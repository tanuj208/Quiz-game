# Welcome to MyQuizApp!

# Introduction to the project:
I have to written a Go server that implements REST API and interacts with the database at the backend. The front end is a React application that is an interactive quiz.

Date: 26th September, 2018.
Place: Room 224, Bakul Nivas, IIIT Hyderabad.
Owner: Tanuj Garg

## Features:
- Registration and login for users
- Hashing for password
- Multiple genre of quizzes - Friends, Cricket, General Knowledge, Maths
- Multiple types of questions, image, audio and MCQ.
- Leaderboard
- Attempted quiz history
- Admin privileges to one user. He has privilege to do the following:
    - View/Create/Delete quizzes
    - Create/Delete/Edit questions/options in each quiz
    - View all users
    - Delete users
- Login through Google handle.

## Running the program:
- Running the react app:
	- Go to the "react-app" folder and run yarn start
    - `yarn start`
- Running the Go server:
    - Go to the go/src folder and run `go run` command
	- `go run API.go`
The app will start on your default browser.

## Go packages used:
- "fmt"
- "strconv"
- "golang.org/x/crypto/bcrypt"
- "github.com/gin-contrib/cors"
- "github.com/gin-gonic/gin"
- "github.com/jinzhu/gorm"
- _ "github.com/jinzhu/gorm/dialects/sqlite"
- _ "github.com/mattn/go-sqlite3"
