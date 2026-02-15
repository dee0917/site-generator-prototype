import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Plus, Minus, Trash2 } from 'lucide-react';
import { ThemeConfig } from '../../types/Theme';
import { useCart } from '../../context/CartContext';

interface DynamicCartProps {
    theme: ThemeConfig;
    isOpen: boolean;
    onClose: () => void;
}

/**
 * 動態購物車抽屜組件
 * NOTE: 已整合 CartContext，根據 vibe 動態調整視覺風格
 */
export const DynamicCart: React.FC<DynamicCartProps> = ({ theme, isOpen, onClose }) => {
    const { colors, borderRadius, typography, shadowDepth, vibe } = theme;
    const { items, removeFromCart, updateQuantity, itemCount, subtotal, shipping, total } = useCart();

    // 風格變體邏輯
    const isTech = vibe === 'technology';
    const isMystical = vibe === 'mystical';
    const isBrutalist = vibe === 'energetic' || vibe === 'corporate' || vibe === 'street';

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* 背景遮罩 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] backdrop-blur-sm cursor-pointer"
                        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                    />

                    {/* 側邊抽屜 */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{
                            type: 'spring',
                            damping: 30,
                            stiffness: 300
                        }}
                        className="fixed top-0 right-0 h-full w-full max-w-md z-[70] flex flex-col shadow-2xl"
                        style={{
                            backgroundColor: isMystical ? `${colors.background}CC` : colors.background,
                            color: colors.text,
                            backdropFilter: isMystical ? 'blur(20px)' : 'none',
                            borderLeft: isTech ? `1px solid ${colors.primary}40` : isBrutalist ? `4px solid ${colors.text}` : 'none'
                        }}
                    >
                        {/* 頂部標題列 */}
                        <div
                            className="p-6 flex items-center justify-between"
                            style={{
                                borderBottom: isTech ? `1px solid ${colors.primary}20` : isBrutalist ? `4px solid ${colors.text}` : `1px solid ${colors.muted}20`
                            }}
                        >
                            <h2
                                className="text-xl flex items-center justify-center gap-2"
                                style={{
                                    fontFamily: typography.fontFamily,
                                    fontWeight: 'bold',
                                    letterSpacing: isTech ? '-0.05em' : 'normal'
                                }}
                            >
                                {isTech && <span style={{ color: colors.primary }}>//</span>}
                                {isTech ? 'CART MODULE' : isBrutalist ? 'LOOT' : 'SHOPPING BAG'}
                                {itemCount > 0 && (
                                    <span
                                        className="ml-2 text-xs px-2 py-0.5 rounded-full font-mono"
                                        style={{
                                            backgroundColor: colors.primary,
                                            color: colors.background,
                                            borderRadius: isBrutalist ? '0px' : '999px'
                                        }}
                                    >
                                        {itemCount}
                                    </span>
                                )}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                                aria-label="Close cart"
                                style={{
                                    color: colors.muted,
                                    borderRadius: isBrutalist ? '0px' : '50%',
                                    backgroundColor: isBrutalist ? 'transparent' : `${colors.muted}10`
                                }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* 購物車內容 */}
                        {items.length === 0 ? (
                            /* 空狀態 */
                            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center opacity-70">
                                <div
                                    className="mb-6 p-6 rounded-full relative"
                                    style={{
                                        borderRadius: isBrutalist ? '0px' : '50%',
                                        backgroundColor: `${colors.accent}10`,
                                        border: isTech ? `1px dashed ${colors.primary}` : 'none'
                                    }}
                                >
                                    <ShoppingBag
                                        size={48}
                                        style={{ color: colors.accent }}
                                        strokeWidth={1.5}
                                    />
                                    {isMystical && (
                                        <div className="absolute inset-0 rounded-full animate-pulse" style={{ boxShadow: `0 0 30px ${colors.accent}40` }}></div>
                                    )}
                                </div>
                                <p className="text-sm uppercase tracking-widest font-medium" style={{ color: colors.muted }}>
                                    {isTech ? 'STATUS: EMPTY' : 'YOUR BAG IS EMPTY'}
                                </p>
                            </div>
                        ) : (
                            /* 有商品狀態 */
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                <AnimatePresence>
                                    {items.map(({ product, quantity }) => (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20, height: 0 }}
                                            className="flex gap-4 p-3 rounded-lg"
                                            style={{
                                                backgroundColor: `${colors.muted}08`,
                                                borderRadius: isBrutalist ? '0px' : '12px',
                                                border: isTech ? `1px solid ${colors.primary}15` : isBrutalist ? `2px solid ${colors.text}` : 'none'
                                            }}
                                        >
                                            {/* 商品圖片 */}
                                            <div
                                                className="w-20 h-20 flex-shrink-0 overflow-hidden"
                                                style={{
                                                    borderRadius: isBrutalist ? '0px' : '8px',
                                                    backgroundColor: `${colors.muted}15`
                                                }}
                                            >
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>

                                            {/* 商品資訊 */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold truncate" style={{ fontFamily: typography.fontFamily }}>
                                                    {product.name}
                                                </h4>
                                                <p className="text-lg font-bold mt-1" style={{ color: colors.primary }}>
                                                    ${(product.price * quantity).toFixed(0)}
                                                </p>

                                                {/* 數量控制 */}
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(product.id, quantity - 1)}
                                                        className="p-1 rounded hover:bg-black/10 transition-colors"
                                                        style={{ borderRadius: isBrutalist ? '0px' : '6px' }}
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm font-mono w-6 text-center">{quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(product.id, quantity + 1)}
                                                        className="p-1 rounded hover:bg-black/10 transition-colors"
                                                        style={{ borderRadius: isBrutalist ? '0px' : '6px' }}
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => removeFromCart(product.id)}
                                                        className="ml-auto p-1 rounded hover:bg-red-100 hover:text-red-500 transition-colors"
                                                        style={{ borderRadius: isBrutalist ? '0px' : '6px' }}
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* 底部結帳區 */}
                        <div
                            className="p-6"
                            style={{
                                backgroundColor: isBrutalist ? colors.text : isTech ? `${colors.primary}05` : 'transparent',
                                borderTop: isTech ? `1px solid ${colors.primary}20` : isBrutalist ? `4px solid ${colors.text}` : `1px solid ${colors.muted}10`
                            }}
                        >
                            {/* 金額明細 */}
                            {items.length > 0 && (
                                <div className="space-y-2 mb-4 text-sm" style={{ color: isBrutalist ? colors.background : colors.text }}>
                                    <div className="flex justify-between">
                                        <span className="opacity-60">Subtotal</span>
                                        <span className="font-mono">${subtotal.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="opacity-60">Shipping</span>
                                        <span className="font-mono">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-lg font-bold pt-2 border-t" style={{ borderColor: isBrutalist ? `${colors.background}30` : `${colors.muted}20` }}>
                                        <span>Total</span>
                                        <span style={{ color: isBrutalist ? colors.background : colors.primary }}>${total.toFixed(0)}</span>
                                    </div>
                                </div>
                            )}

                            <Link
                                to={items.length > 0 ? '/checkout' : '#'}
                                onClick={items.length > 0 ? onClose : undefined}
                                className={`w-full py-4 px-6 flex items-center justify-center gap-2 font-bold transition-all group cursor-pointer text-center block ${items.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
                                style={{
                                    backgroundColor: isBrutalist ? colors.background : colors.primary,
                                    color: isBrutalist ? colors.text : colors.background === '#1A1A1A' || colors.background === '#050505' ? '#000' : '#FFF',
                                    borderRadius: isBrutalist ? '0px' : borderRadius,
                                    boxShadow: shadowDepth === 'shadow-none' ? 'none' :
                                        isTech ? `0 0 20px ${colors.primary}66` :
                                            `0 10px 20px -5px ${colors.primary}66`,
                                    border: isBrutalist ? `2px solid ${colors.background}` : 'none'
                                }}
                            >
                                <span style={{ fontFamily: typography.fontFamily }}>
                                    {isTech ? 'INITIATE CHECKOUT' : 'CHECKOUT'}
                                </span>
                                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
