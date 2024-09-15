package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

func main() {
	// Load the environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env files")
	}

	server()

}

func server() {
	router := chi.NewRouter()

	// CORS middleware
	corsHandler := cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{"GET", "POST"},
		AllowedHeaders: []string{"Content-Type"},
	})

	router.Use(corsHandler)
	router.Get("/active", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("The server is up!!!"))
	})

	router.Post("/purchase", addSale)

	log.Printf("The server is running on port :3000")
	http.ListenAndServe(":3000", router)
}

func addSale(w http.ResponseWriter, r *http.Request) {
	// TODO handle the errors and give the appropriate feedback
	serviceKey := os.Getenv("SERVICE_KEY")

	var order Order

	// Decode the request body
	d := json.NewDecoder(r.Body)

	decodeErr := d.Decode(&order)
	if decodeErr != nil {
		log.Println(decodeErr)
	}

	// Parse the order back to json to send in the POST request
	// Parse it twice to make sure it's valid
	orderBody, parseErr := json.Marshal(order)
	if parseErr != nil {
		log.Println("Failed to parse order")
	}

	client := http.Client{}

	request, err := http.NewRequest("POST", "https://xgeaoarxkbluxxzuxyeb.supabase.co/rest/v1/sales", bytes.NewBuffer(orderBody))
	if err != nil {
		log.Println(err)
	}
	request.Header.Set("apiKey", serviceKey)
	request.Header.Set("Authorization", fmt.Sprintf("Bearer %s", serviceKey))
	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Prefer", "return=minimal")

	resp, err := client.Do(request)
	if err != nil {
		log.Println(err)
	}

	w.WriteHeader(http.StatusCreated)
	defer resp.Body.Close()
}

// TODO set delivery method
type Order struct {
	Name           string  `json:"name"`
	PhoneNumber    string  `json:"phoneNumber"`
	Email          string  `json:"email"`
	Flavour        string  `json:"flavour"`
	Shape          string  `json:"shape"`
	Size           string  `json:"size"`
	Date           string  `json:"date"`
	Total          float32 `json:"total"`
	Quantity       int32   `json:"quantity"`
	Message        *string `json:"message"`
	MessageType    string  `json:"messageType"`
	DeliveryMethod string  `json:"deliveryMethod"`
}
