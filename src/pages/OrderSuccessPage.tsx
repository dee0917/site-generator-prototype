import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { ThemeConfig } from '../types/Theme';
import { SiteContent } from '../types/Content';

type ContextType = { theme: ThemeConfig; content: SiteContent };

interface OrderState {
    orderId: string;
    total: number;
    itemCount: number;
    shippingName: string;
}

/**
 * 訂單成功頁面
 * NOTE: 透過 React Router state 接收訂單資訊，若無 state 則導回首頁
 */
export const OrderSuccessPage: React.FC = () => {
    const { theme } = useOutletContext<ContextType>();
    const { colors, typography, borderRadius } = theme;
    const location = useLocation();
    const orderState = location.state as OrderState | null;

    const isBrutalist = theme.vibe === 'energetic' || theme.vibe === 'corporate' || theme.vibe === 'street';
    const isTech = theme.vibe === 'technology';

    // 如果沒有訂單資料，導回首頁
    if (!orderState) {
        return <Navigate to="/" replace />;
    }

    const { orderId, total, itemCount, shippingName } = orderState;

    return (
        <div className="min-h-screen pt-24 pb-20 flex items-center justify-center" style={{ backgroundColor: colors.background, color: colors.text }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-lg w-full mx-6 text-center space-y-8"
            >
                {/* 成功圖示 */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-24 h-24 mx-auto rounded-full flex items-center justify-center"
                    style={{
                        backgroundColor: '#22c55e20',
                        borderRadius: isBrutalist ? '0px' : '50%'
                    }}
                >
                    <CheckCircle size={48} color="#22c55e" strokeWidth={1.5} />
                </motion.div>

                {/* 標題 */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: typography.fontFamily }}>
                        {isTech ? 'ORDER.CONFIRMED' : 'Order Confirmed!'}
                    </h1>
                    <p className="text-lg opacity-60">
                        Thank you, {shippingName}. Your order has been placed successfully.
                    </p>
                </div>

                {/* 訂單詳情卡片 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 space-y-4 text-left"
                    style={{
                        borderRadius: isBrutalist ? '0px' : '16px',
                        backgroundColor: `${colors.muted}08`,
                        border: isTech ? `1px solid ${colors.primary}30` : `1px solid ${colors.muted}15`
                    }}
                >
                    <div className="flex items-center gap-3 pb-4 border-b" style={{ borderColor: `${colors.muted}20` }}>
                        <Package size={20} style={{ color: colors.primary }} />
                        <span className="font-bold" style={{ fontFamily: typography.fontFamily }}>Order Details</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                        <span className="opacity-60">Order ID</span>
                        <span className="font-mono font-bold text-right">{orderId}</span>

                        <span className="opacity-60">Items</span>
                        <span className="font-bold text-right">{itemCount} product{itemCount > 1 ? 's' : ''}</span>

                        <span className="opacity-60">Total Paid</span>
                        <span className="font-bold text-right text-lg" style={{ color: colors.primary }}>${total.toFixed(0)}</span>

                        <span className="opacity-60">Status</span>
                        <span className="text-right">
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
                                ● Processing
                            </span>
                        </span>
                    </div>
                </motion.div>

                {/* 提示訊息 */}
                <p className="text-sm opacity-50">
                    A confirmation email has been sent to your inbox. You can track your order anytime.
                </p>

                {/* 操作按鈕 */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                        to="/catalog"
                        className="flex-1 py-4 px-6 font-bold text-center flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                        style={{
                            backgroundColor: colors.primary,
                            color: '#fff',
                            borderRadius: isBrutalist ? '0px' : borderRadius,
                            boxShadow: `0 8px 20px -5px ${colors.primary}50`
                        }}
                    >
                        Continue Shopping <ArrowRight size={18} />
                    </Link>
                    <Link
                        to="/"
                        className="flex-1 py-4 px-6 font-bold text-center flex items-center justify-center gap-2 border transition-colors hover:bg-black/5"
                        style={{
                            borderRadius: isBrutalist ? '0px' : borderRadius,
                            borderColor: `${colors.text}30`
                        }}
                    >
                        <Home size={18} /> Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};
