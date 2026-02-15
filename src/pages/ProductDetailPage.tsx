import React, { useState } from 'react';
import { useParams, useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Truck, Shield, Share2, Check } from 'lucide-react';
import { ThemeConfig } from '../types/Theme';
import { SiteContent } from '../types/Content';
import { useCart } from '../context/CartContext';

type ContextType = { theme: ThemeConfig; content: SiteContent; setIsCartOpen: (open: boolean) => void };

export const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // const navigate = useNavigate(); // Unused
    const { theme, content, setIsCartOpen } = useOutletContext<ContextType>();
    const { colors, typography, borderRadius } = theme;

    const product = content.products.find(p => p.id === id) || content.products[0];
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [showAdded, setShowAdded] = useState(false);
    const { addToCart: addToCartContext } = useCart();

    if (!product) return <div>Product not found</div>;

    const images = [product.image, product.image, product.image]; // Mock gallery

    // NOTE: 加入購物車後顯示成功反饋，1.5 秒後自動打開購物車抽屜
    const handleAddToCart = () => {
        addToCartContext(product, quantity);
        setShowAdded(true);
        setTimeout(() => {
            setShowAdded(false);
            setIsCartOpen(true);
        }, 800);
    };

    return (
        <div className="pt-24 pb-20 container mx-auto px-6 min-h-screen">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-8 opacity-60">
                <Link to="/" className="hover:underline">Home</Link>
                <span>/</span>
                <Link to="/catalog" className="hover:underline">Catalog</Link>
                <span>/</span>
                <span className="font-bold">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left: Gallery */}
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 relative group"
                        style={{ borderRadius: theme.vibe === 'energetic' ? '0px' : borderRadius }}
                    >
                        <img
                            src={images[selectedImage]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <div className="grid grid-cols-3 gap-4">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-current' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                style={{ borderColor: selectedImage === idx ? colors.primary : 'transparent', borderRadius: theme.vibe === 'energetic' ? '0px' : '8px' }}
                            >
                                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Info */}
                <div className="lg:py-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex justify-between items-start">
                            <h1 className="text-4xl md:text-5xl mb-4 leading-tight" style={{ fontFamily: typography.fontFamily, fontWeight: '900', color: colors.text }}>
                                {product.name}
                            </h1>
                            <button className="p-2 rounded-full hover:bg-black/5 transition-colors">
                                <Share2 size={20} color={colors.text} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold" style={{ color: colors.primary }}>${product.price}</span>
                            {product.originalPrice && (
                                <span className="text-xl line-through opacity-40">${product.originalPrice.toFixed(0)}</span>
                            )}
                            <div className="flex items-center gap-1 ml-auto bg-black/5 px-3 py-1 rounded-full">
                                <Star size={14} fill="currentColor" className="text-yellow-500" />
                                <span className="text-sm font-bold">{product.rating.toFixed(1)}</span>
                                <span className="text-xs opacity-60">({product.reviews?.length || 12} reviews)</span>
                            </div>
                        </div>

                        <p className="text-lg leading-relaxed mb-8 opacity-80" style={{ color: colors.text }}>
                            {product.longDescription || product.description}
                        </p>

                        {/* Actions */}
                        <div className="flex gap-4 mb-10">
                            <div className="flex items-center border rounded-lg" style={{ borderColor: `${colors.text}30` }}>
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-black/5">-</button>
                                <span className="px-4 font-mono">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-black/5">+</button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={showAdded}
                                className={`flex-1 flex items-center justify-center gap-2 text-lg font-bold px-8 py-4 rounded-lg transition-all shadow-lg ${showAdded ? 'scale-95' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                                style={{
                                    backgroundColor: showAdded ? '#22c55e' : colors.primary,
                                    color: showAdded ? '#fff' : colors.background,
                                    borderRadius: theme.vibe === 'energetic' ? '0px' : borderRadius
                                }}
                            >
                                {showAdded ? <Check size={20} /> : <ShoppingBag size={20} />}
                                {showAdded ? 'ADDED!' : 'ADD TO CART'}
                            </button>
                        </div>

                        {/* Specs & Meta */}
                        <div className="space-y-6 pt-8 border-t" style={{ borderColor: `${colors.text}10` }}>
                            <div className="grid grid-cols-2 gap-4">
                                {product.specifications?.map((spec, i) => (
                                    <div key={i}>
                                        <div className="text-xs uppercase tracking-wider opacity-50 mb-1">{spec.label}</div>
                                        <div className="font-medium">{spec.value}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-6 pt-6 opacity-70">
                                <div className="flex items-center gap-2 text-sm">
                                    <Truck size={16} />
                                    <span>Free Shipping</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Shield size={16} />
                                    <span>2 Year Warranty</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-24 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-10 text-center" style={{ fontFamily: typography.fontFamily }}>Customer Reviews</h2>
                <div className="grid gap-6">
                    {product.reviews?.map((review, i) => (
                        <div key={i} className="p-6 rounded-xl border bg-white/5" style={{ borderColor: `${colors.text}10` }}>
                            <div className="flex justify-between items-center mb-4">
                                <div className="font-bold flex items-center gap-2">
                                    {review.user}
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">Verified</span>
                                </div>
                                <div className="text-xs opacity-50">{review.date}</div>
                            </div>
                            <div className="flex mb-3 text-yellow-500">
                                {Array.from({ length: 5 }).map((_, r) => (
                                    <Star key={r} size={14} fill={r < review.rating ? "currentColor" : "none"} />
                                ))}
                            </div>
                            <p className="opacity-80 leading-relaxed">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
