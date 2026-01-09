// Helper function to generate optimized image URLs
const optimizeImage = (path, width = null, quality = 80) => {
  if (!path) return '';
  
  // If it's already an optimized URL, return as is
  if (path.includes('?')) return path;
  
  // Encode spaces and special characters in path for srcset compatibility
  let optimizedPath = path.split('/').map(segment => encodeURIComponent(segment)).join('/');
  const params = [];
  
  if (width) params.push(`w=${width}`);
  params.push('format=webp');
  params.push(`q=${quality}`);
  
  if (params.length > 0) {
    optimizedPath += `?${params.join('&')}`;
  }
  
  return optimizedPath;
};

// Optimized product data with responsive images
export const optimizedProducts = [
    {
        id: 1,
        name: "1 Million Man",
        description: `Virosu 1 Million Man Extrait De Parfum

    * Keunggulan Produk:
    * Extrait de Parfum - Konsentrasi tinggi, wangi lebih tahan lama (12 jam)
    * Kemasan elegan & premium - Cocok untuk hadiah
    * Diproduksi dengan bahan berkualitas tinggi`,
        notes: {
            top: "Jeruk Mandarin Darah (Blood Mandarin), Grapefruit, dan Mint yang segar",
            heart: "Kayu Manis (Cinnamon), Aroma Rempah, dan Mawar",
            base: "Amber, Kulit (Leather), Kayu-kayuan, dan Nilam (Patchouli) India"
        },
        image: {
            small: optimizeImage("/assets/1 MILLION MAN/50 ML.jpg", 300, 70),
            medium: optimizeImage("/assets/1 MILLION MAN/50 ML.jpg", 600, 80),
            large: optimizeImage("/assets/1 MILLION MAN/50 ML.jpg", 1200, 85)
        },
        gallery: [
            { small: optimizeImage("/assets/1 MILLION MAN/50 ML.jpg", 300, 70), medium: optimizeImage("/assets/1 MILLION MAN/50 ML.jpg", 600, 80), large: optimizeImage("/assets/1 MILLION MAN/50 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/1 MILLION MAN/1 MILLION MAN.jpg", 300, 70), medium: optimizeImage("/assets/1 MILLION MAN/1 MILLION MAN.jpg", 600, 80), large: optimizeImage("/assets/1 MILLION MAN/1 MILLION MAN.jpg", 1200, 85) },
            { small: optimizeImage("/assets/1 MILLION MAN/30 ML.jpg", 300, 70), medium: optimizeImage("/assets/1 MILLION MAN/30 ML.jpg", 600, 80), large: optimizeImage("/assets/1 MILLION MAN/30 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/1 MILLION MAN/1 MILION MAN (2).jpg", 300, 70), medium: optimizeImage("/assets/1 MILLION MAN/1 MILION MAN (2).jpg", 600, 80), large: optimizeImage("/assets/1 MILLION MAN/1 MILION MAN (2).jpg", 1200, 85) }
        ],
        sizes: ["30ml", "50ml"],
        category: "Men",
        price: 125
    },
    {
        id: 2,
        name: "Avril Rose",
        description: `Virosu Avril Forbidden Rose Extrait De Parfum

    Parfum ini diluncurkan pada tahun 2010 dan termasuk dalam kategori Floral Fruity Gourmand. Meskipun namanya "Rose", parfum ini unik karena tidak mengandung aroma mawar sama sekali.

    * Keunggulan Produk:
    * Extrait de Parfum - Konsentrasi tinggi, wangi lebih tahan lama (12 jam)
    * Kemasan elegan & premium - Cocok untuk hadiah
    * Diproduksi dengan bahan berkualitas tinggi

    * Karakter Aroma: Feminin, manis (tapi tidak berlebihan), dan sedikit misterius.
    * Kesan: Aroma dibuka dengan kesegaran buah apel yang bersih, lalu perlahan berubah menjadi aroma cokelat dan vanila yang lembut dan hangat di kulit. Cocok untuk remaja hingga dewasa muda untuk penggunaan sehari-hari atau sekolah.`,
        notes: {
            top: "Apel Merah, Peach (Persik), dan Bourbon Pepper",
            heart: "Bunga Teratai (Lotus), Heliotrope, dan Apel Hijau",
            base: "Cokelat Meksiko, Vanila, dan Kayu Cendana (Sandalwood)"
        },
        image: {
            small: optimizeImage("/assets/AVRIL ROSE/AVRIL ROSE.jpg", 300, 70),
            medium: optimizeImage("/assets/AVRIL ROSE/AVRIL ROSE.jpg", 600, 80),
            large: optimizeImage("/assets/AVRIL ROSE/AVRIL ROSE.jpg", 1200, 85)
        },
        gallery: [
            { small: optimizeImage("/assets/AVRIL ROSE/AVRIL ROSE.jpg", 300, 70), medium: optimizeImage("/assets/AVRIL ROSE/AVRIL ROSE.jpg", 600, 80), large: optimizeImage("/assets/AVRIL ROSE/AVRIL ROSE.jpg", 1200, 85) },
            { small: optimizeImage("/assets/AVRIL ROSE/30 ML.jpg", 300, 70), medium: optimizeImage("/assets/AVRIL ROSE/30 ML.jpg", 600, 80), large: optimizeImage("/assets/AVRIL ROSE/30 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/AVRIL ROSE/50 ML.jpg", 300, 70), medium: optimizeImage("/assets/AVRIL ROSE/50 ML.jpg", 600, 80), large: optimizeImage("/assets/AVRIL ROSE/50 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/AVRIL ROSE/AVRIL.jpg", 300, 70), medium: optimizeImage("/assets/AVRIL ROSE/AVRIL.jpg", 600, 80), large: optimizeImage("/assets/AVRIL ROSE/AVRIL.jpg", 1200, 85) }
        ],
        sizes: ["30ml", "50ml"],
        category: "Women",
        price: 110
    },
    {
        id: 3,
        name: "Baccarat",
        description: `Virosu Baccarat Rouge 540 (BR540) Extrait De Parfum

    BR540 dikenal karena perpaduan ambery-woody yang sangat halus dan memberikan efek "melayang" (airy):

    * Keunggulan Produk:
    * Extrait de Parfum - Konsentrasi tinggi, wangi lebih tahan lama (12 jam)
    * Kemasan elegan & premium - Cocok untuk hadiah
    * Diproduksi dengan bahan berkualitas tinggi

    o Kesan: Memberikan pembukaan yang mewah dengan sedikit sentuhan rempah eksotis dan manis bunga yang lembut.
    o Kesan: Ini adalah "jiwa" dari Baccarat. Memberikan aroma hangat, mineral, dan sedikit nuansa "gula terbakar" atau permen kapas yang sangat dewasa dan berkelas.
    o Kesan: Memberikan nuansa kayu yang bersih, segar, dan menyeimbangkan rasa manis dari notes sebelumnya.`,
        notes: {
            top: "Saffron (Safron) dan Melati (Jasmine Grandiflorum)",
            heart: "Amberwood dan Ambergris",
            base: "Fir Resin (Getah Pohon Fir) dan Cedar (Kayu Aras)"
        },
        image: {
            small: optimizeImage("/assets/BACCARAT/50 ML.jpg", 300, 70),
            medium: optimizeImage("/assets/BACCARAT/50 ML.jpg", 600, 80),
            large: optimizeImage("/assets/BACCARAT/50 ML.jpg", 1200, 85)
        },
        gallery: [
            { small: optimizeImage("/assets/BACCARAT/50 ML.jpg", 300, 70), medium: optimizeImage("/assets/BACCARAT/50 ML.jpg", 600, 80), large: optimizeImage("/assets/BACCARAT/50 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/BACCARAT/Baccarat Home.jpg", 300, 70), medium: optimizeImage("/assets/BACCARAT/Baccarat Home.jpg", 600, 80), large: optimizeImage("/assets/BACCARAT/Baccarat Home.jpg", 1200, 85) },
            { small: optimizeImage("/assets/BACCARAT/30 ML.jpg", 300, 70), medium: optimizeImage("/assets/BACCARAT/30 ML.jpg", 600, 80), large: optimizeImage("/assets/BACCARAT/30 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/BACCARAT/BACCARAT.jpg", 300, 70), medium: optimizeImage("/assets/BACCARAT/BACCARAT.jpg", 600, 80), large: optimizeImage("/assets/BACCARAT/BACCARAT.jpg", 1200, 85) }
        ],
        sizes: ["30ml", "50ml"],
        category: "Unisex",
        price: 145
    },
    {
        id: 4,
        name: "Black Opium",
        description: `Virosu Black Opium Extrait De Parfum

    Black Opium adalah wewangian berjenis Amber Vanilla (atau sering disebut Floral Gourmand).

    * Keunggulan Produk:
    * Extrait de Parfum - Konsentrasi tinggi, wangi lebih tahan lama (12 jam)
    * Kemasan elegan & premium - Cocok untuk hadiah
    * Diproduksi dengan bahan berkualitas tinggi

    * Kesan: Segar, sedikit manis buah, dengan sentuhan rempah yang menggigit.
    * Kesan: Inilah jantung dari Black Opium. Aroma kopi yang intens memberikan efek "adrenaline rush" yang unik dan sensual.
    * Kesan: Penutup yang sangat manis, hangat, creamy, dan memberikan kesan mewah yang tahan lama.`,
        notes: {
            top: "Pir (Pear), Lada Merah Muda (Pink Pepper), dan Bunga Jeruk (Orange Blossom)",
            heart: "Kopi (Coffee), Melati (Jasmine), Bitter Almond, dan Licorice",
            base: "Vanilla, Patchouli, Cashmere Wood, dan Cedar"
        },
        image: {
            small: optimizeImage("/assets/BLACK OPIUM/Black Opium.jpg", 300, 70),
            medium: optimizeImage("/assets/BLACK OPIUM/Black Opium.jpg", 600, 80),
            large: optimizeImage("/assets/BLACK OPIUM/Black Opium.jpg", 1200, 85)
        },
        gallery: [
            { small: optimizeImage("/assets/BLACK OPIUM/Black Opium.jpg", 300, 70), medium: optimizeImage("/assets/BLACK OPIUM/Black Opium.jpg", 600, 80), large: optimizeImage("/assets/BLACK OPIUM/Black Opium.jpg", 1200, 85) },
            { small: optimizeImage("/assets/BLACK OPIUM/30ML.jpg", 300, 70), medium: optimizeImage("/assets/BLACK OPIUM/30ML.jpg", 600, 80), large: optimizeImage("/assets/BLACK OPIUM/30ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/BLACK OPIUM/50ML.jpg", 300, 70), medium: optimizeImage("/assets/BLACK OPIUM/50ML.jpg", 600, 80), large: optimizeImage("/assets/BLACK OPIUM/50ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/BLACK OPIUM/BLACK OPIUM1.jpg", 300, 70), medium: optimizeImage("/assets/BLACK OPIUM/BLACK OPIUM1.jpg", 600, 80), large: optimizeImage("/assets/BLACK OPIUM/BLACK OPIUM1.jpg", 1200, 85) }
        ],
        sizes: ["30ml", "50ml"],
        category: "Women",
        price: 130
    },
    {
        id: 5,
        name: "Blue Chanel",
        description: `Virosu Bleu de Chanel Extrait De Parfum

    * Keunggulan Produk:
    * Extrait de Parfum - Konsentrasi tinggi, wangi lebih tahan lama (12 jam)
    * Kemasan elegan & premium - Cocok untuk hadiah
    * Diproduksi dengan bahan berkualitas tinggi

    Ringkasan Profil Wewangian
    * Keluarga Aroma: Woody Aromatic (Kayu Aromatik)
    * Karakter: Elegan, halus, padat, dan "biru" (bersih tapi misterius).
    * Kesan Utama: Pria mapan dengan setelan jas navy; profesional, percaya diri, dan tidak berlebihan.`,
        notes: {
            top: "Lemon Zest, Bergamot, Mint, Artemisia",
            heart: "Lavender, Geranium, Nanas, Green Notes",
            base: "Sandalwood (Cendana), Cedar, Amberwood, Tonka Bean"
        },
        image: {
            small: optimizeImage("/assets/BLUE CHANEL/HOME.jpg", 300, 70),
            medium: optimizeImage("/assets/BLUE CHANEL/HOME.jpg", 600, 80),
            large: optimizeImage("/assets/BLUE CHANEL/HOME.jpg", 1200, 85)
        },
        gallery: [
            { small: optimizeImage("/assets/BLUE CHANEL/HOME.jpg", 300, 70), medium: optimizeImage("/assets/BLUE CHANEL/HOME.jpg", 600, 80), large: optimizeImage("/assets/BLUE CHANEL/HOME.jpg", 1200, 85) },
            { small: optimizeImage("/assets/BLUE CHANEL/blue channel.jpg", 300, 70), medium: optimizeImage("/assets/BLUE CHANEL/blue channel.jpg", 600, 80), large: optimizeImage("/assets/BLUE CHANEL/blue channel.jpg", 1200, 85) },
            { small: optimizeImage("/assets/BLUE CHANEL/BLUE CHANEL 50ML.jpg", 300, 70), medium: optimizeImage("/assets/BLUE CHANEL/BLUE CHANEL 50ML.jpg", 600, 80), large: optimizeImage("/assets/BLUE CHANEL/BLUE CHANEL 50ML.jpg", 1200, 85) }
        ],
        sizes: ["30ml", "50ml"],
        category: "Men",
        price: 135
    },
    {
        id: 6,
        name: "Bulgari Aqua",
        description: `Virosu Bvlgari Aqva Extrait De Parfum

    * Keunggulan Produk:
    * Extrait de Parfum - Konsentrasi tinggi, wangi lebih tahan lama (12 jam)
    * Kemasan elegan & premium - Cocok untuk hadiah
    * Diproduksi dengan bahan berkualitas tinggi`,
        notes: {
            top: "Mandarin Orange, Petitgrain",
            heart: "Seaweed (Rumput Laut), Lavender",
            base: "Amber, Virginia Cedar, Woodsy Notes, Clary Sage"
        },
        image: {
            small: optimizeImage("/assets/BULGARI AQUA/50 ML.jpg", 300, 70),
            medium: optimizeImage("/assets/BULGARI AQUA/50 ML.jpg", 600, 80),
            large: optimizeImage("/assets/BULGARI AQUA/50 ML.jpg", 1200, 85)
        },
        gallery: [
            { small: optimizeImage("/assets/BULGARI AQUA/50 ML.jpg", 300, 70), medium: optimizeImage("/assets/BULGARI AQUA/50 ML.jpg", 600, 80), large: optimizeImage("/assets/BULGARI AQUA/50 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/BULGARI AQUA/30 ML.jpg", 300, 70), medium: optimizeImage("/assets/BULGARI AQUA/30 ML.jpg", 600, 80), large: optimizeImage("/assets/BULGARI AQUA/30 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/BULGARI AQUA/bulgari aqua.jpg", 300, 70), medium: optimizeImage("/assets/BULGARI AQUA/bulgari aqua.jpg", 600, 80), large: optimizeImage("/assets/BULGARI AQUA/bulgari aqua.jpg", 1200, 85) },
            { small: optimizeImage("/assets/BULGARI AQUA/1.jpg", 300, 70), medium: optimizeImage("/assets/BULGARI AQUA/1.jpg", 600, 80), large: optimizeImage("/assets/BULGARI AQUA/1.jpg", 1200, 85) }
        ],
        sizes: ["30ml", "50ml"],
        category: "Men",
        price: 115
    },
    {
        id: 7,
        name: "Cranberry",
        description: `Virosu Cranberry Extrait De Parfum

    Dalam dunia parfum dikenal karena karakteristiknya yang unik: perpaduan antara rasa manis buah (fruity), rasa asam yang tajam (tart), dan sedikit nuansa pahit.

    * Keunggulan Produk:
    * Extrait de Parfum - Konsentrasi tinggi, wangi lebih tahan lama (12 jam)
    * Kemasan elegan & premium - Cocok untuk hadiah
    * Diproduksi dengan bahan berkualitas tinggi

    Karakteristik Aroma Cranberry
    * Vibe Utama: Ceria, segar, sedikit seksi, dan membangkitkan semangat.
    * Musim Terbaik: Musim Panas Memberikan kesegaran "asam manis" yang mendinginkan.
    * Musim Dingin/Liburan: Sering diasosiasikan dengan suasana Natal dan Thanksgiving (hangat namun buah).
    * Kombinasi Umum: Sering dipasangkan dengan Lemon, Teh Putih, Mawar, atau Kayu-kayuan.`,
        notes: {
            top: "",
            heart: "",
            base: ""
        },
        image: {
            small: optimizeImage("/assets/CRANBERRY/50 ML.jpg", 300, 70),
            medium: optimizeImage("/assets/CRANBERRY/50 ML.jpg", 600, 80),
            large: optimizeImage("/assets/CRANBERRY/50 ML.jpg", 1200, 85)
        },
        gallery: [
            { small: optimizeImage("/assets/CRANBERRY/50 ML.jpg", 300, 70), medium: optimizeImage("/assets/CRANBERRY/50 ML.jpg", 600, 80), large: optimizeImage("/assets/CRANBERRY/50 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/CRANBERRY/CRABERRY HOME.jpg", 300, 70), medium: optimizeImage("/assets/CRANBERRY/CRABERRY HOME.jpg", 600, 80), large: optimizeImage("/assets/CRANBERRY/CRABERRY HOME.jpg", 1200, 85) },
            { small: optimizeImage("/assets/CRANBERRY/CRANBERRY.jpg", 300, 70), medium: optimizeImage("/assets/CRANBERRY/CRANBERRY.jpg", 600, 80), large: optimizeImage("/assets/CRANBERRY/CRANBERRY.jpg", 1200, 85) }
        ],
        sizes: ["30ml", "50ml"],
        category: "Women",
        price: 95
    },
    {
        id: 8,
        name: "DHNL Blue",
        description: `Virosu DHNL Blue (Inspired by Dunhill Desire Blue) Extrait De Parfum

    DHNL Blue adalah sebutan populer di Indonesia untuk parfum inspirasi atau dupe dari Dunhill Desire Blue. Parfum ini sangat disukai karena aromanya yang memberikan kesan "pria bersih" dan segar.

    * Keunggulan Produk:
    * Extrait de Parfum - Konsentrasi tinggi, wangi lebih tahan lama (12 jam)
    * Kemasan elegan & premium - Cocok untuk hadiah
    * Diproduksi dengan bahan berkualitas tinggi

    * Karakter Aroma: Aquatic (Air), Segar, dan Sedikit Manis Buah.
    * Kesan: Aromanya sangat segar seperti baru selesai mandi. Perpaduan antara buah lengkeng yang manis dan aroma laut membuatnya tidak membosankan. Sangat cocok untuk cuaca panas di Indonesia, penggunaan di kantor, atau saat berolahraga.`,
        notes: {
            top: "Lengkeng (Litchi), Jeruk Mandarin, Bunga Teratai, dan Bergamot",
            heart: "Aroma Laut (Sea Notes), Jeruk, dan Kayu Rosewood",
            base: "Kacang Tonka (Tonka Bean), Amber, Musk, dan Benzoin"
        },
        image: {
            small: optimizeImage("/assets/DHNL BLUE/50 ML.jpg", 300, 70),
            medium: optimizeImage("/assets/DHNL BLUE/50 ML.jpg", 600, 80),
            large: optimizeImage("/assets/DHNL BLUE/50 ML.jpg", 1200, 85)
        },
        gallery: [
            { small: optimizeImage("/assets/DHNL BLUE/50 ML.jpg", 300, 70), medium: optimizeImage("/assets/DHNL BLUE/50 ML.jpg", 600, 80), large: optimizeImage("/assets/DHNL BLUE/50 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/DHNL BLUE/30 ML.jpg", 300, 70), medium: optimizeImage("/assets/DHNL BLUE/30 ML.jpg", 600, 80), large: optimizeImage("/assets/DHNL BLUE/30 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/DHNL BLUE/DHNL Blue Home.jpg", 300, 70), medium: optimizeImage("/assets/DHNL BLUE/DHNL Blue Home.jpg", 600, 80), large: optimizeImage("/assets/DHNL BLUE/DHNL Blue Home.jpg", 1200, 85) },
            { small: optimizeImage("/assets/DHNL BLUE/DHNL BLUE.jpg", 300, 70), medium: optimizeImage("/assets/DHNL BLUE/DHNL BLUE.jpg", 600, 80), large: optimizeImage("/assets/DHNL BLUE/DHNL BLUE.jpg", 1200, 85) }
        ],
        sizes: ["30ml", "50ml"],
        category: "Men",
        price: 105
    },
    {
        id: 9,
        name: "DHNL London",
        description: `Virosu Dunhill London Exrait De Parfum

    Profil Aroma (Fragrance Notes)
    Parfum ini memiliki karakter Amber Fougere yang memadukan kesegaran buah dengan kehangatan rempah dan kayu.

    * Keunggulan Produk:
    * Extrait de Parfum - Konsentrasi tinggi, wangi lebih tahan lama (12 jam)
    * Kemasan elegan & premium - Cocok untuk hadiah
    * Diproduksi dengan bahan berkualitas tinggi`,
        notes: {
            top: "Apel Merah, Bergamot, Cardamom",
            heart: "Rose (Mawar), Geranium, Jasmine",
            base: "Patchouli, Sandalwood, Tonka Bean, Vanilla, Musk"
        },
        image: {
            small: optimizeImage("/assets/DHNL LONDON/50 ML.jpg", 300, 70),
            medium: optimizeImage("/assets/DHNL LONDON/50 ML.jpg", 600, 80),
            large: optimizeImage("/assets/DHNL LONDON/50 ML.jpg", 1200, 85)
        },
        gallery: [
            { small: optimizeImage("/assets/DHNL LONDON/DHNL LONDON 10.jpg", 300, 70), medium: optimizeImage("/assets/DHNL LONDON/DHNL LONDON 10.jpg", 600, 80), large: optimizeImage("/assets/DHNL LONDON/DHNL LONDON 10.jpg", 1200, 85) },
            { small: optimizeImage("/assets/DHNL LONDON/30 ML.jpg", 300, 70), medium: optimizeImage("/assets/DHNL LONDON/30 ML.jpg", 600, 80), large: optimizeImage("/assets/DHNL LONDON/30 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/DHNL LONDON/50 ML.jpg", 300, 70), medium: optimizeImage("/assets/DHNL LONDON/50 ML.jpg", 600, 80), large: optimizeImage("/assets/DHNL LONDON/50 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/DHNL LONDON/1.jpg", 300, 70), medium: optimizeImage("/assets/DHNL LONDON/1.jpg", 600, 80), large: optimizeImage("/assets/DHNL LONDON/1.jpg", 1200, 85) }
        ],
        sizes: ["30ml", "50ml"],
        category: "Men",
        price: 110
    },
    {
        id: 10,
        name: "Lovely",
        description: `Virosu Lovely Extrait De Parfum

    Profil Aroma (Fragrance Notes)
    Lovely dikategorikan sebagai wewangian Floral Woody Musk. Aromanya sering digambarkan sebagai perpaduan antara kemewahan sutra dan kelembutan kulit.

    * Keunggulan Produk:
    * Extrait de Parfum - Konsentrasi tinggi, wangi lebih tahan lama (12 jam)
    * Kemasan elegan & premium - Cocok untuk hadiah
    * Diproduksi dengan bahan berkualitas tinggi`,
        notes: {
            top: "Lavender, Martini, Bergamot, Mandarin Orange, Rosewood",
            heart: "Patchouli, Orchid (Anggrek), Narcissus",
            base: "Musk, Woodsy Notes, Cedar, White Amber"
        },
        image: {
            small: optimizeImage("/assets/LOVELY/LOVELY.jpg", 300, 70),
            medium: optimizeImage("/assets/LOVELY/LOVELY.jpg", 600, 80),
            large: optimizeImage("/assets/LOVELY/LOVELY.jpg", 1200, 85)
        },
        gallery: [
            { small: optimizeImage("/assets/LOVELY/LOVELY.jpg", 300, 70), medium: optimizeImage("/assets/LOVELY/LOVELY.jpg", 600, 80), large: optimizeImage("/assets/LOVELY/LOVELY.jpg", 1200, 85) },
            { small: optimizeImage("/assets/LOVELY/30 ML.jpg", 300, 70), medium: optimizeImage("/assets/LOVELY/30 ML.jpg", 600, 80), large: optimizeImage("/assets/LOVELY/30 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/LOVELY/50 ML.jpg", 300, 70), medium: optimizeImage("/assets/LOVELY/50 ML.jpg", 600, 80), large: optimizeImage("/assets/LOVELY/50 ML.jpg", 1200, 85) }
        ],
        sizes: ["30ml", "50ml"],
        category: "Women",
        price: 100
    },
    {
        id: 11,
        name: "Roman Wish",
        description: `Virosu Roman Wish Extrait De Parfum

    Profil Aroma (Fragrance Notes)
    Parfum ini termasuk dalam kategori Floral Fruity (Bunga dan Buah) yang sangat segar dan ceria.

    * Keunggulan Produk:
    * Extrait de Parfum - Konsentrasi tinggi, wangi lebih tahan lama (12 jam)
    * Kemasan elegan & premium - Cocok untuk hadiah
    * Diproduksi dengan bahan berkualitas tinggi`,
        notes: {
            top: "Timun (Cucumber), Mandarin Orange",
            heart: "Jasmine (Melati), Water Hyacinth",
            base: "Musk, Woody Notes"
        },
        image: {
            small: optimizeImage("/assets/ROMAN WISH/ROMAN WISH.jpg", 300, 70),
            medium: optimizeImage("/assets/ROMAN WISH/ROMAN WISH.jpg", 600, 80),
            large: optimizeImage("/assets/ROMAN WISH/ROMAN WISH.jpg", 1200, 85)
        },
        gallery: [
            { small: optimizeImage("/assets/ROMAN WISH/ROMAN WISH.jpg", 300, 70), medium: optimizeImage("/assets/ROMAN WISH/ROMAN WISH.jpg", 600, 80), large: optimizeImage("/assets/ROMAN WISH/ROMAN WISH.jpg", 1200, 85) },
            { small: optimizeImage("/assets/ROMAN WISH/30 ML.jpg", 300, 70), medium: optimizeImage("/assets/ROMAN WISH/30 ML.jpg", 600, 80), large: optimizeImage("/assets/ROMAN WISH/30 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/ROMAN WISH/50 ML.jpg", 300, 70), medium: optimizeImage("/assets/ROMAN WISH/50 ML.jpg", 600, 80), large: optimizeImage("/assets/ROMAN WISH/50 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/ROMAN WISH/roman wish 0.jpg", 300, 70), medium: optimizeImage("/assets/ROMAN WISH/roman wish 0.jpg", 600, 80), large: optimizeImage("/assets/ROMAN WISH/roman wish 0.jpg", 1200, 85) }
        ],
        sizes: ["30ml", "50ml"],
        category: "Women",
        price: 120
    },
    {
        id: 12,
        name: "Scandal",
        description: `Virosu Victoria's Secret Scandalous Extrait De Parfum

    Profil Aroma (Fragrance Notes)
    Scandalous memiliki struktur yang cukup sederhana namun sangat efektif. Parfum ini termasuk dalam kategori Floral Fruity yang manis dan hangat.

    * Keunggulan Produk:
    * Extrait de Parfum - Konsentrasi tinggi, wangi lebih tahan lama (12 jam)
    * Kemasan elegan & premium - Cocok untuk hadiah
    * Diproduksi dengan bahan berkualitas tinggi`,
        notes: {
            top: "Raspberry Liqueur",
            heart: "Black Peony (Bunga Peony Hitam)",
            base: "Praline"
        },
        image: {
            small: optimizeImage("/assets/SCANDAL/50 ML.jpg", 300, 70),
            medium: optimizeImage("/assets/SCANDAL/50 ML.jpg", 600, 80),
            large: optimizeImage("/assets/SCANDAL/50 ML.jpg", 1200, 85)
        },
        gallery: [
            { small: optimizeImage("/assets/SCANDAL/SCANDAL.jpg", 300, 70), medium: optimizeImage("/assets/SCANDAL/SCANDAL.jpg", 600, 80), large: optimizeImage("/assets/SCANDAL/SCANDAL.jpg", 1200, 85) },
            { small: optimizeImage("/assets/SCANDAL/30 ML.jpg", 300, 70), medium: optimizeImage("/assets/SCANDAL/30 ML.jpg", 600, 80), large: optimizeImage("/assets/SCANDAL/30 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/SCANDAL/50 ML.jpg", 300, 70), medium: optimizeImage("/assets/SCANDAL/50 ML.jpg", 600, 80), large: optimizeImage("/assets/SCANDAL/50 ML.jpg", 1200, 85) }
        ],
        sizes: ["30ml", "50ml"],
        category: "Women",
        price: 125
    },
    {
        id: 13,
        name: "Taylor Swift",
        description: `Virosu Taylor Swift Extrait De Parfum

    * Keunggulan Produk:
    * Extrait de Parfum - Konsentrasi tinggi, wangi lebih tahan lama (12 jam)
    * Kemasan elegan & premium - Cocok untuk hadiah
    * Diproduksi dengan bahan berkualitas tinggi

    Karakter Umum Aroma "Taylor Swift"
    Secara keseluruhan, jika Anda mencari parfum di toko refill dengan nama "Taylor Swift", Anda akan mendapatkan aroma yang:
    * Manis & Lembut: Tidak menyengat, biasanya didominasi vanila atau buah beri.
    * Feminin: Memberikan kesan gadis yang manis, romantis, namun tetap rapi.
    * Mass-Pleasing: Sangat mudah disukai oleh siapa saja, cocok untuk sekolah, kuliah, atau bekerja.`,
        notes: {
            top: "",
            heart: "",
            base: ""
        },
        image: {
            small: optimizeImage("/assets/TAYLOR SWIFT/50 ML.jpg", 300, 70),
            medium: optimizeImage("/assets/TAYLOR SWIFT/50 ML.jpg", 600, 80),
            large: optimizeImage("/assets/TAYLOR SWIFT/50 ML.jpg", 1200, 85)
        },
        gallery: [
            { small: optimizeImage("/assets/TAYLOR SWIFT/TAYLOR SWIFT.jpg", 300, 70), medium: optimizeImage("/assets/TAYLOR SWIFT/TAYLOR SWIFT.jpg", 600, 80), large: optimizeImage("/assets/TAYLOR SWIFT/TAYLOR SWIFT.jpg", 1200, 85) },
            { small: optimizeImage("/assets/TAYLOR SWIFT/30 ML.jpg", 300, 70), medium: optimizeImage("/assets/TAYLOR SWIFT/30 ML.jpg", 600, 80), large: optimizeImage("/assets/TAYLOR SWIFT/30 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/TAYLOR SWIFT/50 ML.jpg", 300, 70), medium: optimizeImage("/assets/TAYLOR SWIFT/50 ML.jpg", 600, 80), large: optimizeImage("/assets/TAYLOR SWIFT/50 ML.jpg", 1200, 85) }
        ],
        sizes: ["30ml", "50ml"],
        category: "Women",
        price: 105
    },
    {
        id: 14,
        name: "Versace Eros",
        description: `Virosu Versace Eros Extrait De Parfum

    Love, passion, beauty, and desire. A mythic scent for a modern god, strong and luminous.

    * Extrait de Parfum - High concentration, long lasting.
    * Elegant & Premium packaging.`,
        notes: {
            top: "Mint leaves, Italian Lemon Zest, Green Apple",
            heart: "Tonka Beans, Amber, Geranium Flower, Vanilla",
            base: "Cedarwood from Atlas and Virginia, Vetyver, Oak Moss"
        },
        image: {
            small: optimizeImage("/assets/VERCASE EROS/VERCASE 50ML.jpg", 300, 70),
            medium: optimizeImage("/assets/VERCASE EROS/VERCASE 50ML.jpg", 600, 80),
            large: optimizeImage("/assets/VERCASE EROS/VERCASE 50ML.jpg", 1200, 85)
        },
        gallery: [
            { small: optimizeImage("/assets/VERCASE EROS/VERCASE EROS.jpg", 300, 70), medium: optimizeImage("/assets/VERCASE EROS/VERCASE EROS.jpg", 600, 80), large: optimizeImage("/assets/VERCASE EROS/VERCASE EROS.jpg", 1200, 85) },
            { small: optimizeImage("/assets/VERCASE EROS/30 ML.jpg", 300, 70), medium: optimizeImage("/assets/VERCASE EROS/30 ML.jpg", 600, 80), large: optimizeImage("/assets/VERCASE EROS/30 ML.jpg", 1200, 85) },
            { small: optimizeImage("/assets/VERCASE EROS/VERCASE 50ML.jpg", 300, 70), medium: optimizeImage("/assets/VERCASE EROS/VERCASE 50ML.jpg", 600, 80), large: optimizeImage("/assets/VERCASE EROS/VERCASE 50ML.jpg", 1200, 85) }
        ],
        sizes: ["30ml", "50ml"],
        category: "Men",
        price: 115
    }
];