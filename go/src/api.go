package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	_ "github.com/mattn/go-sqlite3"
)

var db *gorm.DB
var err error

type User struct {
	ID uint `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Quiz struct {
	ID uint `json:"id"`
	Name string `json:"name"`
	Genre string `json:"genre"`

}

type Question struct {
	ID uint `json:"id"`
	// Quiz Quiz `gorm:"foreignkey:qId;association_foreignkey:ID"`
	Statement string `json:"statement"`
	Opa string `json:"opa"`
	Opb string `json:"opb"`
	Opc string `json:"opc"`
	Opd string `json:"opd"`
	Ansa bool `json:"ansa"`
	Ansb bool `json:"ansb"`
	Ansc bool `json:"ansc"`
	Ansd bool `json:"ansd"`
	QId uint `sql:"type:bigint REFERENCES quizzes(ID) ON DELETE CASCADE";json:"qid"`
}

func main () {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

    db.LogMode(true)
    db.Exec("PRAGMA foreign_keys = ON")
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Quiz{})
	db.AutoMigrate(&Question{})
	r := gin.Default()
	r.POST("/signin", CheckDetails)
	r.POST("/register", RegisterDetails)
	r.GET("/viewUsers", View_Users )
	r.GET("/viewQuizzes", View_Quizzes)
	r.DELETE("/viewUsers/:id", DeletePerson)
	r.DELETE("/viewQuizzes/:id", DeleteQuiz)
	r.POST("/createQuiz", AddQuiz)
	r.GET("/editQuiz/:quizName", GetQuiz)
	r.POST("/editQuiz/:quizName", AddQues)
	r.POST("/editQues/:quizName/:qid", EditQues)
	r.GET("/editQues/:quizName/:qid", GetQues)
	r.DELETE("/editQuiz/:quizName/:qid", DeleteQues)
	r.Use((cors.Default()))
	r.Run(":8080")
}

func DeleteQues(c *gin.Context) {
	id := c.Params.ByName("qid")
	var q Question
	db.Where("id = ?", id).Delete(&q)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeletePerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person User
	db.Where("id = ?", id).Delete(&person)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeleteQuiz(c *gin.Context) {
	id := c.Params.ByName("id")
	var q Quiz
	db.Where("id = ?", id).Delete(&q)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func View_Users(c *gin.Context) {
	var people []User
	if err := db.Find(&people).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else { 
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, people)
	}
}

func View_Quizzes(c *gin.Context) {
	var q []Quiz
	if err := db.Find(&q).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, q)
	}
}

func GetQues(c *gin.Context) {
	var ques Question
	qid := c.Params.ByName("qid")
	err := db.Where("id = ?", qid).First(&ques).Error
	if (err != nil) {
		fmt.Println(err)
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, ques)
}

func GetQuiz(c *gin.Context) {
	var quiz Quiz
	quizName := c.Params.ByName("quizName")
	db.Where(&Quiz{Name : quizName}).First(&quiz)
	var questions []Question
	db.Where(&Question{QId : quiz.ID}).Find(&questions)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, questions)
}


func CheckDetails(c *gin.Context){
	var user2 User
	c.BindJSON(&user2)

	if(user2.Username == "" || user2.Password == "") {
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, gin.H{
			"error" : "Fields can't be empty",
		})
		return
	}

	var user User
	err := db.Where(&User{Username : user2.Username, Password : user2.Password}).First(&user).Error
	if  err != nil {
	c.Header("access-control-allow-origin", "*")
	c.JSON(400, gin.H{
		"error" : "Invalid Email/Password",
	})
	} else
	{
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, user)
	}
}

func RegisterDetails(c *gin.Context) {
	var user2 User
	c.BindJSON(&user2)

	if(user2.Username == "" || user2.Password == "") {
		// fmt.Println("inside block");
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, gin.H{
			"error" : "Fields can't be empty",
		})
		return
	}

	var user User
	err := db.Where(&User{Username : user2.Username}).First(&user).Error
	if err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, gin.H{
			"error" : "Username exists",
		})
	} else
	{
		c.Header("access-control-allow-origin", "*")
		db.Create(&user2)
		c.JSON(200, user)
	}
}

func AddQuiz(c *gin.Context) {
	var quiz2 Quiz
	c.BindJSON(&quiz2)

	if(quiz2.Name == "") {
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, gin.H{
			"error" : "Name can't be empty",
		})
	}

	var quiz Quiz
	err := db.Where(&Quiz{Name : quiz2.Name}).First(&quiz).Error
	if err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, gin.H{
			"error" : "Quizname exists",
		})
	} else
	{
		c.Header("access-control-allow-origin", "*")
		db.Create(&quiz2)
		c.JSON(200, quiz)
	}
}

func EditQues(c *gin.Context) {
	var ques Question
	id := c.Params.ByName("qid")

	db.Where("id = ?", id).First(&ques)
	c.BindJSON(&ques)

	if(ques.Statement == "" || ques.Opa == "" || ques.Opb == "" || ques.Opc == "" || ques.Opd == "") {
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, gin.H{
			"error" : "Fields can't be empty",
		})
		return;
	}
	if(ques.Ansa == false && ques.Ansb == false && ques.Ansc == false && ques.Ansd == false) {
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, gin.H{
			"error" : "Atleast one answer should be ticked",
		})
		return;
	}

	db.Save(&ques)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, ques)
}

func AddQues(c *gin.Context) {
	var ques Question
	quizName := c.Params.ByName("quizName")
	var q Quiz
	db.Where("name = ?", quizName).First(&q)
	ques.QId = q.ID
	c.Header("access-control-allow-origin", "*")
	db.Create(&ques)
	db.Last(&ques)
	c.JSON(200,ques.ID)
}