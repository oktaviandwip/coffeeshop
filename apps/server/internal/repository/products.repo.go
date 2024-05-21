package repository

import (
	"fmt"
	"math"

	"github.com/Roisfaozi/black-coffee-collaborations/config"
	models "github.com/Roisfaozi/black-coffee-collaborations/internal/models/products"
	"github.com/jmoiron/sqlx"
)

type RepoProductsIF interface {
	GetProdBy(params models.Meta) (*config.Result, error)
	CreateProd(data *models.Product) (*config.Result, error)
}
type RepoProducts struct {
	*sqlx.DB
}

func NewPruduct(db *sqlx.DB) *RepoProducts {
	return &RepoProducts{db}
}

func (r *RepoProducts) GetProdBy(params models.Meta) (*config.Result, error) {
	var data models.Products
	var metas config.Metas
	var filterQuery string
	var metaQuery string
	var count int
	var args []interface{}
	var filter []interface{}

	if params.Name != "" {
		filterQuery = "AND name = ?"
		args = append(args, params.Name)
		filter = append(filter, params.Name)
	}

	offset := (params.Page - 1) * params.Limit
	metaQuery = "LIMIT ? OFFSET ? "
	args = append(args, params.Limit, offset)

	m := fmt.Sprintf(`SELECT COUNT(product_id) as count FROM public.products WHERE true %s`, filterQuery)
	err := r.Get(&count, r.Rebind(m), filter...)
	if err != nil {
		return nil, err
	}

	q := fmt.Sprintf(`SELECT * FROM public.products WHERE true %s %s`, filterQuery, metaQuery)

	err = r.Select(&data, r.Rebind(q), args...)
	if err != nil {
		return nil, err
	}

	check := math.Ceil(float64(count) / float64(params.Limit))
	metas.Total = count
	if count > 0 && params.Page != int(check) {
		metas.Next = params.Page + 1
	}

	if params.Page != 1 {
		metas.Prev = params.Page - 1
	}

	return &config.Result{Data: data, Meta: metas}, nil
}

func (r *RepoProducts) CreateProd(data *models.Product) (*config.Result, error) {
	q := `INSERT INTO public.products(
		name,
		category,
		price,
		discount,
		image_url,
		description)
	VALUES(
		:name,
		:category,
		:price,
		:discount,
		:image_url,
		:description
	)`

	_, err := r.NamedExec(q, data)
	if err != nil {
		return nil, err
	}

	return &config.Result{}, nil

}
