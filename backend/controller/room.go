package controller

import (
	"net/http"

	"github.com/Warunthorn09/sa-65-project/entity"
	"github.com/gin-gonic/gin"
)

// GET //:id
func GetRoom(c *gin.Context) {
	var room entity.Room
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM rooms WHERE id = ?", id).Scan(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room})
}

// GET /rooms
func ListRooms(c *gin.Context) {
	var rooms []entity.Room

	if err := entity.DB().Raw("SELECT * FROM rooms").Scan(&rooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rooms})
}
