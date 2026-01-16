package main

import (
	"fmt"
)

type userDetail struct {
	id       int32
	username string
	role     string
	password string
}

func fetchRecord(id int32, users []userDetail) userDetail {
	for _, v := range users {
		if v.id == id {
			return v
		}
	}
	return userDetail{}
}

func findUserRole(username string , users []userDetail) string{
	for _, v := range users {
		if v.username == username {
			return v.role
		}
	}
	return ""

}

func main() {
	users := []userDetail{
		{id: 1, username: "jagdish", role: "admin", password: "qwertyuiop"},
		{id: 2, username: "pavan", role: "user", password: "asdfghjk"},
		{id: 3, username: "kishor", role: "user", password: "zxcvbnm"},
	}

	var docId int32
	var username string

	fmt.Println("enter Document Id want to access")
	fmt.Scan(&docId)

	fmt.Println("enter your username")
	fmt.Scan(&username)

	role := findUserRole(username, users)
	doc:=fetchRecord(docId, users)

	

	if role == "admin" || doc.username == username {
		fmt.Printf(
			"the required document is:\nID: %d\nUsername: %s\nRole: %s\n",
			doc.id,
			doc.username,
			doc.role,
		)

	} else {
		fmt.Println("Access denied!")
	}
}
