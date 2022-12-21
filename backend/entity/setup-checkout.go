package entity

import (
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(
		&Admin{},
		&Room{},
		&Booking{},
		&Fine{},
		&CheckOut{})

	db = database

	// Admin Section ---------------------------------------------
	AdminA := Admin{
		Name:     "Warunthorn",
		Username: "nineNA",
		Password: "1234",
		Avatar:   "https://preview.redd.it/lrcjfd63hmq21.jpg?width=640&crop=smart&auto=webp&s=c57b97f1d00286412cd7d606f98ea85612253679",
	}
	db.Model(&Admin{}).Create(&AdminA)

	AdminB := Admin{
		Name:     "admin",
		Username: "admin",
		Password: "admin",
		Avatar:   "https://lzd-live-th-member.oss-ap-southeast-1.aliyuncs.com/352b418384a1434b961e22549d3d88d1_c92cff71c580421ca947ea98e09b21b0.jpg",
	}
	db.Model(&Admin{}).Create(&AdminB)

	//Room---------------------------------------------------------
	RoomA := Room{
		Number:  "102",
		ZoneID:  1,
		TypeID:  3,
		AdminID: 1,
		Status:  0,
	}
	db.Model(&Room{}).Create(&RoomA)

	RoomB := Room{
		Number:  "301",
		ZoneID:  2,
		TypeID:  1,
		AdminID: 2,
		Status:  1,
	}
	db.Model(&Room{}).Create(&RoomB)

	//Booking------------------------------------------------------
	FromDateA := time.Date(2021, time.September, 05, 0, 0, 0, 0, time.Local)
	ToDateA := time.Date(2021, time.September, 06, 0, 0, 0, 0, time.Local)

	FromDateB := time.Date(2021, time.September, 04, 0, 0, 0, 0, time.Local)
	ToDateB := time.Date(2021, time.September, 06, 0, 0, 0, 0, time.Local)

	BookingA := Booking{
		Room:           RoomA,
		USERID:         10001,
		FromDate:       FromDateA,
		Todate:         ToDateA,
		NumberOfGuests: 2,
		BookingStatus:  "confirm",
		PaymentID:      3001,
	}
	db.Model(&Booking{}).Create(&BookingA)

	BookingB := Booking{
		Room:           RoomB,
		USERID:         10002,
		FromDate:       FromDateB,
		Todate:         ToDateB,
		NumberOfGuests: 3,
		BookingStatus:  "unconfirm",
		PaymentID:      3002,
	}
	db.Model(&Booking{}).Create(&BookingB)

	//Fine---------------------------------------------------------
	FineA := Fine{
		Fine_Choice: "เสียค่าปรับ",
	}
	db.Model(&Fine{}).Create(&FineA)

	FineB := Fine{
		Fine_Choice: "ไม่เสียค่าปรับ",
	}
	db.Model(&Fine{}).Create(&FineB)

	//CheckOut-----------------------------------------------------
	CheckOutDateA := time.Date(2021, time.October, 05, 25, 45, 35, 0, time.Local) //day, hour, min, sec
	CheckOutDateB := time.Date(2022, time.October, 05, 25, 45, 35, 0, time.Local)
	db.Model(&CheckOut{}).Create(&CheckOut{
		Admin:        AdminA,
		Booking:      BookingA,
		Fine:         FineA,
		CheckOutTime: CheckOutDateA,
		Price:        3700.00,
	})

	db.Model(&CheckOut{}).Create(&CheckOut{
		Admin:        AdminA,
		Booking:      BookingB,
		Fine:         FineB,
		CheckOutTime: CheckOutDateB,
		Price:        0,
	})

}
