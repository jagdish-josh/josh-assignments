package main

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("wingardium_leviosa")

func generateJWT(userID string, userRole string) (string, error) {

	claims := jwt.MapClaims{
		"sub":  userID,
		"role": userRole,
		"exp":  time.Now().Add(2 * time.Minute).Unix(), 
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return signedToken, nil
}


func validateJWT(tokenString string) {

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

		
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method")
		}

		return secretKey, nil
	})

	if err != nil || !token.Valid {
		fmt.Println("Token Invalid")
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		fmt.Println("Token Invalid")
		return
	}

	fmt.Println("Token Valid")
	fmt.Println("Claims:")
	fmt.Println("sub:", claims["sub"])
	fmt.Println("role:", claims["role"])
	fmt.Println("exp:", claims["exp"])
}

func main() {
	userId := "1234"
	userRole := "student"

	
	token, err := generateJWT(userId, userRole)
	if err != nil {
		fmt.Println("Error generating token:", err)
		return
	}

	fmt.Println("Generated JWT:",token )

	fmt.Println("Validating Token...")


	validateJWT(token)
}
