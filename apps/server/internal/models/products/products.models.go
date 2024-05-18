package products

type Size struct {
	Id   string `json:"id,omitempty"`
	Name string `json:"name,omitempty"`
}
type Products struct {
	Id          string  `json:"id,omitempty"`
	Name        string  `json:"name,omitempty"`
	Description string  `json:"description,omitempty"`
	Price       float32 `json:"price,omitempty"`
	Currency    string  `json:"currency,omitempty"`
	Category    string  `json:"category,omitempty"`
	ImageUrl    string  `json:"image_url,omitempty"`
	CreatedAt   string  `json:"created_at,omitempty"`
	UpdatedAt   string  `json:"updated_at,omitempty"`
	Sizes       []Size  `json:"sizes,omitempty"`
}

type ProductsResponse struct {
	Status      string     `json:"status,omitempty"`
	Data        []Products `json:"data,omitempty"`
	Description string     `json:"description,omitempty"`
}

type ProductsRequest struct {
	Name        string  `json:"name,omitempty"`
	Description string  `json:"description,omitempty"`
	Price       float32 `json:"price,omitempty"`
	Currency    string  `json:"currency,omitempty"`
	Category    string  `json:"category,omitempty"`
	ImageUrl    string  `json:"image_url,omitempty"`
}

type ProductResponse struct {
	Status      string    `json:"status,omitempty"`
	Data        *Products `json:"data,omitempty"`
	Description string    `json:"description,omitempty"`
}

type PostProductResponse struct {
	Status      string                   `json:"status,omitempty"`
	Data        *PostProductResponseData `json:"data,omitempty"`
	Description string                   `json:"description,omitempty"`
}

type PostProductResponseData struct {
	Id string `json:"id,omitempty"`
}
