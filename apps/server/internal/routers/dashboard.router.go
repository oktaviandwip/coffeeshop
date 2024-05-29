package routers

import (
	"github.com/Roisfaozi/black-coffee-collaborations/internal/handlers"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

func dashboard(g *gin.Engine, d *sqlx.DB) {
	route := g.Group("/dashboard")

	repo := repository.NewDashboardRepository(d)
	handler := handlers.NewDashboard(repo)

	route.GET("/", handler.GetDashboard)
}
