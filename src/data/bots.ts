export interface Bot {
  id: string;
  name: string;
  elo: number;
  imageUrl: string;
  group: string;
}

export const bots: Bot[] = [
  {
    "id": "martin",
    "name": "Martin",
    "elo": 250,
    "group": "Beginner",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/a6e19caa-8a5a-11ea-b74e-55003725fb61.909cbd47.384x384o.c4d23e9051ff.png"
  },
  {
    "id": "wayne",
    "name": "Wayne",
    "elo": 250,
    "group": "Beginner",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/ac16fe04-8a5a-11ea-bb47-296cc7266a00.ad724fed.384x384o.426726712fe5.png"
  },
  {
    "id": "fabian",
    "name": "Fabian",
    "elo": 250,
    "group": "Beginner",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/b1cb4ada-8a5a-11ea-9ec9-c74e0c8f68cb.721a73c0.384x384o.2fb92e8b879a.png"
  },
  {
    "id": "juan",
    "name": "Juan",
    "elo": 400,
    "group": "Beginner",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/b8e0dfc4-8a5a-11ea-91b7-4d4878d1bdec.767c1284.384x384o.b116c4775239.png"
  },
  {
    "id": "filip",
    "name": "Filip",
    "elo": 400,
    "group": "Beginner",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/c02f3762-8a5a-11ea-b8d1-6581722e183f.582fd278.384x384o.dfa747c82121.png"
  },
  {
    "id": "elani",
    "name": "Elani",
    "elo": 400,
    "group": "Beginner",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/c62b39f4-8a5a-11ea-bbe4-51aff3d2d9d5.c7d554bf.384x384o.d253af8b28cc.png"
  },
  {
    "id": "noel",
    "name": "Noel",
    "elo": 550,
    "group": "Beginner",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/323c4b38-8a5b-11ea-9c14-4d8e79ee5906.1256a75f.384x384o.17903a6c188d.png"
  },
  {
    "id": "oliver",
    "name": "Oliver",
    "elo": 550,
    "group": "Beginner",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/37e57528-8a5b-11ea-b169-e77fb0bc2332.f70b8608.384x384o.31a9526fec54.png"
  },
  {
    "id": "milica",
    "name": "Milica",
    "elo": 550,
    "group": "Beginner",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/68a88240-8a5b-11ea-8c5f-037959888e07.ff379a19.384x384o.8f5252e6ab2a.png"
  },
  {
    "id": "aron",
    "name": "Aron",
    "elo": 700,
    "group": "Beginner",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/7fe6c61a-8a5b-11ea-9b04-3de0f4d0bfd8.c98cd9ec.384x384o.85099b8f28bf.png"
  },
  {
    "id": "janjay",
    "name": "Janjay",
    "elo": 700,
    "group": "Beginner",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/79d79290-8a5b-11ea-a7cb-a9719a339cd3.82a163ad.384x384o.b1ac54f73ac9.png"
  },
  {
    "id": "mina",
    "name": "Mina",
    "elo": 700,
    "group": "Beginner",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/8791bcf8-8a5b-11ea-b9cb-3349517cc907.92754f4e.384x384o.9a9dc0aaaf73.png"
  },
  {
    "id": "zara",
    "name": "Zara",
    "elo": 850,
    "group": "Beginner",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/8cd774f0-8a5b-11ea-abe7-c34f4fa2aa56.ff258f3a.384x384o.24b165356308.png"
  },
  {
    "id": "santiago",
    "name": "Santiago",
    "elo": 850,
    "group": "Beginner",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/bd0ba8b2-8a5b-11ea-9444-d10096d2e5bd.d78ba5a4.384x384o.d46ec28388a0.png"
  },
  {
    "id": "karim",
    "name": "Karim",
    "elo": 850,
    "group": "Beginner",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/c2bced0c-8a5b-11ea-9599-814b01ee3c2c.2b92ff65.384x384o.798416afaad4.png"
  },
  {
    "id": "maria",
    "name": "Maria",
    "elo": 1000,
    "group": "Intermediate",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/ee8ff9d8-8a5b-11ea-ad88-f9bb1877a81f.c17c3d32.384x384o.3072a453d392.png"
  },
  {
    "id": "maxim",
    "name": "Maxim",
    "elo": 1000,
    "group": "Intermediate",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/cb25dc24-8a5b-11ea-b8b6-03899014426b.e1b012fc.384x384o.23365187be0e.png"
  },
  {
    "id": "hans",
    "name": "Hans",
    "elo": 1000,
    "group": "Intermediate",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/d0464090-8a5b-11ea-aa77-0f6eaa220abf.55e4bab9.384x384o.0b7e54d1c0de.png"
  },
  {
    "id": "azeez",
    "name": "Azeez",
    "elo": 1100,
    "group": "Intermediate",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/d648779c-8a5b-11ea-b214-b5771e1306c2.8097e7aa.384x384o.51e37d0bc406.png"
  },
  {
    "id": "laura",
    "name": "Laura",
    "elo": 1100,
    "group": "Intermediate",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/e14b957a-8a5b-11ea-b5e6-d1abeb75938d.4d42f1ad.384x384o.4dfd695830f0.png"
  },
  {
    "id": "sven",
    "name": "Sven",
    "elo": 1100,
    "group": "Intermediate",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/e7e1fe4c-8a5b-11ea-9933-45b802196af0.914add75.384x384o.4939f93d48c9.png"
  },
  {
    "id": "emir",
    "name": "Emir",
    "elo": 1200,
    "group": "Intermediate",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/c7261c74-8a5b-11ea-aada-85bc72dea6a4.9609c730.384x384o.3c521a86c2c0.png"
  },
  {
    "id": "elena",
    "name": "Elena",
    "elo": 1200,
    "group": "Intermediate",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/f3f81072-8a5b-11ea-8cb3-a5c17a0db466.e137cbdd.384x384o.662097fcba78.png"
  },
  {
    "id": "wilson",
    "name": "Wilson",
    "elo": 1200,
    "group": "Intermediate",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/0aa55a1e-8a5c-11ea-aa7d-ef7a422e2399.49ecab8c.384x384o.4ec9d6c4ad2a.png"
  },
  {
    "id": "vinh",
    "name": "Vinh",
    "elo": 1300,
    "group": "Intermediate",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/165f0698-8a5c-11ea-bf03-d15d66821327.e7eb2431.384x384o.4d879c09c64b.png"
  },
  {
    "id": "nelson",
    "name": "Nelson",
    "elo": 1300,
    "group": "Intermediate",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/1255433c-8a5c-11ea-987e-9f25bc503404.98de4560.384x384o.e7a1bf5d0a38.png"
  },
  {
    "id": "jade",
    "name": "Jade",
    "elo": 1300,
    "group": "Intermediate",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/0e71f580-8a5c-11ea-8bce-172f6bd1af51.eafc10cf.384x384o.32ba008057dc.png"
  },
  {
    "id": "david",
    "name": "David",
    "elo": 1400,
    "group": "Intermediate",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/1b4dcc34-8a5c-11ea-a781-ad758473f468.e4a6ac22.384x384o.4c8204db97c1.png"
  },
  {
    "id": "ali",
    "name": "Ali",
    "elo": 1400,
    "group": "Intermediate",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/210b2da6-8a5c-11ea-a016-ff6605a502f5.043f1663.384x384o.ce1e6e87e5e3.png"
  },
  {
    "id": "mateo",
    "name": "Mateo",
    "elo": 1400,
    "group": "Intermediate",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/2636b818-8a5c-11ea-a681-5717011b704a.8d38daad.384x384o.f7abfd8bc3a9.png"
  },
  {
    "id": "wendy",
    "name": "Wendy",
    "elo": 1500,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/30326f88-8a5c-11ea-b234-9b639e301bef.adf1facd.384x384o.39ecdf8795d5.png"
  },
  {
    "id": "antonio",
    "name": "Antonio",
    "elo": 1500,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/2ae58682-8a5c-11ea-8958-558a4147aa4e.30b5be17.384x384o.d88989b2e422.png"
  },
  {
    "id": "pierre",
    "name": "Pierre",
    "elo": 1500,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/34969388-8a5c-11ea-bdfc-3ff06f74a3ef.43bf512d.384x384o.bf47bba109b8.png"
  },
  {
    "id": "pablo",
    "name": "Pablo",
    "elo": 1600,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/3a3c172c-8a5c-11ea-834e-f16bd389c7af.38264e1e.384x384o.085bc4075263.png"
  },
  {
    "id": "joel",
    "name": "Joel",
    "elo": 1600,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/4a5da9cc-8a5c-11ea-aad2-7388bc7000a8.5585b65c.384x384o.391d7bef033e.png"
  },
  {
    "id": "isabel",
    "name": "Isabel",
    "elo": 1600,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/602f4508-8a5c-11ea-9365-f16c332a1c43.c3375b33.384x384o.50c42fb8c4bc.png"
  },
  {
    "id": "arthur",
    "name": "Arthur",
    "elo": 1700,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/74698998-8a5c-11ea-98d0-b5c16ffc4fbe.8d771d16.384x384o.1e65d2e761f4.png"
  },
  {
    "id": "jonas",
    "name": "Jonas",
    "elo": 1700,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/7939dfa4-8a5c-11ea-a657-a96802def29e.1a95acb8.384x384o.79c9e9477dc6.png"
  },
  {
    "id": "isla",
    "name": "Isla",
    "elo": 1700,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/7dac4d24-8a5c-11ea-a8d0-25a57db3c188.fbf93445.384x384o.06ae446ab5e4.png"
  },
  {
    "id": "lorenzo",
    "name": "Lorenzo",
    "elo": 1800,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/821804fc-8a5c-11ea-8447-d514c04d9737.7dc420eb.384x384o.946a7c11b9b0.png"
  },
  {
    "id": "wally",
    "name": "Wally",
    "elo": 1800,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/86e0fc3c-8a5c-11ea-9012-59fc3f94355a.5714f3e1.384x384o.f4ea12a364a0.png"
  },
  {
    "id": "julia",
    "name": "Julia",
    "elo": 1800,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/8ba4de5a-8a5c-11ea-9950-89750a5b6072.d48550a2.384x384o.58dfda8974b3.png"
  },
  {
    "id": "miguel",
    "name": "Miguel",
    "elo": 1900,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/90623258-8a5c-11ea-a392-33dc43ec92d0.1da9a87d.384x384o.f15a06743f20.png"
  },
  {
    "id": "xavier",
    "name": "Xavier",
    "elo": 1900,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/956a9cea-8a5c-11ea-b41b-9b0a29ce7bd2.cdd0a6b8.384x384o.7fc8278155f3.png"
  },
  {
    "id": "olga",
    "name": "Olga",
    "elo": 1900,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/99e9e62c-8a5c-11ea-8987-59ada08f1789.3b129a5b.384x384o.a9c62c95de84.png"
  },
  {
    "id": "li",
    "name": "Li",
    "elo": 2000,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/9e37903a-8a5c-11ea-9f38-fb3b18cf7113.5cde37a0.384x384o.cd1bcdd617f0.png"
  },
  {
    "id": "charles",
    "name": "Charles",
    "elo": 2000,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/a1f8c5e0-8a5c-11ea-880b-3766eb35e95a.ae702bbf.384x384o.3ba654b199c8.png"
  },
  {
    "id": "fatima",
    "name": "Fatima",
    "elo": 2000,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/a770412e-8a5c-11ea-b86a-a7455e4b910d.78ebc1df.384x384o.ea5a31692008.png"
  },
  {
    "id": "manuel",
    "name": "Manuel",
    "elo": 2100,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/affd659c-8a5c-11ea-af24-23a01e44322c.4e245e39.384x384o.473feddadf40.png"
  },
  {
    "id": "oscar",
    "name": "Oscar",
    "elo": 2100,
    "group": "Advanced",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/b3baeede-8a5c-11ea-9dcb-370f2b8e1590.5926df13.384x384o.628c555288ba.png"
  },
  {
    "id": "nora",
    "name": "Nora",
    "elo": 2200,
    "group": "Master",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/bdd36e82-8a5c-11ea-b774-516d3353b2f2.7af80eea.384x384o.74b89e2e6267.png"
  },
  {
    "id": "noam",
    "name": "Noam",
    "elo": 2200,
    "group": "Master",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/b8f9c1a4-8a5c-11ea-ae54-c75c26192fb8.3dc0716c.384x384o.2991d59a61fa.png"
  },
  {
    "id": "ahmed",
    "name": "Ahmed",
    "elo": 2200,
    "group": "Master",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/d1fb96aa-8a5c-11ea-ab59-13a89982e703.a2aa087c.384x384o.5ddbc8de5666.png"
  },
  {
    "id": "sakura",
    "name": "Sakura",
    "elo": 2200,
    "group": "Master",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/d69d6df0-8a5c-11ea-9ab7-21ebd23433b8.864270df.384x384o.7b467b0c4000.png"
  },
  {
    "id": "arjun",
    "name": "Arjun",
    "elo": 2300,
    "group": "Master",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/db09a52a-8a5c-11ea-b6a2-0f83b32197ca.081518ce.384x384o.cf63bc0bf247.png"
  },
  {
    "id": "francis",
    "name": "Francis",
    "elo": 2300,
    "group": "Master",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/df6633b8-8a5c-11ea-b668-8704520de7fd.e5dc7291.384x384o.a47bdf734c2c.png"
  },
  {
    "id": "sofia",
    "name": "Sofia",
    "elo": 2300,
    "group": "Master",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/e45728c8-8a5c-11ea-92b6-d1fcd657d3ce.df24408b.384x384o.e6dafcbcf15f.png"
  },
  {
    "id": "alexander",
    "name": "Alexander",
    "elo": 2450,
    "group": "Master",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/e9008f72-8a5c-11ea-818d-6577049edf35.10c95fe6.384x384o.de5b03a58fb8.png"
  },
  {
    "id": "luke",
    "name": "Luke",
    "elo": 2450,
    "group": "Master",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/ecf96dd8-8a5c-11ea-bcde-d35c1471c588.8dbcb254.384x384o.d3876164bc13.png"
  },
  {
    "id": "wei",
    "name": "Wei",
    "elo": 2450,
    "group": "Master",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/f1d9cd52-8a5c-11ea-9f39-232bdab6a8f9.b9baf5f7.384x384o.19c6bfd419f2.png"
  },
  {
    "id": "jimmy",
    "name": "Jimmy",
    "elo": 600,
    "group": "Adaptive",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/f900bba2-8a59-11ea-9b00-77e384ff7d49.3f025953.384x384o.89a5f2a1cb5c.png"
  },
  {
    "id": "nisha",
    "name": "Nisha",
    "elo": 900,
    "group": "Adaptive",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/3c54bce6-8a5a-11ea-8969-d93d0facecb3.bedfd411.384x384o.bb734e730f3b.png"
  },
  {
    "id": "tomas",
    "name": "Tomas",
    "elo": 1200,
    "group": "Adaptive",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/61ba93b6-8a5a-11ea-b53b-d7f9fd2e8de1.11f161ca.384x384o.6e164578f98d.png"
  },
  {
    "id": "devon",
    "name": "Devon",
    "elo": 1600,
    "group": "Adaptive",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/96c2e64e-8a5a-11ea-9cd4-030513c03dc1.974b26d1.384x384o.511d8ddbfe2f.png"
  },
  {
    "id": "natasha",
    "name": "Natasha",
    "elo": 2000,
    "group": "Adaptive",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/9e5a8c40-8a5a-11ea-8148-9552b1fceca7.e256f956.384x384o.3439293309a6.png"
  },
  {
    "id": "aerial-powers",
    "name": "Aerial Powers",
    "elo": 1100,
    "group": "Athletes",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/811d9ab4-1b8c-11f0-86ce-efd0265768a6.cfa8800c.384x384o.62368d7c284b.png"
  },
  {
    "id": "dejan-joveljic",
    "name": "Dejan Joveljic",
    "elo": 2217,
    "group": "Athletes",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/9dc2a81c-47dc-11f1-93a6-29284157fe93.7f58320a.384x384o.0aabc3bf4005.png"
  },
  {
    "id": "justin-reid",
    "name": "Justin Reid",
    "elo": 1300,
    "group": "Athletes",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/01718494-a763-11ef-93bc-e785465d751e.a0f38fa3.384x384o.f8c73f6f78dc.png"
  },
  {
    "id": "joey-votto",
    "name": "Joey Votto",
    "elo": 1575,
    "group": "Athletes",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/ceedda5c-fa40-11ed-ab90-e74b6da157d0.81a06c82.384x384o.6edb096eedfb.png"
  },
  {
    "id": "larry-fitzgerald-jr-",
    "name": "Larry Fitzgerald Jr.",
    "elo": 1250,
    "group": "Athletes",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/842e5266-08ce-11ee-b094-c769c4cd86b4.2dab04ba.384x384o.9d40b6351669.png"
  },
  {
    "id": "jaylen-brown",
    "name": "Jaylen Brown",
    "elo": 1500,
    "group": "Athletes",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/8bba220a-2a41-11ee-865c-87c702c2364f.418e0bd4.384x384o.8c75373c03e2.png"
  },
  {
    "id": "drue-tranquill",
    "name": "Drue Tranquill",
    "elo": 1300,
    "group": "Athletes",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/660b0600-a763-11ef-a9e2-5bb136eaab61.6d0c6126.384x384o.e6bcfdbbd422.png"
  },
  {
    "id": "gordon-hayward",
    "name": "Gordon Hayward",
    "elo": 1350,
    "group": "Athletes",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/7d638cec-e5f8-11ed-b31b-b10e4e10b9f8.a94641ac.384x384o.a2b26dcee30f.png"
  },
  {
    "id": "chidobe-awuzie",
    "name": "Chidobe Awuzie",
    "elo": 1400,
    "group": "Athletes",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/7abc3382-0aaf-11ee-b06d-7fc9d8bef957.b2ebb873.384x384o.6fbcec1889e9.png"
  },
  {
    "id": "christian-pulisic",
    "name": "Christian Pulisic",
    "elo": 1500,
    "group": "Athletes",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/b4adb018-7a43-11ed-bbf3-efbc88fdef24.ef44b486.384x384o.a923be3e4f96.png"
  },
  {
    "id": "jaime-jaquez-jr-",
    "name": "Jaime Jaquez Jr.",
    "elo": 1150,
    "group": "Athletes",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/0795ae7a-8d57-11ef-a211-33b52545b994.225cc1a9.384x384o.1530bb2b975c.png"
  },
  {
    "id": "daryl-morey",
    "name": "Daryl Morey",
    "elo": 1550,
    "group": "Athletes",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/33d0dc2a-ed9a-11ed-8084-3f7836adb5f3.771623a1.384x384o.408bbb79e792.png"
  },
  {
    "id": "luk-ai",
    "name": "Luk.AI",
    "elo": 2500,
    "group": "Athletes",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/f7821a7a-abe2-11ed-ac3a-291a91795341.0f3af634.384x384o.2a7214dea078.png"
  },
  {
    "id": "yoko-ono",
    "name": "Yoko Ono",
    "elo": 1500,
    "group": "Musicians",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/90bca59e-0c83-11f1-b2ff-87800f13c1a3.289af467.384x384o.461a593e34ba.png"
  },
  {
    "id": "thomas-mars",
    "name": "Thomas Mars",
    "elo": 1500,
    "group": "Musicians",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/909edaa2-f2d4-11ee-9c29-ff0b4f8c352f.a0248349.384x384o.f265173ed1e8.png"
  },
  {
    "id": "steve-aoki",
    "name": "Steve Aoki",
    "elo": 1000,
    "group": "Musicians",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/30e1718c-5b39-11f0-8ba3-4b5fceb2f270.8bee677d.384x384o.136b4de2a61c.png"
  },
  {
    "id": "logic",
    "name": "Logic",
    "elo": 1500,
    "group": "Musicians",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/80498daa-7a44-11ed-aba5-51765345f0f8.422f9a26.384x384o.504638bc95ae.png"
  },
  {
    "id": "wallows",
    "name": "Wallows",
    "elo": 1200,
    "group": "Musicians",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/3fa217f2-4939-11ef-8be1-a9e17496e4b5.7c9a4b9c.384x384o.0f54c9026412.png"
  },
  {
    "id": "svetlana",
    "name": "Svetlana",
    "elo": 650,
    "group": "Chess the Musical",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/50ce4bee-498d-11f1-8e82-0511df08dfe8.0c332e0d.384x384o.4fc1a1b63429.png"
  },
  {
    "id": "florence",
    "name": "Florence",
    "elo": 1300,
    "group": "Chess the Musical",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/user/490488919.a5aae73f.384x384o.0c822df310bd.png"
  },
  {
    "id": "the-arbiter",
    "name": "The Arbiter",
    "elo": 1650,
    "group": "Chess the Musical",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/bc05c256-498e-11f1-8801-173581322a25.71d90051.384x384o.9a97e8c4ca6c.png"
  },
  {
    "id": "freddie",
    "name": "Freddie",
    "elo": 2700,
    "group": "Chess the Musical",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/user/490489055.51633283.384x384o.a1f551f14fda.png"
  },
  {
    "id": "anatoly",
    "name": "Anatoly",
    "elo": 2725,
    "group": "Chess the Musical",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/user/490489161.8b5b10ab.384x384o.4a9342536364.png"
  },
  {
    "id": "xqc",
    "name": "xQc",
    "elo": 1200,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/c74b9234-43cd-11eb-b19b-533cec43220e.ba764f4c.384x384o.6e9f442fbf93.png"
  },
  {
    "id": "mark-rober",
    "name": "Mark Rober",
    "elo": 1200,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/b12ac6d4-3d73-11ef-9aa1-435b38ff5f86.b40cb9e8.384x384o.e97df52ff940.png"
  },
  {
    "id": "mrbeast",
    "name": "MrBeast",
    "elo": 1100,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/ec78e3ca-6715-11eb-9ef9-8df33c4083ad.0cd57d8d.384x384o.b1566879e238.png"
  },
  {
    "id": "pokimane",
    "name": "Pokimane",
    "elo": 1000,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/81e4a3b6-60fb-11eb-9347-73b9f8bd6d32.45d76569.384x384o.92158d182f39.png"
  },
  {
    "id": "ludwig",
    "name": "Ludwig",
    "elo": 1200,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/3472467a-619a-11eb-8f91-e9892a43ba12.c0de9a4c.384x384o.1256e981dcda.png"
  },
  {
    "id": "qtcinderella",
    "name": "QTCinderella",
    "elo": 900,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/26d05ad2-11aa-11ec-bb93-2d9c46e27b36.8f9927f1.384x384o.02746b21df73.png"
  },
  {
    "id": "boxbox",
    "name": "boxbox",
    "elo": 1400,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/3c3844de-11aa-11ec-9db6-cbbb68b764f7.1d5a4e32.384x384o.9ade12656abd.png"
  },
  {
    "id": "harrymack",
    "name": "HarryMack",
    "elo": 600,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/659c6a6c-11aa-11ec-97fe-4334f15d97b6.07c6cd81.384x384o.8c1f61c521b7.png"
  },
  {
    "id": "sapnap",
    "name": "Sapnap",
    "elo": 1000,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/fe71267a-b9f9-11ee-849a-3bd867868610.eb28298f.384x384o.59a90470f996.png"
  },
  {
    "id": "wirtual",
    "name": "Wirtual",
    "elo": 1100,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/53ebebf8-b9fa-11ee-a2d7-17d741847d8c.f293038a.384x384o.50dfca2219d0.png"
  },
  {
    "id": "iamcristinini",
    "name": "IamCristinini",
    "elo": 800,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/5599b26c-af07-11ee-86cc-9f60f1ea0ce9.6d554f78.384x384o.8b04bbecebc5.png"
  },
  {
    "id": "neeko",
    "name": "Neeko",
    "elo": 800,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/ad97e3c8-619c-11eb-9bc0-7710ca7b40a8.cc2aa1f4.384x384o.d4300c8d35ee.png"
  },
  {
    "id": "gothamchess",
    "name": "GothamChess",
    "elo": 2500,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/b1e01f52-30e8-11eb-abb2-43bc29dd534e.20b7ec47.384x384o.b4ef21ebfd36.png"
  },
  {
    "id": "andrea",
    "name": "Andrea",
    "elo": 1801,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/e40e1158-495e-11eb-9512-bff44ac29a21.fa1fcbc0.384x384o.eb609667bae6.png"
  },
  {
    "id": "alexandra",
    "name": "Alexandra",
    "elo": 2100,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/00950078-8a5d-11ea-81d7-274863e26784.8a84b7c1.384x384o.4caefedb8dd9.png"
  },
  {
    "id": "eric",
    "name": "Eric",
    "elo": 2600,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/25921980-4a13-11eb-ade1-435fc71bc7e3.0aee1600.384x384o.faa1ff371dea.png"
  },
  {
    "id": "aman",
    "name": "Aman",
    "elo": 2550,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/8a90a010-4a1b-11eb-b75a-fd0693079b20.c57f466a.384x384o.8b329c37c09c.png"
  },
  {
    "id": "anna",
    "name": "Anna",
    "elo": 2400,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/63c66948-3421-11eb-9c89-eb93ce2c2f9d.3eeabd29.384x384o.b37c25854626.png"
  },
  {
    "id": "nemo",
    "name": "Nemo",
    "elo": 2300,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/68d5a718-7ae0-11eb-b0d0-754cfa1fff2d.75cce9db.384x384o.8f2939f9c24e.png"
  },
  {
    "id": "anna-cramling",
    "name": "Anna Cramling",
    "elo": 2175,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/cb0c0148-7ae5-11eb-85e1-cf583a3a9b5a.b66ca5cf.384x384o.4151808b3767.png"
  },
  {
    "id": "samay",
    "name": "Samay",
    "elo": 1800,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/4e50198c-4f98-11eb-bdb6-4d4fd77b1bfd.4e928466.384x384o.0e36b185da22.png"
  },
  {
    "id": "naycir",
    "name": "Naycir",
    "elo": 1300,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/6b95f31c-8cd4-11eb-9726-ebd8bfd958e0.2c91a405.384x384o.8f2219aed2db.png"
  },
  {
    "id": "canty",
    "name": "Canty",
    "elo": 2300,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/3458ffc6-7ad1-11eb-8a8e-5353360b8686.7d055864.384x384o.00b6bbd01661.png"
  },
  {
    "id": "el-deplorable",
    "name": "El Deplorable",
    "elo": 2200,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/3fdff2e0-af09-11ee-835d-435e02cc0ce2.6c6fc63a.384x384o.a0ffb68035f1.png"
  },
  {
    "id": "bartosz",
    "name": "Bartosz",
    "elo": 2000,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/fd5fc976-d2d4-11eb-8257-fb9bd2c70bb9.e8b9e266.384x384o.024c6be00b50.png"
  },
  {
    "id": "cdawgva",
    "name": "CDawgVA",
    "elo": 900,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/08911788-aeff-11ee-a758-2516323053e2.9f722bbb.384x384o.03068e3eca54.png"
  },
  {
    "id": "hafu",
    "name": "Hafu",
    "elo": 1500,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/4e3a1f30-ac57-11eb-a80c-53d6fd0d0672.c444d3a8.384x384o.16dbce08e9fd.png"
  },
  {
    "id": "sardoche",
    "name": "Sardoche",
    "elo": 1800,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/e5912b60-ac54-11eb-a2fb-c12d13821ebf.96123db2.384x384o.fc70dec8a74a.png"
  },
  {
    "id": "fundy",
    "name": "Fundy",
    "elo": 1500,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/b0d91980-17ef-11ec-b53d-b39dc8096b53.954f3979.384x384o.8e2c2cffc64f.png"
  },
  {
    "id": "sabo",
    "name": "Sabo",
    "elo": 1969,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/6d924f34-d376-11ef-821e-d53bd730e180.03463bb2.384x384o.d7865d640411.png"
  },
  {
    "id": "sonicfox",
    "name": "SonicFox",
    "elo": 1750,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/19e39636-99de-11ee-932f-f91a49e70db7.b516b025.384x384o.2bb08959295a.png"
  },
  {
    "id": "julien-song",
    "name": "Julien Song",
    "elo": 2422,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/e6973d90-3ff0-11f0-a1c2-e3c5dd39afa4.67e2aa7d.384x384o.d6f2e04cbd3b.png"
  },
  {
    "id": "rey-enigma",
    "name": "Rey Enigma",
    "elo": 2500,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/0ad67090-af06-11ee-9302-cfb45b774479.c052d679.384x384o.703ee7c68f7d.png"
  },
  {
    "id": "raffa-chess",
    "name": "Raffa Chess",
    "elo": 2100,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/88808328-6337-11f0-bb6b-db17c38d1335.f4bef02c.384x384o.3dc20ce0da5c.png"
  },
  {
    "id": "anarchy-bot",
    "name": "Anarchy Bot",
    "elo": 1660,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/9ea92854-802e-11ef-95b2-577ddfc09443.bc8bafbd.384x384o.3f4cb4806f72.png"
  },
  {
    "id": "google-en-passant-bot",
    "name": "Google En Passant Bot",
    "elo": 1200,
    "group": "Creators",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/c3cfe83e-4798-11f0-9b41-2ff72f938168.b70635ad.384x384o.b3e41c3a0913.png"
  },
  {
    "id": "hikaru",
    "name": "Hikaru",
    "elo": 2820,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/faffe24a-8a5c-11ea-8907-3d0e2fea8a28.c7bd1399.384x384o.4830acf9a24d.png"
  },
  {
    "id": "anna-muzychuk",
    "name": "Anna Muzychuk",
    "elo": 2606,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/f55ff4fa-c38a-11ed-95f2-6b0e117ebaef.22a70519.384x384o.6fd285116c8f.png"
  },
  {
    "id": "vishy",
    "name": "Vishy",
    "elo": 2820,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/a78130fe-34c2-11eb-9a32-e3d0d73fdcb2.c5adda2b.384x384o.4180ce2ef43d.png"
  },
  {
    "id": "ding-liren",
    "name": "Ding Liren",
    "elo": 2788,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/ae23994c-d330-11ed-b694-0b48dafff0d7.62e74af4.384x384o.14ca8955b93f.png"
  },
  {
    "id": "fabiano",
    "name": "Fabiano",
    "elo": 2840,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/8bd3b42e-3e73-11ec-9e5e-7994d5ba605a.9e9fc6df.384x384o.603c9d56f6bf.png"
  },
  {
    "id": "kosteniuk",
    "name": "Kosteniuk",
    "elo": 2561,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/0e4109f4-4940-11eb-a509-15ed3d17e66f.648684bd.384x384o.ac5327d73af3.png"
  },
  {
    "id": "danya",
    "name": "Danya",
    "elo": 2650,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/a17a48f2-4ecc-11eb-ad24-b3185f1c14a7.5236e0e0.384x384o.c5fd9f2e85fa.png"
  },
  {
    "id": "ian",
    "name": "Ian",
    "elo": 2795,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/6756dcc0-3e73-11ec-86ee-79b6cb69a366.989dd54a.384x384o.216de4f40344.png"
  },
  {
    "id": "aronian",
    "name": "Aronian",
    "elo": 2830,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/0760a072-ac5a-11eb-9380-0de4effa151c.1bc042fd.384x384o.72d9d1274ef5.png"
  },
  {
    "id": "vidit",
    "name": "Vidit",
    "elo": 2730,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/9c496b92-b77b-11ec-bf19-27e5781aaa8e.29e5a69e.384x384o.beec644d68b2.png"
  },
  {
    "id": "paul-morphy",
    "name": "Paul Morphy",
    "elo": 2600,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/49d14a14-5979-11ee-896b-dbb3f6206aaf.b27199f4.384x384o.292feca66a5a.png"
  },
  {
    "id": "irina-krush",
    "name": "Irina Krush",
    "elo": 2502,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/c2623756-c38b-11ed-8f4e-19e61941f4de.860aa92b.384x384o.e81374922fe8.png"
  },
  {
    "id": "giri",
    "name": "Giri",
    "elo": 2800,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/3e6ba996-3431-11eb-a088-ddab1bbcca40.60f3a0f0.384x384o.c22a20850cb5.png"
  },
  {
    "id": "abdusattorov",
    "name": "Abdusattorov",
    "elo": 2660,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/05640e16-b77c-11ec-8c70-f91b566f6c4c.d4865268.384x384o.55b481ec8578.png"
  },
  {
    "id": "lasker",
    "name": "Lasker",
    "elo": 2640,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/454a118a-9611-11ef-85a4-95dfb5c8f3b9.01d0c144.384x384o.a1a86c6fdf8f.png"
  },
  {
    "id": "tal",
    "name": "Tal",
    "elo": 2705,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/81522f56-9610-11ef-9928-a9c88d28a627.e8e03a29.384x384o.63cb88c95f59.png"
  },
  {
    "id": "bok",
    "name": "Bok",
    "elo": 2650,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/8afd41b4-b77c-11ec-96aa-99912aecdc0b.ba41b58c.384x384o.bed5365ac22b.png"
  },
  {
    "id": "wesley-so",
    "name": "Wesley So",
    "elo": 2820,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/c17ae088-7aed-11eb-b11c-4d11067c3fa3.611bc62d.384x384o.c634878a3da7.png"
  },
  {
    "id": "hou-yifan",
    "name": "Hou Yifan",
    "elo": 2686,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/5aab83ac-c38a-11ed-ba99-e5a0220a73ba.081d0e09.384x384o.a19a9aebe907.png"
  },
  {
    "id": "capablanca",
    "name": "Capablanca",
    "elo": 2725,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/53454316-960e-11ef-a8a4-757e35099e18.f2555bf7.384x384o.48a38baa1da8.png"
  },
  {
    "id": "judit-polgar",
    "name": "Judit Polgar",
    "elo": 2735,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/4da02e68-c382-11ed-9b6f-85a9eb15cdf7.3c6b09c4.384x384o.5cdc406cd79b.png"
  },
  {
    "id": "magnus-carlsen",
    "name": "Magnus Carlsen",
    "elo": 2882,
    "group": "Top Players",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/fc773c3c-5ca3-11ee-960b-2fa00c967982.359ef560.384x384o.6ef729300821.png"
  },
  {
    "id": "danny",
    "name": "Danny",
    "elo": 2500,
    "group": "Personalities",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/f5c5d62c-8a5c-11ea-b5c1-f37a942bbe27.5fa49534.384x384o.391b0018feb6.png"
  },
  {
    "id": "agadmator",
    "name": "Agadmator",
    "elo": 2000,
    "group": "Personalities",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/045d0f20-7ae9-11eb-9818-0dac8e43c0a3.ad995446.384x384o.6f77ac475caa.png"
  },
  {
    "id": "robert",
    "name": "Robert",
    "elo": 2600,
    "group": "Personalities",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/22ad099e-8a5d-11ea-a85c-256e787fc406.336ae1a9.384x384o.f64397fd6dc7.png"
  },
  {
    "id": "maurice",
    "name": "Maurice",
    "elo": 2550,
    "group": "Personalities",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/cadc14ec-34d6-11eb-ba06-ad4819144716.84a6d945.384x384o.937cf8d8dedf.png"
  },
  {
    "id": "kevin",
    "name": "Kevin",
    "elo": 2300,
    "group": "Personalities",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/32d225de-8a5d-11ea-b2f3-1d52a01fbd67.20860e10.384x384o.86418afed679.png"
  },
  {
    "id": "ben-finegold",
    "name": "Ben Finegold",
    "elo": 2563,
    "group": "Personalities",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/d177558c-dd6b-11ee-ba53-cf4fa1094843.35aed41c.384x384o.da43d4677f1a.png"
  },
  {
    "id": "luison",
    "name": "Luison",
    "elo": 2250,
    "group": "Personalities",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/2dc388c6-8a5d-11ea-a822-3b5816493070.72bd3260.384x384o.0c43bd16e9bd.png"
  },
  {
    "id": "krikor",
    "name": "Krikor",
    "elo": 2550,
    "group": "Personalities",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/29a0e25c-8a5d-11ea-85d8-8d07de423cff.068946b3.384x384o.915693d3c869.png"
  },
  {
    "id": "funmastermike",
    "name": "FunMasterMike",
    "elo": 2300,
    "group": "Personalities",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/97d51ba6-7aeb-11eb-a078-9f74b5fc23ac.76479a3a.384x384o.96364faf8245.png"
  },
  {
    "id": "pandolfini",
    "name": "Pandolfini",
    "elo": 2250,
    "group": "Personalities",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/a24d226e-7ac7-11eb-bcc8-19f36a11b08f.307bc2cd.384x384o.bbe75fb4ca64.png"
  },
  {
    "id": "pia-cramling",
    "name": "Pia Cramling",
    "elo": 2550,
    "group": "Personalities",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/0ca11162-8bdf-11ef-a59c-d99f00d3e426.e2692a98.384x384o.9e17079b1c69.png"
  },
  {
    "id": "phiona",
    "name": "Phiona",
    "elo": 1700,
    "group": "Personalities",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/7e45b40e-ac58-11eb-983a-abae9c2276ff.f1c4a358.384x384o.51fc9a0f9ae0.png"
  },
  {
    "id": "dawid",
    "name": "Dawid",
    "elo": 2400,
    "group": "Personalities",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/22d0e032-ac5b-11eb-89d3-ef5894a62e4f.10130c96.384x384o.5fa0dff1664e.png"
  },
  {
    "id": "the-mechanical-turk",
    "name": "The Mechanical Turk",
    "elo": 2500,
    "group": "Personalities",
    "imageUrl": "https://images.chesscomfiles.com/uploads/v1/bot_personality/c2fef3ca-1885-11ef-8bd3-c1a790534937.3a1e2c89.384x384o.c52834e58f39.png"
  }
]