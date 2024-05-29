package dashboard

type Dashboard struct {
	Total_price int32  `json:"total_price,omitempty" db:"total_price,omitempty" form:"total_price,omitempty"`
	Interval    string `json:"interval,omitempty" db:"interval,omitempty"`
}

type Dashboards []Dashboard
