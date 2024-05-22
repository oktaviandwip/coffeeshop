package routers

import (
	"github.com/Roisfaozi/black-coffee-collaborations/internal/handlers"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

func cart(g *gin.Engine, d *sqlx.DB) {
	router := g.Group("/cart")

	repo := repository.NewCartRepo(d)
	handler := handlers.NewCartHandlerImpl(repo)

	router.POST("/", handler.CreateCart)
	router.POST("/:id/item", handler.CreateCartItem)
	router.GET("/:user_id", handler.GetCartByUserId)

}
