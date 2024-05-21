package handlers

import (
	"github.com/Roisfaozi/black-coffee-collaborations/config"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/models/users"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/Roisfaozi/black-coffee-collaborations/pkg"

	"github.com/gin-gonic/gin"
)

type HandlerUser struct {
	repository.RepoUserIF
}

func NewUser(r repository.RepoUserIF) *HandlerUser {
	return &HandlerUser{r}
}

// Get Profile
func (h *HandlerUser) GetProfile(ctx *gin.Context) {
	id := ctx.Param("id")

	result, err := h.FetchProfile(id)
	if err != nil {
		pkg.NewRes(400, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	pkg.NewRes(200, result).Send(ctx)
}

// Update Profile
func (h *HandlerUser) PostProfile(ctx *gin.Context) {
	var err error
	id := ctx.Param("id")

	profile := users.Profile{}
	user := users.UserData{
		Role: "user",
	}

	if err := ctx.ShouldBind(&user); err != nil {
		pkg.NewRes(400, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	if err := ctx.ShouldBind(&profile); err != nil {
		pkg.NewRes(400, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}
	profile.Photo_profile = ctx.MustGet("profileImage").(string)

	result, err := h.UpdateProfile(id, &user, &profile)
	if err != nil {
		pkg.NewRes(400, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	pkg.NewRes(200, result).Send(ctx)
}
