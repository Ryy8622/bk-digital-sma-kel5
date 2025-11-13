# Bimbingan dan Konseling | Kelompok 5

Proyek website profesional sederhana untuk layanan BK (SMA) — disiapkan agar mudah di-deploy ke GitHub Pages / Netlify.

## Fitur
- Tema biru lembut.
- Halaman: Beranda, Layanan, Kontak, Admin.
- **Admin**: simpan kontak di browser, upload poster via drag & drop (disimpan di localStorage).
- Form "Pesan Konseling" menyimpan pesan di localStorage (demo).
- Konfigurasi default ada di `config.js`.

## Cara Pakai (ringkas)
1. Ekstrak zip.
2. Ubah `config.js` bila ingin menyimpan alamat email / WA / Instagram default.
3. Untuk menambahkan logo: simpan file `assets/logo.png`.
4. Buka `index.html` di browser untuk menguji.
5. Upload seluruh folder ke repository GitHub, lalu tautkan ke Netlify (lihat `DEPLOY_INSTRUCTIONS.md`).

## Catatan penting
- Karena ini situs statis, upload poster disimpan di browser (localStorage) — jika ingin penyimpanan server (persisten) gunakan layanan seperti Netlify Functions + S3 atau CMS (Contenful/Cloudinary) — panduan singkat ada di `DEPLOY_INSTRUCTIONS.md`.
