# Minder Rehberi — AI notları

## JavaScript araması nasıl çalışıyor?

`script.js`, içerik kartlarını arama alanına yazılan metne göre filtreler. Kart başlıkları dışındaki açıklama ve yer bilgileri aramaya dahil edilmez.

- `searchInput.addEventListener("input", updateCards)`: Kullanıcı metin eklediğinde veya sildiğinde `input` olayı tetiklenir ve `updateCards` hemen yeniden çalışır. `input` olayı, yalnızca Enter'a basılmasını bekleyen `change` olayından bu canlı arama davranışı için daha uygundur.
- `searchInput.value.trim()`: Arama alanındaki metnin başındaki ve sonundaki boşlukları temizler. Böylece `" Aba "` sorgusu `"Aba"` gibi davranır. Geriye boş sorgu kalırsa eşleşme koşulundaki `normalizedQuery === ""` tüm kartları görünür yapar.
- `toLocaleLowerCase("tr-TR")`: Sorguyu ve her kart başlığını Türkçe harf kurallarına göre küçültür. Türkçedeki `I` harfi `ı` olur; `İ` ise `i` olur. Bu nedenle büyük/küçük harf farkı aramayı bozmaz. Burada düz `toLowerCase()` kullanmak Türkçe `I/İ` eşleşmelerini beklenmedik hale getirebilir.
- `includes(normalizedQuery)`: Küçültülmüş kart başlığının, küçültülmüş sorguyu içerip içermediğini denetler. Kısmi başlık eşleşmeleri de bulunur; örneğin `aba`, “Aba Güreşi” başlığını bulur. Açıklamalarla arama yapılmaz çünkü `includes` yalnızca `h2` veya `h3` içinden alınan `title` üzerinde çalışır.
- `card.hidden = !matches`: Eşleşen kartı gösterir, eşleşmeyen kartı gizler. Eşleşmeler sayaca eklenir; sayı sıfırsa “Sonuç bulunamadı” mesajı açılır.
- “Temizle” düğmesi alanı boşaltır, filtrelemeyi yeniden çalıştırır ve odağı arama alanına geri getirir.

### Basitleştirme ve olası sorunlar

- Mevcut kod beş kart için yeterince basit ve anlaşılır. Kart başlıklarını her aramada yeniden küçültmek bu ölçekte sorun değildir. Kart sayısı çok artarsa başlıkları sayfa yüklenirken bir kez alıp normalleştirmek gereksiz tekrarları azaltabilir.
- `document.querySelector(...)` ve `card.querySelector("h2, h3")` eşleşme bulunmazsa `null` döndürür. Şu an `script.js` yalnızca gerekli HTML öğeleri ve başlıkları içeren `icerikler.html` sayfasına ekli. Script başka sayfalarda da kullanılacaksa gerekli öğeler yokken kod çalışmasını önleyecek kontroller eklenmeli veya script yalnızca bu sayfada yüklenmelidir.
- `trim()` yalnızca arama değerine ve başlıkların baş/son boşluklarına uygulanıyor; metin içindeki birden fazla boşluğu birleştirmiyor. İstenen davranış yalnızca baştaki/sondaki boşlukları silmek olduğundan bu bir hata değil.
- Türkçe karşılaştırma için `toLocaleLowerCase("tr-TR")`, basit `toLowerCase()` kullanımından daha uygundur. Testler `I`, `İ`, yalnızca boşluk, açıklamayla eşleşmeme, sıfır sonuç ve temizleme durumlarını kapsamalıdır.

## Üç ana isteğin özeti

1. **Üç sayfalı site iskeleti:** `index.html`, `icerikler.html` ve `hakkinda.html` oluşturulması; sayfalar arasında ortak gezinme menüsü, Türkçe belge dili, anlamsal etiketler ve ortak stil dosyası kullanılması istendi. Amaç, ziyaretçilerin site içinde tutarlı biçimde dolaşabilmesidir.
2. **Güreş içerikleri ve site amacı:** İçerik sayfasına beş güreş türü için başlık, kısa açıklama ve tür/yer bilgisini içeren kartlar eklenmesi; hakkında sayfasında güreşin seçilme nedeni ve rehberin ziyaretçiye faydasının anlatılması istendi.
3. **Kullanılabilirlik, görünüm ve arama:** Koyu kırmızı-krem, mobil öncelikli tasarım; kart/form/düğme stilleri ve belirgin klavye odağı istendi. Ardından içerik kartlarını yalnızca başlıklarına göre Türkçe harf duyarlılığıyla arayan, sayaç ve boş sonuç durumu gösteren, temizleme düğmeli canlı arama eklendi.