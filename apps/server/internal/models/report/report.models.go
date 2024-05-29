package report

type ReportDashboard struct {
	Price     int32  `json:"price,omitempty" db:"price,omitempty" form:"price,omitempty"`
	CreatedAt string `json:"created_at,omitempty" db:"created_at,omitempty"`
}
