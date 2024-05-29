package routers

import (
	"github.com/Roisfaozi/black-coffee-collaborations/internal/handlers"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/middleware"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

func order(g *gin.Engine, d *sqlx.DB) {
	router := g.Group("/order")

	repo := repository.NewOrderRepo(d)
	handler := handlers.NewOrderHandlerImpl(repo)

	router.POST("/", middleware.Authjwt("user"), handler.CreateOrder)
	router.GET("/:id", middleware.Authjwt("user"), handler.GetOrderById)
	router.GET("/history/:user_id", middleware.Authjwt("user"), handler.GetOrderedCartItems)
	router.GET("/history", middleware.Authjwt("user"), handler.GetOrderHistory)
	router.DELETE("/history/:id", middleware.Authjwt("user"), handler.DeleteOrderHistory)
	router.GET("/cart", middleware.Authjwt("user"), handler.GetCartItems)

}
