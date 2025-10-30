# Image Generator Web

Web generator gambar dengan background custom yang modern dan responsif.

## Fitur

✨ **Upload Gambar** - Drag & drop atau klik untuk upload
🎨 **Generate dengan Background** - Gambar user akan digabung dengan background custom
👁️ **Preview** - Lihat hasil generate dalam modal
⬇️ **Download** - Download hasil generate dalam format PNG
📋 **Copy Contract Address** - Copy alamat contract dengan satu klik
🔗 **Social Media Links** - Link ke Twitter (X) dan Pump.fun

## Cara Menggunakan

### 1. Setup Background

Siapkan file background image Anda (PNG, JPG, atau GIF) dan simpan dengan nama `background.png` di folder yang sama dengan file HTML.

**PENTING:** Buka file `script.js` dan ubah baris berikut dengan path background Anda:

```javascript
const BACKGROUND_IMAGE_URL = 'background.png'; // Ganti dengan path background Anda
```

Contoh alternatif:
```javascript
// Jika background di folder lain
const BACKGROUND_IMAGE_URL = 'assets/images/background.png';

// Atau menggunakan URL online
const BACKGROUND_IMAGE_URL = 'https://example.com/background.png';
```

### 2. Jalankan Web

Buka file `index.html` di browser Anda.

### 3. Cara Pakai

1. **Upload Gambar** - Klik area upload atau drag & drop gambar Anda
2. **Klik Generate** - Tunggu proses generate selesai (±1 detik)
3. **Preview** - Klik tombol Preview untuk melihat hasil full size
4. **Download** - Klik tombol Download untuk save hasil

## Struktur File

```
├── index.html      # File HTML utama
├── style.css       # File CSS untuk styling
├── script.js       # File JavaScript untuk logika
├── background.png  # Background image (siapkan sendiri)
└── README.md       # Dokumentasi
```

## Kustomisasi

### Mengubah Contract Address

Edit di file `index.html` baris:
```html
<span class="contact-address" id="contractAddress">0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8</span>
```

### Mengubah Social Media Links

Edit di file `index.html`:
```html
<a href="https://twitter.com" target="_blank" class="social-link">
<a href="https://pump.fun" target="_blank" class="social-link">
```

### Mengatur Posisi User Image

Buka `script.js` dan edit bagian ini untuk mengatur ukuran dan posisi:

```javascript
// Ukuran maksimal (default 60% dari background)
const maxWidth = background.width * 0.6;
const maxHeight = background.height * 0.6;

// Posisi (default center)
const x = (background.width - userImgWidth) / 2;
const y = (background.height - userImgHeight) / 2;
```

Contoh custom positioning:
```javascript
// Posisi kiri atas
const x = 50;
const y = 50;

// Posisi kanan bawah
const x = background.width - userImgWidth - 50;
const y = background.height - userImgHeight - 50;
```

### Mengubah Warna Gradient

Edit di file `style.css`:
```css
/* Background halaman */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Tombol generate */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## Teknologi

- HTML5
- CSS3 (Gradient, Flexbox, Grid)
- JavaScript (Canvas API, FileReader API)
- Responsive Design

## Browser Support

✅ Chrome (recommended)
✅ Firefox
✅ Safari
✅ Edge

## Tips

1. **Ukuran Background:** Gunakan background dengan resolusi tinggi (minimal 1920x1080px) untuk hasil terbaik
2. **Format File:** Background bisa PNG, JPG, atau GIF
3. **Transparansi:** Jika ingin background transparan, gunakan PNG
4. **Loading Time:** Jika background berukuran besar, loading generate mungkin lebih lama

## Troubleshooting

**Problem:** Background tidak muncul
- **Solusi:** Pastikan path BACKGROUND_IMAGE_URL sudah benar dan file background ada

**Problem:** Error CORS saat load background
- **Solusi:** Jalankan web melalui local server (misalnya menggunakan Live Server di VS Code)

**Problem:** Generate lambat
- **Solusi:** Kompres background image atau gunakan ukuran lebih kecil

## License

Free to use and modify.

## Contact

Jika ada pertanyaan atau masalah, silakan hubungi developer.

---

**Dibuat dengan ❤️ untuk kemudahan generate gambar**