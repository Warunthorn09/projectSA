package controller

import (
	"net/http"

	"github.com/Warunthorn09/sa-65-project/entity"
	"github.com/gin-gonic/gin"
)

// GET //:id
func GetBooking(c *gin.Context) {
	var booking entity.Booking
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM bookings WHERE id = ?", id).Scan(&booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": booking})
}

// GET /bookings
func ListBookings(c *gin.Context) {
	var bookings []entity.Booking

	if err := entity.DB().Raw("SELECT * FROM bookings").Scan(&bookings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookings})
}
