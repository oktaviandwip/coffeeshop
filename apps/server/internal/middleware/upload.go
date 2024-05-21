package middleware

import (
	"log"
	"net/http"

	"github.com/Roisfaozi/black-coffee-collaborations/pkg"
	"github.com/gin-gonic/gin"
)

func Upload(ctx *gin.Context) {
	file, err := ctx.FormFile("image_banner")
	if err != nil {
		if err.Error() == "http: no such file" {
			ctx.Set("image_url", "")
			ctx.Next()
			return
		}
		log.Println("upload err:", err)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Missing file"})
		return
	}
	src, err := file.Open()
	if err != nil {
		log.Println("upload src err:", err)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer src.Close()

	cld, err := pkg.CloudInary(src)
	if err != nil {
		log.Println("upload result err:", err.Error())
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
		return
	}

	ctx.Set("image_url", cld)
	ctx.Next()
}
