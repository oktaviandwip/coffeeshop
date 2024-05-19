package orders

import "time"

type Payment struct {
	// ID pembayaran
	PaymentId string `json:"payment_id"`
	// ID order
	OrderId string `json:"order_id"`
	// ID metode pembayaran
	PaymentMethodId int32 `json:"payment_method_id"`
	// Jumlah pembayaran
	Amount int32 `json:"amount"`
	// Waktu pembuatan pembayaran
	CreatedAt time.Time `json:"created_at"`
}

type PaymentResponse struct {
	Status string `json:"status,omitempty"`

	Data *Payment `json:"data,omitempty"`

	Description string `json:"description,omitempty"`
}

type PaymentRequest struct {
	// ID metode pembayaran
	PaymentMethodId int32 `json:"payment_method_id"`
	// Jumlah pembayaran
	Amount int32 `json:"amount"`
}

type Order struct {
	// ID order
	OrderId string `json:"order_id"`
	// ID pengguna
	UserId string `json:"user_id"`
	// Total harga sebelum pajak
	TotalPrice int32 `json:"total_price"`
	// Pajak
	Taxes float32 `json:"taxes"`
	// Biaya pengiriman
	Shipping int32 `json:"shipping"`
	// Status order
	Status string `json:"status"`
	// Alamat pengiriman
	DeliveryAddress string `json:"delivery_address"`
	// Total harga setelah pajak dan pengiriman
	TotalAmount int32 `json:"total_amount"`
	// Waktu pembuatan order
	CreatedAt time.Time `json:"created_at"`
	// Waktu terakhir pembaruan order
	UpdatedAt time.Time   `json:"updated_at"`
	Products  []OrderItem `json:"products"`
}

type OrderRequest struct {
	// ID pengguna yang membuat order
	UserId string `json:"user_id"`
	// Alamat pengiriman
	DeliveryAddress string                 `json:"delivery_address"`
	Products        []OrderRequestProducts `json:"products"`
}

type OrderRequestProducts struct {
	// ID produk
	ProductId string `json:"product_id"`
	// ID ukuran produk
	SizeId string `json:"size_id"`
	// Jumlah produk
	Quantity int32 `json:"quantity"`
	// Harga produk
	Amount int32 `json:"amount"`
}

type OrderItem struct {
	// ID item order
	OrderItemId string `json:"order_item_id"`
	// ID produk
	ProductId string `json:"product_id"`
	// ID ukuran produk
	SizeId string `json:"size_id"`
	// Jumlah produk
	Quantity int32 `json:"quantity"`
	// Harga produk
	Amount int32 `json:"amount"`
	// Waktu pembuatan item order
	CreatedAt time.Time `json:"created_at"`
	// Waktu terakhir pembaruan item order
	UpdatedAt time.Time `json:"updated_at"`
}
