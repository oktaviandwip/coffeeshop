package repository

import (
	"context"
	"fmt"

	"github.com/Roisfaozi/black-coffee-collaborations/config"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/models/orders"
	"github.com/jmoiron/sqlx"
)

type OrderRepository interface {
	CreateOrder(ctx context.Context, order *orders.Order) (*config.Result, error)
	GetOrderById(ctx context.Context, orderId string) (*config.Result, error)
	GetOrderedCartItems(ctx context.Context, userId string) (*config.Result, error)
	GetOrderHistory(ctx context.Context, userId string) (*config.Result, error)
	DeleteOrderHistory(ctx context.Context, historyID string) (*config.Result, error)
	GetCartItems(ctx context.Context, userId string) (*config.Result, error)
}

type OrderRepo struct {
	db *sqlx.DB
}

func NewOrderRepo(db *sqlx.DB) *OrderRepo {
	return &OrderRepo{db: db}
}

func (o *OrderRepo) CreateOrder(ctx context.Context, orderReq *orders.Order) (*config.Result, error) {
	// Mulai transaksi
	tx, err := o.db.BeginTxx(ctx, nil)
	if err != nil {
		return nil, err
	}

	// Pastikan transaksi dibatalkan jika terjadi kesalahan
	defer func() {
		if err != nil {
			tx.Rollback()
		} else {
			tx.Commit()
		}
	}()

	query := `
    INSERT INTO cart_order (user_id, total_price, taxes, shipping, status, delivery_address, total_amount, payment_method_id, delivery_method_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING order_id, created_at, updated_at`

	var order orders.Order
	err = tx.QueryRowxContext(ctx, query, orderReq.UserId, orderReq.TotalPrice, orderReq.Taxes, orderReq.Shipping, orderReq.Status, orderReq.DeliveryAddress, orderReq.TotalAmount, orderReq.PaymentMethodId, orderReq.DeliveryMethodId).Scan(&order.OrderId, &order.CreatedAt, &order.UpdatedAt)
	if err != nil {
		return nil, err
	}

	// Retrieve ordered products
	var products []orders.OrderItem
	productsQuery := `
    SELECT ci.id as order_item_id, ci.product_id, ci.size_id, ci.quantity, ci.created_at, ci.updated_at, 
           (ci.quantity * ps.price) as amount
    FROM cart_item ci
    JOIN product_size ps ON ci.product_id = ps.product_id AND ci.size_id = ps.size_id
    WHERE ci.cart_id IN (SELECT id FROM cart WHERE user_id = $1) AND ci.ordered = FALSE`

	err = tx.SelectContext(ctx, &products, productsQuery, orderReq.UserId)
	if err != nil {
		return nil, err
	}

	// Update cart items to set them as ordered
	updateQuery := `
    UPDATE cart_item 
    SET ordered = TRUE 
    WHERE cart_id IN (SELECT id FROM cart WHERE user_id = $1)`

	_, err = tx.ExecContext(ctx, updateQuery, orderReq.UserId)
	if err != nil {
		return nil, err
	}

	historyQuery := `
    INSERT INTO history (user_id, order_id, product_id, size_id, status)
    SELECT $1, $2, ci.product_id, ci.size_id, 'delivered'
    FROM cart_item ci
    JOIN cart c ON ci.cart_id = c.id
    WHERE c.user_id = $1 AND ci.ordered = TRUE`

	_, err = tx.ExecContext(ctx, historyQuery, orderReq.UserId, order.OrderId)
	if err != nil {
		return nil, err
	}

	return &config.Result{
		Data:    order,
		Message: "Success create order payment",
	}, nil
}

func (o *OrderRepo) GetOrderById(ctx context.Context, orderId string) (*config.Result, error) {
	var order orders.Order

	query := "SELECT order_id, user_id, total_price, taxes, shipping, status, delivery_address, total_amount,payment_method_id, delivery_method_id, created_at, updated_at FROM cart_order WHERE order_id = $1"
	err := o.db.GetContext(ctx, &order, query, orderId)
	if err != nil {
		return nil, err
	}
	fmt.Println(order)
	result := &config.Result{
		Data:    order,
		Message: "Order retrieved successfully",
	}

	return result, nil
}

func (o *OrderRepo) GetOrderedCartItems(ctx context.Context, userId string) (*config.Result, error) {
	var cartItems []orders.OrderedProduct

	query := `
        SELECT 
            ci.id, 
            p.name as product_name,
            ps.price as product_price,
            ci.quantity, 
            ci.created_at, 
            ci.updated_at
        FROM 
            cart_item ci
        JOIN 
            product p ON ci.product_id = p.id
        JOIN 
            product_size ps ON ci.product_id = ps.product_id AND ci.size_id = ps.size_id
        JOIN 
            cart c ON ci.cart_id = c.id
        WHERE 
            c.user_id = $1 
            AND ci.ordered = TRUE`

	err := o.db.SelectContext(ctx, &cartItems, query, userId)
	if err != nil {
		return nil, err
	}

	return &config.Result{
		Data:    cartItems,
		Message: "Success Get order History",
	}, nil
}

func (o *OrderRepo) GetOrderHistory(ctx context.Context, userId string) (*config.Result, error) {
	var orderHistories []orders.OrderHistory

	query := `
    SELECT h.id, h.user_id, h.order_id, h.product_id, p.name as product_name, ps.price as product_price, h.status, h.created_at, h.updated_at
    FROM history h
    JOIN product p ON h.product_id = p.id
    JOIN product_size ps ON h.product_id = ps.product_id AND h.size_id = ps.size_id
    WHERE h.user_id = $1 AND h.status = 'delivered'`

	err := o.db.SelectContext(ctx, &orderHistories, query, userId)
	if err != nil {
		return nil, err
	}

	result := &config.Result{
		Data:    orderHistories,
		Message: "Order history retrieved successfully",
	}

	return result, nil
}

func (o *OrderRepo) DeleteOrderHistory(ctx context.Context, historyID string) (*config.Result, error) {
	query := "DELETE FROM history WHERE id = $1"
	_, err := o.db.ExecContext(ctx, query, historyID)
	if err != nil {
		return &config.Result{
			Message: err.Error(),
		}, nil
	}
	result := &config.Result{
		Message: "Order history deleted successfully",
	}

	return result, nil
}

func (o *OrderRepo) GetCartItems(ctx context.Context, userId string) (*config.Result, error) {
	var cartItems []orders.OrderedProduct

	query := `
        SELECT 
            ci.id, 
            p.name as product_name,
            p.image_url,
            ps.price as product_price,
			s.size_name,
            ci.quantity, 
            ci.created_at, 
            ci.updated_at,
        	ci.delivery_method_id
        FROM 
            cart_item ci
        JOIN 
            product p ON ci.product_id = p.id
        JOIN 
            product_size ps ON ci.product_id = ps.product_id AND ci.size_id = ps.size_id
        JOIN 
            cart c ON ci.cart_id = c.id
		JOIN 
            size s ON ci.size_id = s.id
        WHERE 
            c.user_id = $1 
            AND ci.ordered != TRUE`

	err := o.db.SelectContext(ctx, &cartItems, query, userId)
	if err != nil {

		return nil, err
	}

	return &config.Result{
		Data:    cartItems,
		Message: "Success Get order History",
	}, nil
}
