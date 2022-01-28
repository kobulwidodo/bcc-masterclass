package databaseadmin

import (
	"fmt"
	"os"

	"github.com/gocarina/gocsv"
)

type DatabaseUser struct {
	Name     string `csv:"name"`
	Password string `csv:"password"`
}

func DeleteUser(name string) bool {
	var UserDatas []DatabaseUser
	file, err := os.OpenFile("user.csv", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		fmt.Println("File tidak ditemukan")
		return false
	}
	defer file.Close()
	if err = gocsv.Unmarshal(file, &UserDatas); err != nil {
		fmt.Println("Failed Unmarshal")
		return false

	}
	for i := range UserDatas {
		if UserDatas[i].Name == name {
			UserDatas = append(UserDatas[:i], UserDatas[i+1:]...)
			break
		}
	}
	if err = os.Truncate("user.csv", 0); err != nil {
		return false
	}
	if err = gocsv.Marshal(&UserDatas, file); err != nil {
		fmt.Println("Database error")
		return false
	}

	return true
}

type CourseData struct {
	Judul string `csv:"judul"`
	Harga string `csv:"harga"`
}

func DeleteCourse(judul string) bool {
	var CourseDatas []CourseData
	file, err := os.OpenFile("course.csv", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		fmt.Println("File tidak ditemukan")
		return false
	}
	defer file.Close()
	if err = gocsv.Unmarshal(file, &CourseDatas); err != nil {
		fmt.Println("Failed Unmarshal")
		return false

	}
	for i := range CourseDatas {
		if CourseDatas[i].Judul == judul {
			CourseDatas = append(CourseDatas[:i], CourseDatas[i+1:]...)
			break
		}
	}
	if err = os.Truncate("course.csv", 0); err != nil {
		return false
	}
	if err = gocsv.Marshal(&CourseDatas, file); err != nil {
		fmt.Println("Database error")
		return false
	}
	return true
}

type InstructorData struct {
	Name string `csv:"name"`
}

func RemoveInstructor(name string) bool {
	var InstructorDatas []InstructorData
	file, err := os.OpenFile("instructor.csv", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		fmt.Println("File tidak ditemukan")
		return false
	}
	defer file.Close()
	if err = gocsv.Unmarshal(file, &InstructorDatas); err != nil {
		fmt.Println("Failed Unmarshal")
		return false

	}
	for i := range InstructorDatas {
		if InstructorDatas[i].Name == name {
			InstructorDatas = append(InstructorDatas[:i], InstructorDatas[i+1:]...)
			break
		}
	}
	if err = os.Truncate("instructor.csv", 0); err != nil {
		return false
	}
	if err = gocsv.Marshal(&InstructorDatas, file); err != nil {
		fmt.Println("Database error")
		return false
	}
	return true
}
