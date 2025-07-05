# WhatsApp API dengan Node.js dan Express.js

## Deskripsi
Proyek ini adalah API sederhana untuk mengirim dan menerima pesan WhatsApp menggunakan pustaka [WhatsApp Web JS](https://wwebjs.dev/) yang diintegrasikan dengan framework Express.js. Proyek ini memungkinkan otomatisasi pengiriman pesan WhatsApp dan penanganan pesan masuk melalui endpoint RESTful.

## Fitur
- Mengirim pesan WhatsApp melalui endpoint API.
- Menerima pesan WhatsApp dan menyimpan data pesan.
- Autentikasi sesi WhatsApp menggunakan QR Code.
- Penanganan error dan logging.

## Prasyarat
- [Node.js](https://nodejs.org/) (versi 16 atau lebih baru)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)
- Akun WhatsApp aktif
- Browser modern untuk scanning QR Code

## Instalasi
1. **Clone repositori ini**:
   ```bash
   git clone https://github.com/username/whatsapp-api.git
   cd whatsapp-api
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi lingkungan**:
   Buat file `.env` di root proyek dan tambahkan konfigurasi berikut:
   ```env
   PORT=3000
   ```

## Cara Menjalankan
1. **Jalankan aplikasi**:
   ```bash
   npm start
   ```

2. **Autentikasi WhatsApp**:
   - Setelah menjalankan aplikasi, buka terminal untuk melihat QR Code.
   - Scan QR Code menggunakan aplikasi WhatsApp di ponsel Anda.
   - Sesi akan tersimpan untuk penggunaan berikutnya.

3. **Akses API**:
   - Server akan berjalan di `http://localhost:3000` (atau port yang dikonfigurasi).
   - Gunakan alat seperti Postman untuk menguji endpoint API.

## Struktur Proyek
```
whatsapp-api/
├── src/
│   ├── routes/
│   │   └── whatsapp.js
│   ├── services/
│   │   └── whatsappService.js
│   └── app.js
├── .env
├── package.json
└── README.md
```

## Endpoint API
### 1. Mengirim Pesan
- **URL**: `/api/send-message`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "number": "6281234567890",
    "message": "Halo, ini pesan dari API!"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Pesan terkirim"
  }
  ```

### 2. Mendapatkan Pesan Masuk
- **URL**: `/api/messages`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "from": "6281234567890",
      "message": "Halo!",
      "timestamp": "2025-07-05T14:30:00Z"
    }
  ]
  ```

## Dependensi
- [whatsapp-web.js](https://www.npmjs.com/package/whatsapp-web.js): Pustaka untuk berinteraksi dengan WhatsApp Web.
- [express](https://www.npmjs.com/package/express): Framework web untuk Node.js.
- [dotenv](https://www.npmjs.com/package/dotenv): Mengelola variabel lingkungan.
- [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal): Menampilkan QR Code di terminal.

## Kontribusi
1. Fork repositori ini.
2. Buat branch baru: `git checkout -b fitur-baru`.
3. Commit perubahan: `git commit -m 'Menambahkan fitur baru'`.
4. Push ke branch: `git push origin fitur-baru`.
5. Buat Pull Request.

## Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## Kontak
Jika Anda memiliki pertanyaan atau saran, hubungi melalui [email@example.com](mailto:email@example.com).