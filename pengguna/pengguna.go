package pengguna

import (
	"bcc-masterclass/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

type User struct {
	Name     string `json:"name" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func AddUser(c *gin.Context) {
	var user User
	err := c.BindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	cek := database.CreateUser(user.Name, user.Password)
	if !cek {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Database rusak atau user sudah ada silahkan hubungi admin",
		})
		return
	}
	c.JSON(http.StatusAccepted, gin.H{
		"status":  "success",
		"message": "pengguna berhasil ditambahkan",
	})
}

type EditPengguna struct {
	Name        string `json:"name" binding:"required"`
	Password    string `json:"password" binding:"required"`
	NewPassword string `json:"newPassword" binding:"required"`
}

func EditUser(c *gin.Context) {
	var user EditPengguna
	err := c.BindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	cek := database.EditUser(user.Name, user.Password, user.NewPassword)
	if !cek {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Database rusak atau user tidak ada",
		})
		return
	}
	c.JSON(http.StatusAccepted, gin.H{
		"status":  "success",
		"message": "pengguna berhasil diubah",
	})
}

type UserBuy struct {
	Name     string `json:"name" binding:"required"`
	Password string `json:"password" binding:"required"`
	Judul    string `json:"judul" binding:"required"`
}

func Buy(c *gin.Context) {
	var user UserBuy
	err := c.BindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	cek := database.Buy(user.Name, user.Judul)
	if !cek {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Database rusak atau user tidak ada",
		})
		return
	}
	c.JSON(http.StatusAccepted, gin.H{
		"status":  "success",
		"message": "course berhasil dibeli",
	})
}

func BuyHistory(c *gin.Context) {
	var user UserBuy
	err := c.BindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	data, cek := database.SeeHistory(user.Name)
	if !cek {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Database rusak atau user tidak ada",
		})
		return
	}
	c.JSON(http.StatusAccepted, gin.H{
		"status":  "success",
		"message": data,
	})
}
