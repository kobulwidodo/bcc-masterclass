package databaseinstructor

import (
	"fmt"
	"os"

	"github.com/gocarina/gocsv"
)

type Instructor struct {
	Nama string `csv:"nama"`
	Kode string `csv:"kode"`
}

func CreateInstructor(nama string, kode string) bool {
	var newInstructor Instructor
	newInstructor.Nama = nama
	newInstructor.Kode = kode
	file, err := os.OpenFile("instruktor.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return false
	}
	defer file.Close()
	var InstructorDatas []Instructor
	if err = gocsv.Unmarshal(file, &InstructorDatas); err != nil {
		return false
	}
	for _, InstructorData := range InstructorDatas {
		if InstructorData.Nama == newInstructor.Nama {
			fmt.Println("Name already exist")
			return false
		}
	}
	if err := os.Truncate("instruktor.txt", 0); err != nil {
		return false
	}
	InstructorDatas = append(InstructorDatas, newInstructor)
	if err = gocsv.Marshal(&InstructorDatas, file); err != nil {
		return false
	}
	return true
}
