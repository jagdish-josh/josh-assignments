package main

import (
	"crypto/rand"
	"fmt"
	"html/template"
	"log"
	"math/big"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

type ErrorData struct {
	Error string
}

type User struct {
	Username       string
	HashedPassword string
}

var user User
var currentOTP string


func generateSixDigitOTP() int64 {
	n, _ := rand.Int(rand.Reader, big.NewInt(900000))
	return n.Int64() + 100000
}

func multiFactorHandler(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("templates/otp.html"))

	// Show OTP page
	if r.Method == http.MethodGet {
		currentOTP = fmt.Sprintf("%d", generateSixDigitOTP())
		fmt.Println(currentOTP)

		data := ErrorData{
			Error: "Enter the OTP",
		}
		tmpl.Execute(w, data)
		return
	}

	// Verify OTP
	otp := r.FormValue("otp")

	if otp == currentOTP {
		w.Write([]byte("MFA successful! You are logged in."))
		return
	}

	data := ErrorData{
		Error: "enter valid detail",
	}
	tmpl.Execute(w, data)
}


func signupHandler(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("templates/signup.html"))

	if r.Method != http.MethodPost {
		tmpl.Execute(w, nil)
		return
	}

	username := r.FormValue("username")
	password := r.FormValue("password")

	log.Printf("Received signup attempt for username: %s", username)

	if username == "" || len(password) <= 5 {
		data := ErrorData{
			Error: "Username required and password must be at least 6 characters",
		}
		log.Println("Signup error: invalid input")
		tmpl.Execute(w, data)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	user = User{
		Username:       username,
		HashedPassword: string(hashedPassword),
	}

	log.Printf("New user signed up: %s", user.Username)

	http.Redirect(w, r, "/login", http.StatusSeeOther)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("templates/login.html"))

	username := r.FormValue("username")
	password := r.FormValue("password")

	if username == user.Username &&
		bcrypt.CompareHashAndPassword(
			[]byte(user.HashedPassword),
			[]byte(password),
		) == nil {

		http.Redirect(w, r, "/otp", http.StatusSeeOther)
		return
	}

	var data ErrorData
	if username != "" {
		data.Error = "Invalid username or password"
	}

	tmpl.Execute(w, data)
}

func main() {
	http.HandleFunc("/",func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "try /signup route to signup \n try /login to login \n /otp for entering otp \n all route are connected signup->login->otp -> twofactor Authenticated \n otp will get on terminal for testing")
	})

	http.HandleFunc("/signup", signupHandler)
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/otp", multiFactorHandler)

	log.Println("http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
