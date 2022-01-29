package main

import (
	"bcc-masterclass/admin"
	"bcc-masterclass/instructor"
	"bcc-masterclass/pengguna"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/", hello)
	router.GET("/user", pengguna.SeeUser)
	router.POST("/user/new", pengguna.AddUser)
	router.POST("/user/edit", pengguna.EditUser)
	router.POST("/user/buy", pengguna.Buy)
	router.POST("/user/buy/history", pengguna.BuyHistory)
	router.POST("/instructor/addcourse", instructor.AddCourse)
	router.POST("/instructor/new", instructor.NewInstructor)
	router.POST("/instructor/delcourse", instructor.DeleteCourse)
	router.POST("/instructor/updatecourse", instructor.UpdateCourse)
	router.POST("/admin/deleteuser", admin.DeleteUser)
	router.POST("/admin/deletecourse", admin.DeleteCourse)
	router.POST("/admin/deleteinstructor", admin.RemoveInstructor)
	router.Run("localhost:8080")
}

func hello(c *gin.Context) {
	c.JSON(200, gin.H{
		"say": "Hello World",
	})
}
