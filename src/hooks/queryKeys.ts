export const queryKeys = {
    profile: {
        me: ['profile']
    },
    restaurants: {
        all: ['restaurants'] as const,
        byCategory: (category_name: string) => ['restaurants', category_name] as const,
        byId: (id: string) => ['restaurants', id] as const,
        menu: (id: number) => ['restaurants', id, 'menu'] as const,
        generalCategories: ['generalCategories'] as const,
        ads: ['ads'] as const,
    },
    menus: {
        all: ['menus'] as const,
        byRestaurantId: (restaurant_id: string) => ['menus', restaurant_id] as const,
    },
}