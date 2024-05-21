package repository

import (
	"context"
	"errors"
	"fmt"

	"github.com/Roisfaozi/black-coffee-collaborations/config"
	models "github.com/Roisfaozi/black-coffee-collaborations/internal/models/users"
	"github.com/jmoiron/sqlx"
)

type RepoUsersIF interface {
	// GetByEmail(email string) (*config.Result, error)
	CreateUser(ctx context.Context, data *models.User) (*config.Result, error)
	// Update(data *models.User, user_id string) (*config.Result, error)
	// Delete(data *models.User) (*config.Result, error)
}

type RepoUsers struct {
	*sqlx.DB
}

func NewUser(db *sqlx.DB) *RepoUsers {
	return &RepoUsers{db}
}

func (r *RepoUsers) CreateUser(ctx context.Context, data *models.User) (*config.Result, error) {
	tx, err := r.BeginTxx(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer func() {
		if r := recover(); r != nil {
			_ = tx.Rollback()
		}
	}()

	qUser := `INSERT INTO public.users (email, phone, password,role)
			VALUES($1, $2, $3, $4) RETURNING user_id`

	var userId string

	err = tx.QueryRowContext(ctx, qUser, data.Email, data.PhoneNumber, data.Password, data.Role).Scan(&userId)
	if err != nil {
		fmt.Println(err.Error())
		if err.Error() == `pq: duplicate key value violates unique constraint "users_email_key"` {
			fmt.Println(err.Error())
			_ = tx.Rollback()
			return nil, errors.New("Email sudah terdaftar!")
		}

		if err.Error() == `pq: duplicate key value violates unique constraint "users_phone_key"` {
			fmt.Println(err.Error())
			_ = tx.Rollback()
			return nil, errors.New("Nomor handphone sudah terdaftar!")
		}

		_ = tx.Rollback()
		return nil, err
	}

	qProfile := `INSERT INTO public.profile (user_id) VALUES ($1)`
	fmt.Println(userId)

	_, err = tx.Exec(qProfile, userId)

	err = tx.Commit()
	if err != nil {
		return nil, err
	}

	return &config.Result{Message: "1 data user created"}, nil
}

func (r *RepoUsers) GetAuthData(email string) (*models.User, error) {
	var result models.User
	q := `SELECT user_id, email, role, password FROM public.users WHERE email = ?`

	if err := r.Get(&result, r.Rebind(q), email); err != nil {
		if err.Error() == "sql: no rows in result set" {
			fmt.Println(err.Error())
			return nil, errors.New("Email tidak terdaftar!")
		}

		return nil, err
	}

	return &result, nil
}
