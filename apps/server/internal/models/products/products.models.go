package products

type Size struct {
	Id   string `json:"id,omitempty"`
	Name string `json:"name,omitempty"`
}
type ProductSize struct {
	Id_size    string `json:"size_id,omitempty" db:"size_id,omitempty"`
	Name_size  string `json:"name,omitempty" db:"name,omitempty"`
	Price_size int    `json:"price,omitempty" db:"price,omitempty" form:"price,omitempty"`
}
type Products struct {
	Id          string        `json:"id,omitempty" form:"id,omitempty"`
	Name        string        `json:"name,omitempty" form:"name,omitempty"`
	Description string        `json:"description,omitempty" form:"description,omitempty"`
	Price       float32       `json:"price,omitempty" form:"price,omitempty"`
	IsAvailable bool          `json:"is_available,omitempty" form:"is_available,omitempty"`
	Category    string        `json:"category,omitempty" form:"category,omitempty"`
	ImageUrl    string        `json:"image_url,omitempty" form:"image_url,omitempty" db:"image_url,omitempty"`
	CreatedAt   string        `json:"created_at,omitempty" db:"created_at,omitempty"`
	UpdatedAt   string        `json:"updated_at,omitempty" db:"updated_at,omitempty"`
	Sizes       []Size        `json:"sizes,omitempty" form:"sizes,omitempty"`
	ProductSize []ProductSize `json:"productsizes,omitempty" form:"productsizes,omitempty"`
}

type ProductsResponse struct {
	Status      string     `json:"status,omitempty"`
	Data        []Products `json:"data,omitempty"`
	Description string     `json:"description,omitempty"`
}

type ProductsRequest struct {
	Name        string   `json:"name,omitempty" form:"name,omitempty" db:"name,omitempty"`
	Description string   `json:"description,omitempty" form:"description,omitempty" db:"description,omitempty"`
	Price       float32  `json:"price,omitempty" form:"price,omitempty" db:"price,omitempty"`
	IsAvailable bool     `json:"is_available" form:"is_available" db:"is_available"`
	Category    string   `json:"category,omitempty" form:"category,omitempty" db:"category,omitempty"`
	ImageUrl    string   `json:"image_url,omitempty" form:"image_url,omitempty" db:"image_url,omitempty"`
	SizeIDs     []string `json:"size_ids,omitempty"`
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
