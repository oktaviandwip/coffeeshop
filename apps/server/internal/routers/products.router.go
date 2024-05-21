package routers

import (
	"github.com/Roisfaozi/black-coffee-collaborations/internal/handlers"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/middleware"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

func products(g *gin.Engine, d *sqlx.DB) {
	route := g.Group("/products")

	repo := repository.NewPruduct(d)
	handler := handlers.NewPruduct(repo)

	route.GET("/query", handler.GetProductsBy)
	route.POST("/", middleware.UploadFile, handler.PostProduct)
}
