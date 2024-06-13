# IMPLEMENTASI ANDROID WEB SERVER 2

## Lakukan setelah clone repository
`cordova platform add android`

## Assets yang harus disediakan
Simpan dalam folder Download di **internal storage**
1. File image bertipe **png**, beri nama landis4.png
1. File video bertipe **mp4**, beri nama Video-30.mp4
1. File index.html

## Alur Sistem
- Pastikan aplikasi mendapatkan permission untuk mengakses storage.
- Route ke file masih bersifat static.
- port yang digunakan 8000
- Request ke http://ip-address:8000 akan di-route ke file index.html
- Request ke http://ip-address:8000/image akan di-route ke file landis4.png
- Request ke http://ip-address:8000/video akan di-route ke file Video-30.mp4