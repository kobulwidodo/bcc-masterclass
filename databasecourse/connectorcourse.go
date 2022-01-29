package databasecourse

import (
	"os"

	"github.com/gocarina/gocsv"
)

type databasecourse struct {
	Judul string `csv:"judul"`
	Harga string `csv:"harga"`
}

func CreateCourse(judul string, harga string) bool {
	var newCourse databasecourse
	newCourse.Judul = judul
	newCourse.Harga = harga
	// buka file
	file, err := os.OpenFile("course.csv", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		return false
	}
	defer file.Close()
	var CourseDatas []databasecourse
	if err = gocsv.Unmarshal(file, &CourseDatas); err != nil {
		return false
	}
	// cek sebelum menambahkan apakah user sudah ada\
	for _, course := range CourseDatas {
		if course.Judul == newCourse.Judul {
			return false
		}
	}
	if err := os.Truncate("course.csv", 0); err != nil {
		return false
	}
	CourseDatas = append(CourseDatas, newCourse)
	if err = gocsv.Marshal(&CourseDatas, file); err != nil {
		return false
	}
	return true
}

func DeleteCourse(judul string) bool {
	var CourseDatas []databasecourse
	file, err := os.OpenFile("course.csv", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		return false
	}
	defer file.Close()
	if err = gocsv.Unmarshal(file, &CourseDatas); err != nil {
		return false
	}
	var CleanupCourseDatas []databasecourse
	for _, course := range CourseDatas {
		if course.Judul == judul {
			continue
		}
		CleanupCourseDatas = append(CleanupCourseDatas, course)
	}
	if err := os.Truncate("course.csv", 0); err != nil {
		return false
	}
	if err = gocsv.Marshal(&CleanupCourseDatas, file); err != nil {
		return false
	}
	return true
}

func UpdateCourse(judul string, harga string, judulBaru string, hargaBaru string) bool {
	var CourseDatas []databasecourse
	file, err := os.OpenFile("course.csv", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		return false
	}
	defer file.Close()
	if err = gocsv.Unmarshal(file, &CourseDatas); err != nil {
		return false
	}
	for i := range CourseDatas {
		if CourseDatas[i].Judul == judul {
			if harga == "" && judul != "" {
				CourseDatas[i].Judul = judulBaru
			} else if harga != "" && judul == "" {
				CourseDatas[i].Harga = hargaBaru
			} else if harga != "" && judul != "" {
				CourseDatas[i].Harga = hargaBaru
				CourseDatas[i].Judul = judulBaru
			}
			break
		}
	}
	if err = os.Truncate("user.csv", 0); err != nil {
		return false
	}
	if err = gocsv.Marshal(&CourseDatas, file); err != nil {
		return false
	}
	return true
}
