package main

import (
	"github.com/Warunthorn09/sa-65-project/controller"

	"github.com/Warunthorn09/sa-65-project/entity"

	// "github.com/chanwit/sa-64-projectr/middlewares"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
func main() {
	entity.SetupDatabase()
	r := gin.Default()

	r.Use(CORSMiddleware())

	// / CheckOut Routes
	r.GET("/checkouts", controller.ListCheckOuts)
	r.GET("/check/:id", controller.GetCheckOut)
	r.POST("/checkouts", controller.CreateCheckOut)

	// Booking Routes
	r.GET("/booking/:id", controller.GetBooking)
	r.GET("/bookings", controller.ListBookings)

	// Room Routes
	r.GET("/room/:id", controller.GetRoom)
	r.GET("/rooms", controller.ListRooms)

	// Admin Routes
	r.GET("/admin/:id", controller.GetAdmin)
	r.GET("/admins", controller.ListAdmins)

	// Fine Routes
	r.GET("/fine/:id", controller.GetFine)
	r.GET("/fines", controller.ListFines)

	// login User Route
	// r.POST("/login", controller.Login)

	// Run the server
	r.Run()
}
