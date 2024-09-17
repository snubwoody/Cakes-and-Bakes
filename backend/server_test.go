package main

import (
	"log"
	"strconv"
	"testing"
)

func TestGenerateOTPLength(t *testing.T) {
	for range 200 {
		otp := generateOTP(6)
		s := strconv.Itoa(otp)
		if len(s) != 6 {
			log.Panicf("Some OTP's have the wrong length %s", s)
		}
	}
}
