package handlers

import (
	"net/http"

	"github.com/Roisfaozi/black-coffee-collaborations/config"
	models "github.com/Roisfaozi/black-coffee-collaborations/internal/models/users"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/Roisfaozi/black-coffee-collaborations/pkg"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

type HandlerUsers struct {
	repository.RepoUsersIF
}

func NewUser(r repository.RepoUsersIF) *HandlerUsers {
	return &HandlerUsers{r}
}

func (h *HandlerUsers) CreateNewUser(ctx *gin.Context) {
	var err error
	data := models.User{
		Role: "user",
	}

	if err := ctx.ShouldBind(&data); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	_, err = govalidator.ValidateStruct(&data)
	if err != nil {
		pkg.NewRes(401, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	data.Password, err = pkg.HashPassword(data.Password)
	if err != nil {
		pkg.NewRes(401, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	result, err := h.CreateUser(ctx.Request.Context(), &data)
	if err != nil {
		pkg.NewRes(401, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	pkg.NewRes(200, result).Send(ctx)
}
