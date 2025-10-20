//@ts-nocheck
import api from "../api";

class Cart {
    events: any;
    items: any;
    favorites: any;

    constructor() { 
        if (!window.events) window.events = {};
        if(!window.items)
            window.items =  globalThis.localStorage ? JSON.parse(globalThis.localStorage.getItem('cart')) || [] : [];
            if(!window.favorites)
            window.favorites =  globalThis.localStorage ? JSON.parse(globalThis.localStorage.getItem('favorites')) || [] : [];
    

        this.events = window.events;
        this.favorites = window.favorites;
        this.items = window.items;

        
    }

    async saveCartToServer() {
        try {
            // Fetch existing cart for the current user
            let cart = await api
                .collection("cart")
                .getFirstListItem(`owner.id="${api.authStore.model.id}"`);

            const data = {
                items: JSON.stringify(this.items),
                favorites: JSON.stringify(this.favorites),
                owner: api.authStore.model.id,
            };

            if (cart) {
                // Update existing cart
                await api.collection("cart").update(cart.id, data);
            } else {
                // Create new cart
                await api.collection("cart").create(data);
            }

            console.log("Cart successfully saved to server.");
        } catch (error) {
            console.error("Error saving cart to server:", error);
        }
    }

    onEvent(event: string, callback: Function) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        window.events = this.events;
    }

    triggerEvent(event: string, data: any) {
        this.events = window.events;
        if (this.events[event]) {
            this.events[event].forEach((callback: Function) => {
                callback(data, this.items);
            });
        }
    }
    clear(){ 
        this.triggerEvent("cartCleared", this.items);
        this.items = []
        this.favorites = []
        window.items = this.items;
        window.favorites = this.favorites;
        this.saveCartToLocalStorage();
        this.saveFavoritesToLocalStorage(); 
    }

    addItem(item: any) {
        this.items.push(item);
        window.items = this.items;
        this.triggerEvent("itemAdded", item);
        this.saveCartToLocalStorage();
    }

    toggleFavoriteItem(item: any) {
        let index = this.favorites.findIndex((i: any) => i.id === item.id);
        if (index === -1) {
            this.favoriteItem(item);
            this.triggerEvent("itemFavorited", item);
        } else {
            this.removeFavorite(index);
        }
    }

    favoriteItem(item: any) {
        this.favorites.push(item);
        window.favorites = this.favorites;
        this.triggerEvent("itemFavorited", item);
        this.saveFavoritesToLocalStorage();
    }

    removeItem(index: number) {
        this.items.splice(index, 1);
        window.items = this.items;
        this.triggerEvent("itemRemoved", index);
        this.saveCartToLocalStorage();
    }

    removeFavorite(index: number) {
        this.favorites.splice(index, 1);
        window.favorites = this.favorites;
        this.triggerEvent("itemUnfavorited", index);
        this.saveFavoritesToLocalStorage();
    }

    getItems() {
        return this.items;
    }

    saveCartToLocalStorage() {
        try {
            localStorage.setItem("cart", JSON.stringify(this.items));
        } catch (error) {
            console.error("Failed to save cart to localStorage:", error);
        }
    }

    saveFavoritesToLocalStorage() {
        try {
            localStorage.setItem("favorites", JSON.stringify(this.favorites));
        } catch (error) {
            console.error("Failed to save favorites to localStorage:", error);
        }
    }
}

export default Cart;
