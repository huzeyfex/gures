| Test | Girdi | Beklenen sonuç | Gerçekleşen sonuç | Geçti/Kaldı |
|---|---|---|---|---|
| 1. Başlığın ayırt edici bölümünü ara | `karakucak` | Yalnızca eşleşen kartlar görünür; sayaç görünür kart sayısına eşit olur. |  |  |
| 2. Harf büyüklüğü ve kenar boşluklarını dene | `  KARAkucak ` | Boşluklar yok sayılır ve 1. testteki başlıkla aynı kartlar eşleşir. |  |  |
| 3. Eşleşmeyen ifade ara | `futbol` | Sayaç 0 olur ve “Sonuç bulunamadı” mesajı görünür. |  |  |
| 4. Temizle ve yalnızca boşluk ara | Önce **Temizle** düğmesine bas; sonra `   ` yaz. | Her iki durumda da tüm kartlar görünür. |  |  |
| 5. Menü bağlantılarını kontrol et | Her sayfadaki menü bağlantılarını aç. | Bağlantılar doğru sayfalara gider. |  |  |
| 6. Mobil görünüm ve klavye erişimini kontrol et | Ekran genişliği: 390 px; `Tab` ile gezin. | Yatay taşma olmaz; arama inputuna ve düğmeye klavyeyle ulaşılır. |  |  |