package favorite

type Favorite struct {
	Status      string        `json:"status,omitempty"`
	Data        *FavoriteData `json:"data,omitempty"`
	Description string        `json:"description,omitempty"`
}
type FavoriteRequest struct {
	// ID produk yang difavoritkan
	ProductId string `json:"productId"`
}
type FavoriteData struct {
	Id        string `json:"id,omitempty"`
	ProductId string `json:"product_id,omitempty"`
	UserId    string `json:"user_id,omitempty"`
	CreatedAt string `json:"created_at,omitempty"`
}
