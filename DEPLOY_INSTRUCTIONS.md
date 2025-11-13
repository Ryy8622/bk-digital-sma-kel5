# Panduan Deploy ke GitHub + Netlify (langkah demi langkah)

## 1. Siapkan Repository GitHub
1. Login ke https://github.com dengan akun kalian (setiap anggota memakai akun sendiri bila perlu).
2. Klik **New repository**.
3. Isi nama repo, misal `bk-digital-sma`.
4. Pilih Public (atau Private).
5. Setelah repo dibuat, pilih **Upload files** dan unggah seluruh isi folder proyek, atau:
   - Clone repo ke komputer kalian:
     ```
     git clone https://github.com/<username>/bk-digital-sma.git
     ```
   - Salin semua file proyek ke folder repo, lalu:
     ```
     git add .
     git commit -m "Init BK Digital Kelompok 5"
     git push origin main
     ```

## 2. Deploy ke Netlify
1. Daftar / login ke https://www.netlify.com menggunakan akun GitHub kalian.
2. Klik **New site** → **Import from Git** → pilih GitHub, berikan izin akses.
3. Pilih repository `bk-digital-sma`.
4. Build command: kosongkan (site ini statis), Publish directory: `/` atau `.`.
5. Klik **Deploy site**.
6. Setelah selesai deploy, buka pengaturan domain untuk mengubah nama site menjadi `bimbingankonseling-kelompok5` (atau gunakan subdomain yang tersedia).

## 3. Mengaktifkan Form Email (opsional)
- Pilihan sederhana: gunakan service formspree.io atau formsubmit.co untuk menghubungkan form ke email.
- Atau: gunakan Netlify Forms (butuh menambahkan atribut form khusus dan deploy ke Netlify).

## 4. Menyimpan Kontak Permanen
- Untuk menyimpan kontak secara permanen sebelum deploy, edit `config.js` dan isi `contactEmail`, `contactWhatsApp`, `contactInstagram`.
- Setelah itu commit & push ke GitHub, site akan menampilkan nilai tersebut sebagai default.

## 5. Menyimpan Poster Secara Permanen (opsional)
- Saat ini poster disimpan di localStorage (demo).
- Untuk penyimpanan permanen gunakan penyimpanan file eksternal (Cloudinary, S3) dan simpan URL poster ke database/CMS.
- Jika ingin, kami bisa bantu tambahkan integrasi Cloudinary / Netlify Functions — minta saja.
