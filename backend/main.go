package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env files")
	}

	//server()
	order := Order{
		Name:        "Wakunguma",
		Flavour:     "Chocolate",
		Message:     nil,
		PhoneNumber: "0765067857",
		Email:       "wakunguma13@gmail.com",
		Shape:       "Small",
		Date:        "12/12/23",
		Quantity:    2,
		Total:       2.0,
		MessageType: "Topper",
	}
	var body bytes.Buffer
	e := json.NewEncoder(&body)
	encodeErr := e.Encode(order)
	if encodeErr != nil {
		log.Panicln(encodeErr)
	}
	request, err := http.NewRequest("POST", "https://xgeaoarxkbluxxzuxyeb.supabase.co/rest/v1/sales", &body)
	request.Header.Set("apiKey")

	if err != nil {
		log.Println(err)
	}

	log.Println(resp)
}

func server() {
	r := chi.NewRouter()
	r.Get("/active", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("The server is up!!!"))
	})

	r.Post("/sale", addSale)

	log.Printf("The server is running on port :3000")
	http.ListenAndServe(":3000", r)
}

func addSale(w http.ResponseWriter, r *http.Request) {
	var order Order
	d := json.NewDecoder(r.Body)
	decodeErr := d.Decode(&order)
	if decodeErr != nil {
		log.Println(decodeErr)
	}
	w.WriteHeader(http.StatusCreated)
}

type Order struct {
	Name        string
	PhoneNumber string
	Email       string
	Flavour     string
	Shape       string
	Size        string
	Date        string
	Total       float32
	Quantity    int32
	Message     *string
	MessageType string
}

/*

curl -X POST 'https://xgeaoarxkbluxxzuxyeb.supabase.co/rest/v1/sales' \
-H "apikey: SUPABASE_CLIENT_ANON_KEY" \
-H "Authorization: Bearer SUPABASE_CLIENT_ANON_KEY" \
-H "Content-Type: application/json" \
-H "Prefer: return=minimal" \
-d '{ "some_column": "someValue", "other_column": "otherValue" }'

*/
