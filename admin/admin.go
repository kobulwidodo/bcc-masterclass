package admin

import (
	"bcc-masterclass/databaseadmin"
	"net/http"

	"github.com/gin-gonic/gin"
)

type User struct {
	Name string `json:"name" binding:"required"`
}

func DeleteUser(c *gin.Context) {
	var user User
	err := c.BindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	cek := databaseadmin.DeleteUser(user.Name)
	if !cek {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Database rusak atau user tidak ada",
		})
		return
	}
	c.JSON(http.StatusAccepted, gin.H{
		"status":  "success",
		"message": "pengguna berhasil dihapus",
	})
}

type Course struct {
	Judul string `json:"judul" binding:"required"`
}

func DeleteCourse(c *gin.Context) {
	var course Course
	err := c.BindJSON(&course)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	cek := databaseadmin.DeleteCourse(course.Judul)
	if !cek {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Database rusak atau course tidak ada",
		})
		return
	}
	c.JSON(http.StatusAccepted, gin.H{
		"status":  "success",
		"message": "course berhasil dihapus",
	})
}

type Instructor struct {
	Name string `json:"name" binding:"required"`
}

func RemoveInstructor(c *gin.Context) {
	var instructor Instructor
	err := c.BindJSON(&instructor)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	cek := databaseadmin.RemoveInstructor(instructor.Name)
	if !cek {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Database rusak atau instructor tidak ada",
		})
		return
	}
	c.JSON(http.StatusAccepted, gin.H{
		"status":  "success",
		"message": "instructor berhasil dihapus",
	})
}
