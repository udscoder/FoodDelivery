import {defineStore} from "pinia";
import type {IMenu} from "@/types/menu.ts";

const useMenuStore = defineStore('card', {
    state: () => {
        return {
            selectedMenus: [] as IMenu[]
        }
    },
    getters: {
        getSelectedMenus(state) {
            return state.selectedMenus
        },
        isMenuAlreadySelected(state) {
            return (menu: IMenu) => state.selectedMenus.some((selectedMenu) => selectedMenu.id === menu.id)
        },
    },
    actions: {
        incrementQuantity(menu: IMenu) {
            const selectedMenu = this.selectedMenus.find((selectedMenu) => selectedMenu.id === menu.id)
            if (selectedMenu) {
                selectedMenu.quantity++
            } else {
                this.selectedMenus.push({...menu, quantity: 1})
            }
        },
        decrementQuantity(menu: IMenu) {
            const selectedMenu = this.selectedMenus.find((selectedMenu) => selectedMenu.id === menu.id)
            if (selectedMenu) {
                selectedMenu.quantity--
            }

            this.selectedMenus = this.selectedMenus.filter((selectedMenu) => selectedMenu.quantity > 0)
        }
    }
})

export default useMenuStore