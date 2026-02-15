import React, { useState, useCallback } from 'react';
import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { ThemeConfig } from '../types/Theme';
import { SiteContent } from '../types/Content';
import { useCart } from '../context/CartContext';

type ContextType = { theme: ThemeConfig; content: SiteContent };

// NOTE: 表單欄位驗證規則定義
interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    cardNumber?: string;
    expiry?: string;
    cvc?: string;
}

interface ShippingForm {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
}

interface PaymentForm {
    cardNumber: string;
    expiry: string;
    cvc: string;
}

/**
 * 多步驟結帳頁面
 * NOTE: Step 1 = 寄送資訊 → Step 2 = 付款方式 → Step 3 = 模擬處理 → 導向訂單成功頁
 */
export const CheckoutPage: React.FC = () => {
    const { theme } = useOutletContext<ContextType>();
    const { colors, typography, borderRadius } = theme;
    const navigate = useNavigate();
    const { items, subtotal, shipping, total, clearCart } = useCart();

    const [step, setStep] = useState<'info' | 'payment' | 'processing'>('info');
    const [errors, setErrors] = useState<FormErrors>({});
    const [shippingForm, setShippingForm] = useState<ShippingForm>({
        firstName: '', lastName: '', email: '', address: '', city: '', postalCode: ''
    });
    const [paymentForm, setPaymentForm] = useState<PaymentForm>({
        cardNumber: '', expiry: '', cvc: ''
    });

    const isBrutalist = theme.vibe === 'energetic' || theme.vibe === 'corporate' || theme.vibe === 'street';
    const inputBorderRadius = isBrutalist ? '0px' : '8px';

    // 驗證寄送表單
    const validateShipping = useCallback((): boolean => {
        const newErrors: FormErrors = {};

        if (!shippingForm.firstName.trim()) newErrors.firstName = 'Required';
        if (!shippingForm.lastName.trim()) newErrors.lastName = 'Required';
        if (!shippingForm.email.trim()) {
            newErrors.email = 'Required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingForm.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!shippingForm.address.trim()) newErrors.address = 'Required';
        if (!shippingForm.city.trim()) newErrors.city = 'Required';
        if (!shippingForm.postalCode.trim()) newErrors.postalCode = 'Required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [shippingForm]);

    // 驗證付款表單
    const validatePayment = useCallback((): boolean => {
        const newErrors: FormErrors = {};

        if (!paymentForm.cardNumber.trim()) {
            newErrors.cardNumber = 'Required';
        } else if (paymentForm.cardNumber.replace(/\s/g, '').length < 16) {
            newErrors.cardNumber = 'Enter 16 digits';
        }
        if (!paymentForm.expiry.trim()) {
            newErrors.expiry = 'Required';
        } else if (!/^\d{2}\/\d{2}$/.test(paymentForm.expiry)) {
            newErrors.expiry = 'Use MM/YY format';
        }
        if (!paymentForm.cvc.trim()) {
            newErrors.cvc = 'Required';
        } else if (paymentForm.cvc.length < 3) {
            newErrors.cvc = '3 digits required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [paymentForm]);

    const handleContinueToPayment = () => {
        if (validateShipping()) {
            setStep('payment');
            setErrors({});
        }
    };

    // NOTE: 模擬付款處理，2 秒後導向訂單成功頁
    const handlePlaceOrder = async () => {
        if (!validatePayment()) return;

        setStep('processing');

        // 生成訂單編號
        const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

        // 模擬處理延遲
        await new Promise(r => setTimeout(r, 2000));

        // 清空購物車
        clearCart();

        // 導航至訂單成功頁，透過 state 傳遞訂單資訊
        navigate('/order-success', {
            state: {
                orderId,
                total,
                itemCount: items.length,
                shippingName: `${shippingForm.firstName} ${shippingForm.lastName}`
            }
        });
    };

    // 輸入欄位元件
    const InputGroup = ({
        label,
        placeholder,
        value,
        onChange,
        error,
        type = 'text'
    }: {
        label: string;
        placeholder: string;
        value: string;
        onChange: (val: string) => void;
        error?: string;
        type?: string;
    }) => (
        <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider opacity-60 ml-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                className={`w-full px-4 py-3 bg-black/5 border outline-none transition-all ${error ? 'border-red-400 bg-red-50/30' : 'border-transparent focus:bg-white focus:border-current'}`}
                placeholder={placeholder}
                style={{ borderRadius: inputBorderRadius }}
            />
            {error && (
                <p className="text-xs text-red-500 flex items-center gap-1 ml-1">
                    <AlertCircle size={12} /> {error}
                </p>
            )}
        </div>
    );

    // 購物車為空時引導返回
    if (items.length === 0 && step !== 'processing') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20"
                style={{ backgroundColor: colors.background, color: colors.text }}>
                <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: typography.fontFamily }}>
                    Your cart is empty
                </h2>
                <p className="opacity-60 mb-8">Add some products before checking out.</p>
                <Link
                    to="/catalog"
                    className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105"
                    style={{ backgroundColor: colors.primary, color: '#fff', borderRadius }}
                >
                    Browse Catalog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: `${colors.background}`, color: colors.text }}>
            <div className="container mx-auto px-6 max-w-6xl">

                {/* 進度指示器 */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    {['Shipping', 'Payment', 'Complete'].map((label, idx) => {
                        const stepNum = idx + 1;
                        const isActive = (step === 'info' && idx === 0) || (step === 'payment' && idx === 1) || (step === 'processing' && idx === 2);
                        const isDone = (step === 'payment' && idx === 0) || (step === 'processing' && idx <= 1);
                        return (
                            <React.Fragment key={label}>
                                {idx > 0 && (
                                    <div className="w-12 h-0.5" style={{ backgroundColor: isDone ? colors.primary : `${colors.muted}30` }} />
                                )}
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                                        style={{
                                            backgroundColor: isActive || isDone ? colors.primary : `${colors.muted}20`,
                                            color: isActive || isDone ? '#fff' : colors.muted,
                                            borderRadius: isBrutalist ? '0px' : '50%'
                                        }}
                                    >
                                        {stepNum}
                                    </div>
                                    <span className={`text-sm font-medium ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                                        {label}
                                    </span>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

                    {/* 左欄：表單（佔 3/5） */}
                    <div className="lg:col-span-3 order-2 lg:order-1">
                        <AnimatePresence mode="wait">
                            {/* Step 1: 寄送資訊 */}
                            {step === 'info' && (
                                <motion.div
                                    key="info"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold" style={{ fontFamily: typography.fontFamily }}>
                                        Shipping Information
                                    </h2>

                                    <div className="grid grid-cols-2 gap-4">
                                        <InputGroup label="First Name" placeholder="John" value={shippingForm.firstName} onChange={v => setShippingForm(f => ({ ...f, firstName: v }))} error={errors.firstName} />
                                        <InputGroup label="Last Name" placeholder="Doe" value={shippingForm.lastName} onChange={v => setShippingForm(f => ({ ...f, lastName: v }))} error={errors.lastName} />
                                    </div>
                                    <InputGroup label="Email" placeholder="john@example.com" type="email" value={shippingForm.email} onChange={v => setShippingForm(f => ({ ...f, email: v }))} error={errors.email} />
                                    <InputGroup label="Address" placeholder="123 Creative Street" value={shippingForm.address} onChange={v => setShippingForm(f => ({ ...f, address: v }))} error={errors.address} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputGroup label="City" placeholder="New York" value={shippingForm.city} onChange={v => setShippingForm(f => ({ ...f, city: v }))} error={errors.city} />
                                        <InputGroup label="Postal Code" placeholder="10012" value={shippingForm.postalCode} onChange={v => setShippingForm(f => ({ ...f, postalCode: v }))} error={errors.postalCode} />
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            onClick={handleContinueToPayment}
                                            className="w-full py-4 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                                            style={{ backgroundColor: colors.primary, borderRadius: isBrutalist ? '0px' : borderRadius }}
                                        >
                                            Continue to Payment <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: 付款方式 */}
                            {step === 'payment' && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold" style={{ fontFamily: typography.fontFamily }}>
                                        Payment Method
                                    </h2>

                                    <div
                                        className="p-6 border-2 relative overflow-hidden"
                                        style={{ borderColor: colors.primary, borderRadius: isBrutalist ? '0px' : '12px', backgroundColor: `${colors.muted}05` }}
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="font-bold">Credit Card</span>
                                            <div className="flex gap-2 text-xs opacity-40">
                                                <span className="px-2 py-1 border rounded">VISA</span>
                                                <span className="px-2 py-1 border rounded">MC</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <InputGroup label="Card Number" placeholder="4242 4242 4242 4242" value={paymentForm.cardNumber} onChange={v => setPaymentForm(f => ({ ...f, cardNumber: v }))} error={errors.cardNumber} />
                                            <div className="grid grid-cols-2 gap-4">
                                                <InputGroup label="Expiry" placeholder="12/28" value={paymentForm.expiry} onChange={v => setPaymentForm(f => ({ ...f, expiry: v }))} error={errors.expiry} />
                                                <InputGroup label="CVC" placeholder="123" value={paymentForm.cvc} onChange={v => setPaymentForm(f => ({ ...f, cvc: v }))} error={errors.cvc} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex gap-4">
                                        <button
                                            onClick={() => { setStep('info'); setErrors({}); }}
                                            className="px-6 py-4 font-bold border hover:bg-black/5 transition-colors flex items-center gap-2"
                                            style={{ borderRadius: isBrutalist ? '0px' : '8px', borderColor: `${colors.text}30` }}
                                        >
                                            <ArrowLeft size={16} /> Back
                                        </button>
                                        <button
                                            onClick={handlePlaceOrder}
                                            className="flex-1 py-4 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                                            style={{ backgroundColor: colors.primary, borderRadius: isBrutalist ? '0px' : borderRadius }}
                                        >
                                            Place Order <Lock size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: 處理中 */}
                            {step === 'processing' && (
                                <motion.div
                                    key="processing"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-32 text-center"
                                >
                                    <Loader2 size={48} className="animate-spin mb-6" style={{ color: colors.primary }} />
                                    <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: typography.fontFamily }}>
                                        Processing Payment...
                                    </h2>
                                    <p className="opacity-60">Please wait while we confirm your order.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 右欄：訂單摘要（佔 2/5） */}
                    {step !== 'processing' && (
                        <div className="lg:col-span-2 order-1 lg:order-2">
                            <div
                                className="sticky top-32 p-6 space-y-6 shadow-xl"
                                style={{
                                    borderRadius: isBrutalist ? '0px' : '16px',
                                    backgroundColor: `${colors.muted}08`,
                                    border: `1px solid ${colors.muted}15`
                                }}
                            >
                                <h3 className="text-lg font-bold border-b pb-4" style={{ borderColor: `${colors.muted}20`, fontFamily: typography.fontFamily }}>
                                    Order Summary ({items.length} items)
                                </h3>
                                <div className="space-y-4 max-h-[300px] overflow-auto pr-2">
                                    {items.map(({ product, quantity }) => (
                                        <div key={product.id} className="flex gap-3">
                                            <div
                                                className="w-14 h-14 overflow-hidden flex-shrink-0"
                                                style={{ borderRadius: isBrutalist ? '0px' : '8px', backgroundColor: `${colors.muted}15` }}
                                            >
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-bold text-sm truncate">{product.name}</div>
                                                <div className="text-xs opacity-50">Qty: {quantity}</div>
                                            </div>
                                            <div className="font-bold font-mono text-sm self-center">${(product.price * quantity).toFixed(0)}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2 border-t pt-4 text-sm" style={{ borderColor: `${colors.muted}20` }}>
                                    <div className="flex justify-between">
                                        <span className="opacity-60">Subtotal</span>
                                        <span className="font-mono">${subtotal.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="opacity-60">Shipping</span>
                                        <span className="font-mono">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xl font-bold pt-3 border-t mt-2" style={{ borderColor: `${colors.muted}20` }}>
                                        <span>Total</span>
                                        <span style={{ color: colors.primary }}>${total.toFixed(0)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
