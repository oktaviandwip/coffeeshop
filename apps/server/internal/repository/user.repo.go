package repository

import (
	"errors"

	"github.com/Roisfaozi/black-coffee-collaborations/config"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/models/users"

	"github.com/jmoiron/sqlx"
)

type RepoUserIF interface {
	UpdateProfile(id string, user *users.UserData, profile *users.Profile) (*config.Result, error)
	FetchProfile(id string) (*config.Result, error)
}
type RepoUser struct {
	*sqlx.DB
}

func NewUser(db *sqlx.DB) *RepoUser {
	return &RepoUser{db}
}

// Get Profile
func (r *RepoUser) FetchProfile(userId string) (*config.Result, error) {
	// Get data user
	userQuery := "SELECT email, phone_number FROM users WHERE id = ?"
	userData := users.UserData{}

	if err := r.Get(&userData, r.Rebind(userQuery), userId); err != nil {
		return nil, err
	}

	// Get data profile
	profileQuery := "SELECT photo_profile, address, display_name, first_name, last_name, gender, birthday FROM profile WHERE user_id = ?"
	profileData := users.Profile{}

	if err := r.Get(&profileData, r.Rebind(profileQuery), userId); err != nil {
		return nil, err
	}

	// Merge result
	data := map[string]interface{}{
		"photo_profile": profileData.Photo_profile,
		"email":         userData.Email,
		"phone_number":  userData.Phone_number,
		"address":       profileData.Address,
		"display_name":  profileData.Display_name,
		"first_name":    profileData.First_name,
		"last_name":     profileData.Last_name,
		"gender":        profileData.Gender,
		"birthday":      profileData.Birthday,
	}

	return &config.Result{Data: data}, nil
}

// Update Profile
func (r *RepoUser) UpdateProfile(id string, user *users.UserData, profile *users.Profile) (*config.Result, error) {
	// Update users table
	userUpdateQuery := `
		UPDATE users
		SET
			email = COALESCE(NULLIF(:email, ''), email),
			phone_number = COALESCE(NULLIF(:phone_number, ''), phone_number)
		WHERE
			id = :user_id
	`

	// Update profile table
	profileUpdateQuery := `
		UPDATE profile
		SET 
			photo_profile = COALESCE(NULLIF(:photo_profile, ''), photo_profile),
			first_name = COALESCE(NULLIF(:first_name, ''), first_name),
			last_name = COALESCE(NULLIF(:last_name, ''), last_name),
			display_name = COALESCE(NULLIF(:display_name, ''), display_name),
			gender = COALESCE(NULLIF(:gender, ''), gender),
			address = COALESCE(NULLIF(:address, ''), address),
			birthday = COALESCE(CAST(NULLIF(:birthday, '') AS DATE), birthday),
			updated_at = NOW()
		WHERE
			user_id = :user_id
	`

	// Prepare the data for named parameters
	data := map[string]interface{}{
		"user_id":       id,
		"email":         user.Email,
		"phone_number":  user.Phone_number,
		"photo_profile": profile.Photo_profile,
		"first_name":    profile.First_name,
		"last_name":     profile.Last_name,
		"display_name":  profile.Display_name,
		"gender":        profile.Gender,
		"address":       profile.Address,
		"birthday":      profile.Birthday,
	}

	// Execute the user update query
	userResult, err := r.NamedExec(userUpdateQuery, data)
	if err != nil {
		return nil, err
	}

	userRowsAffected, err := userResult.RowsAffected()
	if err != nil {
		return nil, err
	}

	// Execute the profile update query
	profileResult, err := r.NamedExec(profileUpdateQuery, data)
	if err != nil {
		return nil, err
	}

	profileRowsAffected, err := profileResult.RowsAffected()
	if err != nil {
		return nil, err
	}

	// Check if any rows were affected
	if userRowsAffected == 0 && profileRowsAffected == 0 {
		return nil, errors.New("no user or profile was updated")
	}

	return &config.Result{Message: "1 data user updated"}, nil
}
