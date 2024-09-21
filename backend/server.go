package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	_ "image/jpeg"
	_ "image/png"
	"log"
	"math/big"
	"net/http"
	"os"
	"strconv"
	"strings"

	api "github.com/twilio/twilio-go/rest/api/v2010"

	"crypto/rand"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	"github.com/twilio/twilio-go"
)

func main() {
	// Load the environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env files")
	}

	//verifyPurchase()
	server()
}

// FIXME one of the numbers was five digits, investigate
func generateOTP(digits int) int {
	var rnd []int64

	for range digits {
		n, err := rand.Int(rand.Reader, big.NewInt(9))
		if err != nil {
			log.Println(err)
		}
		rnd = append(rnd, n.Int64())
	}

	result := ""

	for _, i := range rnd {
		strconv.Itoa(int(i))
		result += strconv.Itoa(int(i))
	}

	otp, err := strconv.Atoi(result)

	if err != nil {
		log.Println(err)
	}

	return otp
}

func verifyPurchase() {
	client := twilio.NewRestClient()

	otp := generateOTP(6)

	params := &api.CreateMessageParams{}
	params.SetBody(fmt.Sprintf("Your verification code is %d", otp))
	params.SetFrom("+13342588772")
	params.SetTo("+260765067857")

	_, err := client.Api.CreateMessage(params)
	if err != nil {
		log.Println(err)
	}

	//TODO handle errors
	//log.Println(resp)
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

// TODO add state and sharedId
func addSale(w http.ResponseWriter, r *http.Request) {
	// TODO handle the errors and give the appropriate feedback
	serviceKey := os.Getenv("SERVICE_KEY")

	var order Order

	// Decode the request body
	d := json.NewDecoder(r.Body)
	d.DisallowUnknownFields()

	decodeErr := d.Decode(&order)
	if decodeErr != nil {
		log.Println(decodeErr)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// TODO handle image uploads
	if err := uploadImage(order.Image); err != nil {
		log.Println(err)
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
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if resp.StatusCode == 400 {
		//log.Println(resp)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	w.WriteHeader(http.StatusCreated)
}

func uploadImage(rawData string) error {
	dataType, data, _ := strings.Cut(rawData, "base64,")
	log.Println(dataType)

	rawImage, err := base64.StdEncoding.DecodeString(data)
	if err != nil {
		return err
	}

	os.WriteFile("test.jpg", rawImage, 0644)
	return nil
}

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
	Address        string  `json:"address"`
	Image          string  `json:"image"`
}
