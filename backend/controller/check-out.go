package controller

import (
	"net/http"

	"github.com/Warunthorn09/sa-65-project/entity"
	"github.com/gin-gonic/gin"
)

// POST /check-out
func CreateCheckOut(c *gin.Context) {
	var checkout entity.CheckOut
	var booking entity.Booking
	var fine entity.Fine
	var admin entity.Admin

	if err := c.ShouldBindJSON(&checkout); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", checkout.BookingID).First(&booking); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "booking not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", checkout.FineID).First(&fine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fine not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", checkout.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// if err := entity.DB().Create(&room.RoomNumber).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	rm := entity.CheckOut{
		Admin:   admin,
		Booking: booking,
		Fine:    fine,

		CheckOutTime: checkout.CheckOutTime,
		Price:        checkout.Price,
	}

	if err := entity.DB().Create(&rm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rm})
}

// GET /user/:id
func GetCheckOut(c *gin.Context) {
	var checkout entity.CheckOut
	id := c.Param("id")

	if err := entity.DB().Preload("Admin").Preload("Booking").Preload("Fine").Raw("SELECT * FROM checkouts WHERE id = ?", id).First(&checkout).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": checkout})
}

// GET /checkouts
func ListCheckOuts(c *gin.Context) {
	var checkouts []entity.CheckOut

	if err := entity.DB().Preload("Admin").Preload("Booking").Preload("Fine").Raw("SELECT * FROM check_outs").Find(&checkouts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": checkouts})
}
