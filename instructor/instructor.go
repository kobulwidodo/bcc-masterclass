package instructor

import (
	"bcc-masterclass/databasecourse"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Course struct {
	Judul string `json:"judul" binding:"required"`
	Harga string `json:"harga" binding:"required"`
}

func AddCourse(c *gin.Context) {
	var course Course
	err := c.BindJSON(&course)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	cek := databasecourse.CreateCourse(course.Judul, course.Harga)
	if !cek {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Database rusak atau course sudah ada silahkan hubungi admin",
		})
		return
	}
	c.JSON(http.StatusAccepted, gin.H{
		"status":  "success",
		"message": "course berhasil ditambahkan",
	})
}

func DeleteCourse(c *gin.Context) {
	var course Course
	err := c.BindJSON(&course)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	cek := databasecourse.DeleteCourse(course.Judul)
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

type CourseUpdate struct {
	Judul     string `json:"judul" binding:"required"`
	Harga     string `json:"harga" binding:"required"`
	JudulBaru string `json:"judulBaru"`
	HargaBaru string `json:"hargaBaru"`
}

func UpdateCourse(c *gin.Context) {
	var course CourseUpdate
	err := c.BindJSON(&course)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	cek := databasecourse.UpdateCourse(course.Judul, course.Harga, course.JudulBaru, course.HargaBaru)
	if !cek {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Database rusak atau course sudah ada silahkan hubungi admin",
		})
		return
	}
	c.JSON(http.StatusAccepted, gin.H{
		"status":  "success",
		"message": "course berhasil ditambahkan",
	})
}
