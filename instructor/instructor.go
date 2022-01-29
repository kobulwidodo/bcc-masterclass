package instructor

import (
	"bcc-masterclass/databasecourse"
	"bcc-masterclass/databaseinstructor"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Instructor struct {
	Nama string `json:"nama" binding:"required"`
	Kode string `json:"kode" binding:"required"`
}

func NewInstructor(c *gin.Context) {
	var instructor Instructor
	err := c.BindJSON(&instructor)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	cek := databaseinstructor.CreateInstructor(instructor.Nama, instructor.Kode)
	if !cek {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Database rusak atau instructor sudah ada silahkan hubungi admin",
		})
		return
	}
	c.JSON(http.StatusAccepted, gin.H{
		"status":  "success",
		"message": "instructor berhasil ditambahkan",
	})
}

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
