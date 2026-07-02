export interface OrderItem {
    id: string;
    menuItemId: number;
    name: string;
    qty: number;
    price: number;
}

export interface IOrder {
    id: string;
    customerId: number;
    restaurantId: string;
    restaurantName: string;
    courierId: number;
    status: "CREATED" | string;
    totalPrice: number;
    currency: string;
    createdAt: string;
    updatedAt: string;
    items: OrderItem[];
}