export const queryKeys = {
    restaurants: {
        all: ['restaurants'] as const,
        byId: (id: string) => ['restaurants', id] as const,
        menu: (id: number) => ['restaurants', id, 'menu'] as const,
    },
    menus: {
        all: ['menus'] as const,
        byRestaurantId: (restaurant_id: string) => ['menus', restaurant_id] as const,
    }
}