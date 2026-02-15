import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product } from '../types/Content';

// NOTE: 購物車項目 = 產品 + 數量，與 Product 解耦以支持未來擴展
export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    /** 將商品加入購物車，若已存在則累加數量 */
    addToCart: (product: Product, quantity?: number) => void;
    /** 從購物車移除指定商品 */
    removeFromCart: (productId: string) => void;
    /** 更新指定商品的數量 */
    updateQuantity: (productId: string, quantity: number) => void;
    /** 清空購物車 */
    clearCart: () => void;
    /** 購物車商品總數 */
    itemCount: number;
    /** 小計金額 */
    subtotal: number;
    /** 運費（模擬固定值） */
    shipping: number;
    /** 總計金額 */
    total: number;
}

const CART_STORAGE_KEY = 'site-generator-cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * 從 localStorage 載入購物車數據
 * NOTE: 只存儲 productId 與 quantity，Product 物件會在 hydrate 時重新匹配
 */
const loadCartFromStorage = (): CartItem[] => {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch {
        // NOTE: localStorage 不可用或數據損壞時，靜默降級
        console.warn('[CartContext] Failed to load cart from localStorage');
    }
    return [];
};

const saveCartToStorage = (items: CartItem[]): void => {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
        console.warn('[CartContext] Failed to save cart to localStorage');
    }
};

// NOTE: 運費在 $100 以上免運，否則固定 $20（模擬邏輯）
const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 20;

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);

    // 持久化至 localStorage
    useEffect(() => {
        saveCartToStorage(items);
    }, [items]);

    const addToCart = useCallback((product: Product, quantity: number = 1) => {
        setItems(prev => {
            const existingIndex = prev.findIndex(item => item.product.id === product.id);
            if (existingIndex >= 0) {
                // 已存在 -> 累加數量
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity
                };
                return updated;
            }
            // 新增商品
            return [...prev, { product, quantity }];
        });
    }, []);

    const removeFromCart = useCallback((productId: string) => {
        setItems(prev => prev.filter(item => item.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            // 數量歸零 = 移除商品
            setItems(prev => prev.filter(item => item.product.id !== productId));
            return;
        }
        setItems(prev =>
            prev.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    // 計算衍生值
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shipping;

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            itemCount,
            subtotal,
            shipping,
            total
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
