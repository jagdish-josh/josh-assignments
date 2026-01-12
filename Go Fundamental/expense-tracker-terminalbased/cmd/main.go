package main

import (
	"fmt"
	"os"

	"database/sql"
	"github.com/joho/godotenv"

	_ "github.com/lib/pq"
)

func addExpense(db *sql.DB) {
	
	var ammount float64
			var title string
			var timestamp string

			fmt.Print("Enter expense ammount: ")
			fmt.Scan(&ammount)
			fmt.Print("Enter expense title: ")
			fmt.Scan(&title)
			fmt.Print("Enter expense timestamp: ")
			fmt.Scan(&timestamp)
	
	_, err := db.Exec("INSERT INTO expenses (amount, title, timestamp) VALUES ($1, $2, $3)", ammount, title, timestamp)
	if err != nil {
		fmt.Println("Error adding expense:", err)
	} else {
		fmt.Println("Expense added successfully!")
	}
}

func fetchAllExpenses(db *sql.DB) {
	rows, err := db.Query("SELECT id, amount, title, timestamp FROM expenses")
	if err != nil {
		fmt.Println("Error fetching expenses:", err)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var id int
		var amount float64
		var title string
		var timestamp string
		err := rows.Scan(&id, &amount, &title, &timestamp)
		if err != nil {
			fmt.Println("Error scanning expense:", err)
			continue
		}
		fmt.Printf("ID: %d, Amount: %.2f, Title: %s, Timestamp: %s\n", id, amount, title, timestamp)
	}
}

func fetchExpenseByID(db *sql.DB) {
	var id int
	fmt.Print("Enter expense ID: ")
	fmt.Scan(&id)

	var amount float64
	var title string
	var timestamp string
	err := db.QueryRow("SELECT amount, title, timestamp FROM expenses WHERE id = $1", id).Scan(&amount, &title, &timestamp)
	if err != nil {
		fmt.Println("Error fetching expense:", err)
		return
	}
	fmt.Printf("ID: %d, Amount: %.2f, Title: %s, Timestamp: %s\n", id, amount, title, timestamp)
}

func updateExpenseByID(db *sql.DB) {
	var id int
	var amount float64
	var title string
	var timestamp string

	fmt.Print("Enter expense ID to update: ")
	fmt.Scan(&id)
	fmt.Print("Enter new amount: ")
	fmt.Scan(&amount)
	fmt.Print("Enter new title: ")
	fmt.Scan(&title)
	fmt.Print("Enter new timestamp: ")
	fmt.Scan(&timestamp)

	_, err := db.Exec("UPDATE expenses SET amount = $1, title = $2, timestamp = $3 WHERE id = $4", amount, title, timestamp, id)
	if err != nil {
		fmt.Println("Error updating expense:", err)
	} else {
		fmt.Println("Expense updated successfully!")
	}
}

func deleteExpenseByID(db *sql.DB) {
	var id int
	fmt.Print("Enter expense ID to delete: ")
	fmt.Scan(&id)

	_, err := db.Exec("DELETE FROM expenses WHERE id = $1", id)
	if err != nil {
		fmt.Println("Error deleting expense:", err)
	} else {
		fmt.Println("Expense deleted successfully!")
	}
}



func main() {

	if err := godotenv.Load(); err != nil {
		fmt.Println("No .env file found")
	}

	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")


	

	var ConnectString string = "user=" + user + " dbname=" + dbname + " password=" + password + " sslmode=disable"

	db, err := sql.Open("postgres", ConnectString)

	if err != nil{
		fmt.Println("Error connecting to the database:", err)
	}

	defer db.Close()

	err = db.Ping()
	if err != nil {
		fmt.Println("Error pinging the database:", err)
		
	}

	fmt.Println("Successfully connected to the database!")

	query := `
	CREATE TABLE IF NOT EXISTS expenses (
		id SERIAL PRIMARY KEY,
		title TEXT NOT NULL,
		amount NUMERIC(10,2),
		timestamp TEXT 
	);
	`
	_, err = db.Exec(query)

	if err != nil {
		fmt.Println("Error creating table:", err)
		return
	}



	for true {
		fmt.Print("=====================================================================\n")
		
		fmt.Println(" Enter \n 1. to add expense \n 2.fetch all expenses \n 3. fetch expense by id \n 4. update expense by id \n 5. delete expense by id \n 6. to Exit" )
        fmt.Print("=====================================================================\n")
		var choice int
		
		fmt.Scan(&choice)

		switch choice {
		case 1:
			addExpense(db)
		case 2:
			fetchAllExpenses(db)
		case 3:
			fetchExpenseByID(db)
		case 4:
			updateExpenseByID(db)
		case 5:
			deleteExpenseByID(db)
		case 6:
			fmt.Println("Exiting...")
			return
		default:
			fmt.Println("Invalid choice. Please try again.")
		}
	}

	
}