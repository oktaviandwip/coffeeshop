package models

import "time"

type Size struct {
	Id   string `json:"id,omitempty"`
	Name string `json:"name,omitempty"`
}

type Meta struct {
	Page  int
	Limit int
	Name  string
}
type Product struct {
	Product_id  string     `db:"product_id" form:"product_id" json:"product_id,omitempty" uri:"product_id"`
	Name        string     `db:"name" form:"name" json:"name"`
	Category    string     `db:"category" form:"category" json:"category"`
	Price       int        `db:"price" form:"price" json:"price"`
	Discount    float64    `db:"discount" form:"discount" json:"discount"`
	Image_url   string     `db:"image_url" json:"image_url,omitempty"`
	Description *string    `db:"description" form:"description" json:"description"`
	CreatedAt   *time.Time `db:"created_at" json:"created_at"`
	UpdatedAt   *time.Time `db:"updated_at" json:"updated_at"`
}

type Products []Product

type ProductsResponse struct {
	Status      string    `json:"status,omitempty"`
	Data        []Product `json:"data,omitempty"`
	Description string    `json:"description,omitempty"`
}

type ProductsRequest struct {
	Name        string  `json:"name,omitempty"`
	Description string  `json:"description,omitempty"`
	Price       float32 `json:"price,omitempty"`
	IsAvailable bool    `json:"is_available,omitempty"`
	Category    string  `json:"category,omitempty"`
	ImageUrl    string  `json:"image_url,omitempty"`
}

type ProductResponse struct {
	Status      string   `json:"status,omitempty"`
	Data        *Product `json:"data,omitempty"`
	Description string   `json:"description,omitempty"`
}

type PostProductResponse struct {
	Status      string                   `json:"status,omitempty"`
	Data        *PostProductResponseData `json:"data,omitempty"`
	Description string                   `json:"description,omitempty"`
}

type PostProductResponseData struct {
	Id string `json:"id,omitempty"`
}
