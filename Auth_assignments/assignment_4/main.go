package main

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte("my-secret-key")


func loginCallToServer() {
	fmt.Println("Redirecting to Identity Provider...")
}

// done by identity server
func idpLogin() string {
	var username string
	var password string

	fmt.Print("Enter username: ")
	fmt.Scan(&username)
	

	fmt.Print("Enter password: ")
	fmt.Scan(&password)
	

	if username != "" && password != "" {
		authCode := "hardcodedAuthCodexxxxxx"
		fmt.Println("Login successful")
		fmt.Println("Auth Code:", authCode)
		return authCode
	}

	return ""
}

//server <---> identity server
func exchangeAuthCode(expectedCode string) (string, string) {
	fmt.Print("Enter authorization code: ")
	var code string
	fmt.Scan(&code)

	if code != expectedCode {
		fmt.Println("Invalid authorization code")
		return "", ""
	}

	idToken, _ := generateJWT("jagdish", "id-token")
	accessToken, _ := generateJWT("jagdish", "access-token")

	fmt.Println("Token exchange successful")
	fmt.Println("ID Token:", idToken)
	fmt.Println("Access Token:", accessToken)

	return idToken, accessToken
}

//done by identity server

func generateJWT(subject string, tokenType string) (string, error) {
	claims := jwt.MapClaims{
		"iss": "mock-idp",
		"sub": subject,
		"aud": "mock-client",
		"typ": tokenType,
		"iat": time.Now().Unix(),
		"exp": time.Now().Add(5 * time.Minute).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}


//server
func verifyToken(tokenString string) bool {
	if tokenString == "" {
		return false
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method")
		}
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		return false
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return false
	}

	// Mock claim validation
	if claims["iss"] != "mock-idp" || claims["aud"] != "mock-client" {
		return false
	}

	return true
}


func main() {

	loginCallToServer()

	authCode := idpLogin()

	if authCode == "" {
		fmt.Println("Authentication failed")
		return
	}

	idToken, _ := exchangeAuthCode(authCode)

	

	if verifyToken(idToken) {
		fmt.Println("Token Verified")
	} else {
		fmt.Println("Invalid Token")
	}
}
