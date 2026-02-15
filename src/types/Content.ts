export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string; // Placeholder URL
    rating: number;
    description: string;
    tags: string[];
    longDescription: string;
    specifications: { label: string; value: string }[];
    reviews: { id: string; user: string; rating: number; comment: string; date: string }[];
}

export interface SiteContent {
    siteName: string;
    heroHeadline: string;
    heroSubheadline: string;
    ctaText: string;
    products: Product[];
    footerText: string;
    about: {
        title: string;
        story: string;
        team: { name: string; role: string; image: string }[];
    };
    contact: {
        email: string;
        phone: string;
        address: string;
    };
    catalog: {
        title: string;
        description: string;
    };
}
