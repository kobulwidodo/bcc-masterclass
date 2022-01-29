package database

import (
	"fmt"
	"os"

	"github.com/gocarina/gocsv"
)

type UserData struct {
	Name     string `csv:"name"`
	Password string `csv:"password"`
}

func CreateUser(name string, password string) (string, bool) {
	var newUser UserData
	newUser.Name = name
	newUser.Password = password
	out := ""
	file, err := os.OpenFile("user.csv", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		out = "File tidak ditemukan"
		return out, false
	}
	defer file.Close()
	var UserDatas []UserData
	if err = gocsv.Unmarshal(file, &UserDatas); err != nil {
		out = "Failed Unmarshal"
		return out, false
	}
	// cek sebelum menambahkan apakah user sudah ada
	for _, user := range UserDatas {
		if user.Name == newUser.Name {
			out = "User sudah ada"
			return out, false
		}
	}

	if err := os.Truncate("user.csv", 0); err != nil {
		out = "Failed to truncate"
		return out, false
	}
	UserDatas = append(UserDatas, newUser)

	if err = gocsv.Marshal(&UserDatas, file); err != nil {
		out = "Database error"
		return out, false
	}
	out = newUser.Name + " berhasil dibuat"
	return out, true
}

func EditUser(name string, password string, newpassword string) bool {
	var User UserData
	User.Name = name
	User.Password = password
	file, err := os.OpenFile("user.csv", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		fmt.Println("File tidak ditemukan")
		return false
	}
	defer file.Close()
	var UserDatas []UserData
	if err = gocsv.Unmarshal(file, &UserDatas); err != nil {
		fmt.Println("Failed Unmarshal")
		return false
	}
	for i := range UserDatas {
		if UserDatas[i].Name == User.Name && UserDatas[i].Password == User.Password {
			UserDatas[i].Password = newpassword
			break
		}
	}
	if err := os.Truncate("user.csv", 0); err != nil {
		return false
	}

	if err = gocsv.Marshal(&UserDatas, file); err != nil {
		return false
	}

	return true
}

type Course struct {
	Judul string `csv:"judul"`
	Harga string `csv:"harga"`
}

type RiwayatBeli struct {
	Name  string `csv:"name"`
	Judul string `csv:"judul"`
}

func Buy(name string, judul string) bool {
	var RiwayatBeliData []RiwayatBeli
	file, err := os.OpenFile("riwayatbeli.csv", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		fmt.Println("File tidak ditemukan")
		return false
	}
	defer file.Close()
	if err = gocsv.Unmarshal(file, &RiwayatBeliData); err != nil {
		fmt.Println("Failed Unmarshal")
		return false
	}
	var RiwayatBeli RiwayatBeli
	RiwayatBeli.Name = name
	RiwayatBeli.Judul = judul
	RiwayatBeliData = append(RiwayatBeliData, RiwayatBeli)
	if err := os.Truncate("riwayatbeli.csv", 0); err != nil {
		return false
	}
	if err = gocsv.Marshal(&RiwayatBeliData, file); err != nil {
		return false
	}
	return true
}

func SeeHistory(name string) (string, bool) {
	var RiwayatBeliData []RiwayatBeli
	var out string = ""
	file, err := os.OpenFile("riwayatbeli.csv", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		fmt.Println("File tidak ditemukan")
		return out, false
	}
	defer file.Close()
	if err = gocsv.Unmarshal(file, &RiwayatBeliData); err != nil {
		fmt.Println("Failed Unmarshal")
		return out, false
	}

	for _, RiwayatBeli := range RiwayatBeliData {
		if RiwayatBeli.Name == name {
			out = out + RiwayatBeli.Judul + " "
		}
	}
	return out, true

}
