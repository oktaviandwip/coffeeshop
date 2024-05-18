package orders

import "time"

type Payment struct {
	// ID pembayaran
	PaymentId string `json:"paymentId"`
	// ID order
	OrderId string `json:"orderId"`
	// ID metode pembayaran
	PaymentMethodId int32 `json:"paymentMethodId"`
	// Jumlah pembayaran
	Amount int32 `json:"amount"`
	// Waktu pembuatan pembayaran
	CreatedAt time.Time `json:"createdAt"`
}
type PaymentResponse struct {
	Status      string   `json:"status,omitempty"`
	Data        *Payment `json:"data,omitempty"`
	Description string   `json:"description,omitempty"`
}

type PaymentRequest struct {
	// ID metode pembayaran
	PaymentMethodId int32 `json:"paymentMethodId"`
	// Jumlah pembayaran
	Amount int32 `json:"amount"`
}

type Order struct {
	// ID order
	OrderId string `json:"orderId"`
	// ID pengguna
	UserId string `json:"userId"`
	// Total harga sebelum pajak
	TotalPrice int32 `json:"totalPrice"`
	// Pajak
	Taxes float32 `json:"taxes"`
	// Biaya pengiriman
	Shipping int32 `json:"shipping"`
	// Status order
	Status string `json:"status"`
	// Alamat pengiriman
	DeliveryAddress string `json:"deliveryAddress"`
	// Total harga setelah pajak dan pengiriman
	TotalAmount int32 `json:"totalAmount"`
	// Waktu pembuatan order
	CreatedAt time.Time `json:"createdAt"`
	// Waktu terakhir pembaruan order
	UpdatedAt time.Time   `json:"updatedAt"`
	Products  []OrderItem `json:"products"`
}

type OrderRequest struct {
	// ID pengguna yang membuat order
	UserId string `json:"userId"`
	// Alamat pengiriman
	DeliveryAddress string                 `json:"deliveryAddress"`
	Products        []OrderRequestProducts `json:"products"`
}

type OrderRequestProducts struct {
	// ID produk
	ProductId string `json:"productId"`
	// ID ukuran produk
	SizeId string `json:"sizeId"`
	// Jumlah produk
	Quantity int32 `json:"quantity"`
	// Harga produk
	Amount int32 `json:"amount"`
}

type OrderItem struct {
	// ID item order
	OrderItemId string `json:"orderItemId"`
	// ID produk
	ProductId string `json:"productId"`
	// ID ukuran produk
	SizeId string `json:"sizeId"`
	// Jumlah produk
	Quantity int32 `json:"quantity"`
	// Harga produk
	Amount int32 `json:"amount"`
	// Waktu pembuatan item order
	CreatedAt time.Time `json:"createdAt"`
	// Waktu terakhir pembaruan item order
	UpdatedAt time.Time `json:"updatedAt"`
}
