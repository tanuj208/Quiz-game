package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB
var err error

type User struct {
	ID uint `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

func main () {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&User{})
	r := gin.Default()
	r.POST("/signin", CheckDetails)
	r.POST("/register", RegisterDetails)
	r.Use((cors.Default()))
	r.Run(":8080")
}

func CheckDetails(c *gin.Context){
	username := c.Params.ByName("username")
	password := c.Params.ByName("password")

	if(username == " " || password == " ") {
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, gin.H{
			"error" : "Fields can't be empty",
		})
	}

	var user User
	err := db.Where(&User{Username : username, Password : password}).First(&user).Error
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
	username := c.Params.ByName("username")
	password := c.Params.ByName("password")

	if(username == " " || password == " ") {
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, gin.H{
			"error" : "Fields can't be empty",
		})
	}

	var user User
	err := db.Where(&User{Username : username}).First(&user).Error
	if err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, gin.H{
			"error" : "Username exists",
		})
	} else
	{
		c.Header("access-control-allow-origin", "*")
		user = User{Username : username, Password : password}
		db.NewRecord(user)
		db.Create(&user)
		db.NewRecord(user)
		c.JSON(200, user)
	}
}