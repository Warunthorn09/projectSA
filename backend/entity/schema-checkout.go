package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Name      string
	Username  string `gorm:"uniqueIndex"`
	Password  string
	Avatar    string
	Check_out []CheckOut `gorm:"foreignKey:AdminID"`
}

type Room struct {
	gorm.Model
	Number  string `gorm:"uniqueIndex"`
	ZoneID  uint
	TypeID  uint
	AdminID uint
	Status  int
	Booking []Booking `gorm:"foreignKey:RoomID"`
}

type Booking struct {
	gorm.Model
	RoomID         *uint
	Room           Room
	USERID         int
	FromDate       time.Time
	Todate         time.Time
	NumberOfGuests uint
	BookingStatus  string
	PaymentID      uint
	Check_out      []CheckOut `gorm:"foreignKey:BookingID"`
}

type Fine struct {
	gorm.Model
	Fine_Choice string
	Check_out   []CheckOut `gorm:"foreignKey:FineID"`
}

type CheckOut struct {
	gorm.Model
	AdminID *uint
	Admin   Admin

	BookingID *uint
	Booking   Booking

	FineID *uint
	Fine   Fine

	CheckOutTime time.Time
	Price        float32
}
