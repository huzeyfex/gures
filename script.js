// Arama alanını, temizleme düğmesini, sonuç sayacını ve boş sonuç mesajını seç.
const searchInput = document.querySelector("#kart-arama");
const clearButton = document.querySelector("#arama-temizle");
const resultCount = document.querySelector("#sonuc-sayaci");
const noResultsMessage = document.querySelector("#sonuc-yok");

// İçerik kartlarının listesini al.
const cards = Array.from(document.querySelectorAll(".kart"));

// Her aramada kartları yalnızca başlık metnine göre filtrele.
function updateCards() {
  // Sorgunun başındaki ve sonundaki boşlukları kaldır.
  const query = searchInput.value.trim();
  // Türkçe I/İ/ı/i harflerini doğru eşlemek için Türkçe yerel ayarını kullan.
  const normalizedQuery = query.toLocaleLowerCase("tr-TR");
  // Görünür kartların sayısını arama boyunca hesapla.
  let visibleCount = 0;

  // Her kart için başlığı alıp sorguyla Türkçe kurallarına göre karşılaştır.
  cards.forEach((card) => {
    // Başlık dışındaki açıklama ve yer bilgisini aramaya dahil etme.
    const title = card.querySelector("h2, h3").textContent.trim();
    // Boş sorgu tüm kartlarla eşleşir; dolu sorgu başlıkta aranır.
    const matches = normalizedQuery === ""
      || title.toLocaleLowerCase("tr-TR").includes(normalizedQuery);

    // Eşleşen kartı göster, eşleşmeyeni gizle.
    card.hidden = !matches;

    // Görünen kartları sayaçta say.
    if (matches) {
      visibleCount += 1;
    }
  });

  // Sayacı görünür kart sayısına göre güncelle.
  resultCount.textContent = `${visibleCount} kart gösteriliyor.`;
  // Hiç kart görünmüyorsa boş sonuç mesajını aç.
  noResultsMessage.hidden = visibleCount !== 0;
}

// Kullanıcı her yazdığında kartları yeniden filtrele.
searchInput.addEventListener("input", updateCards);

// Temizle düğmesi sorguyu silip tüm kartları tekrar gösterir.
clearButton.addEventListener("click", () => {
  // Arama alanını boşalt.
  searchInput.value = "";
  // Kart görünürlüğünü ve sayacı varsayılan duruma getir.
  updateCards();
  // Klavyeyle aramaya devam edilebilmesi için odağı alana taşı.
  searchInput.focus();
});

// Sayfa ilk açıldığında tüm kartları ve doğru sayacı göster.
updateCards();
