package handlers

import (
	"net/http"
	"strconv"

	"github.com/Roisfaozi/black-coffee-collaborations/config"
	models "github.com/Roisfaozi/black-coffee-collaborations/internal/models/products"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/Roisfaozi/black-coffee-collaborations/pkg"
	"github.com/gin-gonic/gin"
)

type HandlerProducts struct {
	repository.RepoProductsIF
}

func NewPruduct(r repository.RepoProductsIF) *HandlerProducts {
	return &HandlerProducts{r}
}

func (h *HandlerProducts) GetProductsBy(ctx *gin.Context) {
	name := ctx.Query("name")
	page := ctx.DefaultQuery("page", "1")
	limit := ctx.DefaultQuery("limit", "10")

	pg, _ := strconv.Atoi(page)
	lm, _ := strconv.Atoi(limit)

	data, err := h.GetProdBy(models.Meta{
		Name:  name,
		Page:  pg,
		Limit: lm,
	})

	if err != nil {
		pkg.NewRes(http.StatusBadRequest, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	pkg.NewRes(200, data).Send(ctx)
}

func (h *HandlerProducts) PostProduct(ctx *gin.Context) {
	product := models.Product{}

	if err := ctx.ShouldBind(&product); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	product.Image_url = ctx.MustGet("image").(string)
	result, err := h.CreateProd(&product)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	pkg.NewRes(200, result).Send(ctx)
}
