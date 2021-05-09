# SoccerGameJS

## Tanım
Bu proje, JavaScript, html ve css kullanılarak hazırlanmış 2 oyunculu 2 boyutlu futbol oyunudur.

**Oyunu bu internet adresi üzerinden oynayabilirsiniz: [soccer.xp3.biz](http://soccer.xp3.biz/)**

## Oynanış
Kırmızı karakter w,a,s,d; mavi karakter ise 5,1,2,3 tuşlarıyla kontrol edilmektedir. Tek kişilik mod açılmak istenirse oyunun altındaki yeşil butona basılır ve mavi oyuncu bilgisayar tarafından oynatılır.
## Nasıl hazırlandı?
Oyunun görsel kısmı, Html canvas etiketi kullanılarak çizildi. JavaScript kısmında klavye fonksiyonları, ses dosyaları, oyun kuralları ve resim çizdirme olayları işletildi.

Oyunun temel kısımları:
- klavyeden girdi al
- karakterleri hareket ettir
- karakterlerin çarpışmalarını kontrol et
- gol olma durumunu kontrol et
- karakterleri ekrana yazdır ve sesleri oynat

Şeklinde bölümlere ayrılmış ve kod haline getirilmiştir.

![image](https://user-images.githubusercontent.com/55463533/117584038-2e0c8700-b113-11eb-976a-1edb6d149386.png)

## İvme Hız Konum
Oyunun gerçekçi hissettirmesi için nesneleri sabit bir hızla hareket ettirmek yerine nesnelere kuvvet uygulayarak bu kuvvetler etkisinde hareket etmeleri sağlanmıştır. Karakterlerin hareketleri, duvara çarpılması, nesnelerin birbirlerine çarpması gibi durumlarda kuvvetler etki edilmektedir. Bu olguyu uygulamak için yazdığım fonksiyon ise şöyle:
```js
function move(nesne) {
    nesne.konumx += nesne.hizx;
    nesne.konumy += nesne.hizy;

    nesne.hizx *= 0.99;
    nesne.hizy *= 0.99;
    maks = 5;
    if (magnitude(nesne.hizx, nesne.hizy) > maks) {
        nesne.hizx *= maks / magnitude(nesne.hizx, nesne.hizy);
        nesne.hizy *= maks / magnitude(nesne.hizx, nesne.hizy);
    }
}
```
## Çarpışma
İki dairesel nesnenin çarpışıp çarpışmadığını bulmak için nesnelerin merkezleri arası uzaklığının çapları toplamıyla olan oranına bakılır. Eğer çaplar toplamı uzaklıktan fazla ise çarpışma gerçekleşmiş olacaktır.  Bu olguyu uygulamak için yazdığım fonksiyon ise şöyle:

```js
function coll(nesne1, nesne2) {
    var mesafex = nesne2.konumx - nesne1.konumx;
    var mesafey = nesne2.konumy - nesne1.konumy;
    if (magnitude(mesafex, mesafey) < (nesne1.cap + nesne2.cap)) {
        averagex = nesne1.hizx - nesne2.hizx;
        averagey = nesne1.hizy - nesne2.hizy;
        nesne1.hizx -= mesafex * 0.01;
        nesne1.hizy -= mesafey * 0.01;
        nesne2.hizx += mesafex * 0.01;
        nesne2.hizy += mesafey * 0.01;

        touch.play();
    }
}
```
