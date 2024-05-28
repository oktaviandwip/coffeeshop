package repository

import (
	"context"
	"github.com/Roisfaozi/black-coffee-collaborations/config"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/models/report"
	"github.com/jmoiron/sqlx"
)

type ReportRepository interface {
	GetReportDashboard(ctx context.Context, report *report.ReportDashboard) (*config.Result, error)
}

type reportRepository struct {
	db *config.Database
}

func NewReportRepository(db *sqlx.DB) *reportRepository {
	return &reportRepository{
		db,
	}
}

func (r *reportRepository) GetReportDashboard(ctx context.Context, report *report.ReportDashboard) (*config.Result, error) {
	return config.Fetch(ctx, r.db, report)
}
