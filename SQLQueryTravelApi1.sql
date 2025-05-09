USE TravelApiDb;


INSERT INTO AspNetRoles (Id, Name, NormalizedName, ConcurrencyStamp)
VALUES
    (NEWID(), 'Admin', 'ADMIN', NEWID()),
	(NEWID(), 'User', 'USER', NEWID());

-- Dichiarazione ID Countries
DECLARE @IdGermany UNIQUEIDENTIFIER = NEWID();
DECLARE @IdItaly UNIQUEIDENTIFIER = NEWID();
DECLARE @IdFrance UNIQUEIDENTIFIER = NEWID();
DECLARE @IdUK UNIQUEIDENTIFIER = NEWID();
DECLARE @IdIreland UNIQUEIDENTIFIER = NEWID();
DECLARE @IdPortugal UNIQUEIDENTIFIER = NEWID();
DECLARE @IdSpain UNIQUEIDENTIFIER = NEWID();
DECLARE @IdSwitzerland UNIQUEIDENTIFIER = NEWID();
DECLARE @IdAustria UNIQUEIDENTIFIER = NEWID();
DECLARE @IdGreece UNIQUEIDENTIFIER = NEWID();
DECLARE @IdRussia UNIQUEIDENTIFIER = NEWID();
DECLARE @IdUSA UNIQUEIDENTIFIER = NEWID();
DECLARE @IdNetherlands UNIQUEIDENTIFIER = NEWID();
DECLARE @IdChina UNIQUEIDENTIFIER = NEWID();
DECLARE @IdJapan UNIQUEIDENTIFIER = NEWID();

-- Inserimento Countries con i tuoi link originali
INSERT INTO Countries (Id, Name, ImgUrl)
VALUES
    (@IdGermany, 'Germania', '/uploads/images/countriesImages/Germania2.jpg'),
    (@IdItaly, 'Italia', '/uploads/images/countriesImages/rome-italy-colosseum-amphitheater-sunrise-600nw-2120859782.webp'),
    (@IdFrance, 'Francia', '/uploads/images/countriesImages/c6.jpg'),
    (@IdUK, 'Inghilterra', '/uploads/images/countriesImages/Big-Ben-et-le-Parlement-britannique-a-Londres-vue-de-jour-avec-ciel-clair.jpeg'),
    (@IdIreland, 'Irlanda', '/uploads/images/countriesImages/rock-of-cashel-collina-hd.jpg'),
    (@IdPortugal, 'Portogallo', '/uploads/images/countriesImages/torre-di-belem.webp'),
    (@IdSpain, 'Spagna', '/uploads/images/countriesImages/la-sagrada-familia-gandi-1.webp'),
    (@IdSwitzerland, 'Svizzera', '/uploads/images/countriesImages/shutterstock_314150237.avif'),
    (@IdAustria, 'Austria', '/uploads/images/countriesImages/a1d7ad6be4.jpg'),
    (@IdGreece, 'Grecia', '/uploads/images/countriesImages/15-Grecia_Fotolia_218021187_Subscription_XL.jpg'),
    (@IdRussia, 'Russia', '/uploads/images/countriesImages/maxw-960.jpg'),
    (@IdUSA, 'USA', '/uploads/images/countriesImages/Statua-della-Liberta.png.webp'),
    (@IdNetherlands, 'Olanda', '/uploads/images/countriesImages/amsterdam_oude_kerk_norfan.jpg'),
    (@IdChina, 'Cina', '/uploads/images/countriesImages/csm_China__shanghai_yuyuan_garden__web-2048__4472e785b1.jpg'),
    (@IdJapan, 'Giappone', '/uploads/images/countriesImages/Byodo-in-di-Uji.webp');

 


-- Dichiarazione ID PropertyTypes
DECLARE @IdVilla UNIQUEIDENTIFIER = NEWID();
DECLARE @IdApartment UNIQUEIDENTIFIER = NEWID();
DECLARE @IdHotel UNIQUEIDENTIFIER = NEWID();

-- Inserimento PropertyTypes
INSERT INTO PropertyTypes (Id, Name)
VALUES 
    (@IdVilla, 'Villa'),
    (@IdApartment, 'Appartamento'),
    (@IdHotel, 'Hotel');

-- Dichiarazione ID ExperienceTypes
DECLARE @IdHistorical UNIQUEIDENTIFIER = NEWID();
DECLARE @IdWellness UNIQUEIDENTIFIER = NEWID();
DECLARE @IdAdventure UNIQUEIDENTIFIER = NEWID();
DECLARE @IdWater UNIQUEIDENTIFIER = NEWID();
DECLARE @IdFood UNIQUEIDENTIFIER = NEWID();
DECLARE @IdArtistic UNIQUEIDENTIFIER = NEWID();

-- Inserimento ExperienceTypes
INSERT INTO ExperienceTypes (Id, Name, Icon)
VALUES
    (@IdHistorical, 'Historical Cultural', 'fa-solid fa-landmark'),
    (@IdWellness, 'Relaxation Wellness', 'fa-solid fa-spa'),
    (@IdAdventure, 'Nature Adventure', 'fa-solid fa-tree'),
    (@IdWater, 'Sea Water Activities', 'fa-solid fa-water'),
    (@IdFood, 'Food Wine', 'fa-solid fa-wine-glass'),
    (@IdArtistic, 'Artistic Creative', 'fa-solid fa-palette');

-- ========================
-- DICHIARAZIONE ID CITTA'
-- ========================

-- Italia
DECLARE @IdRome UNIQUEIDENTIFIER = NEWID();
DECLARE @IdVenice UNIQUEIDENTIFIER = NEWID();
DECLARE @IdFlorence UNIQUEIDENTIFIER = NEWID();
DECLARE @IdNaples UNIQUEIDENTIFIER = NEWID();
DECLARE @IdVerona UNIQUEIDENTIFIER = NEWID();

-- Germania
DECLARE @IdBerlin UNIQUEIDENTIFIER = NEWID();
DECLARE @IdMunich UNIQUEIDENTIFIER = NEWID();
DECLARE @IdHamburg UNIQUEIDENTIFIER = NEWID();
DECLARE @IdCologne UNIQUEIDENTIFIER = NEWID();
DECLARE @IdFrankfurt UNIQUEIDENTIFIER = NEWID();

-- Cina
DECLARE @IdBeijing UNIQUEIDENTIFIER = NEWID();
DECLARE @IdShanghai UNIQUEIDENTIFIER = NEWID();
DECLARE @IdXian UNIQUEIDENTIFIER = NEWID();
DECLARE @IdChengdu UNIQUEIDENTIFIER = NEWID();
DECLARE @IdGuilin UNIQUEIDENTIFIER = NEWID();

-- Giappone
DECLARE @IdTokyo UNIQUEIDENTIFIER = NEWID();
DECLARE @IdKyoto UNIQUEIDENTIFIER = NEWID();
DECLARE @IdOsaka UNIQUEIDENTIFIER = NEWID();
DECLARE @IdHokkaido UNIQUEIDENTIFIER = NEWID();
DECLARE @IdFukuoka UNIQUEIDENTIFIER = NEWID();

-- Francia
DECLARE @IdParis UNIQUEIDENTIFIER = NEWID();
DECLARE @IdLyon UNIQUEIDENTIFIER = NEWID();
DECLARE @IdNice UNIQUEIDENTIFIER = NEWID();
DECLARE @IdMarseille UNIQUEIDENTIFIER = NEWID();
DECLARE @IdBordeaux UNIQUEIDENTIFIER = NEWID();

-- Spagna
DECLARE @IdBarcelona UNIQUEIDENTIFIER = NEWID();
DECLARE @IdMadrid UNIQUEIDENTIFIER = NEWID();
DECLARE @IdSeville UNIQUEIDENTIFIER = NEWID();
DECLARE @IdValencia UNIQUEIDENTIFIER = NEWID();
DECLARE @IdBilbao UNIQUEIDENTIFIER = NEWID();

-- Inghilterra
DECLARE @IdLondon UNIQUEIDENTIFIER = NEWID();
DECLARE @IdManchester UNIQUEIDENTIFIER = NEWID();
DECLARE @IdLiverpool UNIQUEIDENTIFIER = NEWID();
DECLARE @IdOxford UNIQUEIDENTIFIER = NEWID();
DECLARE @IdBath UNIQUEIDENTIFIER = NEWID();

-- ========================
-- INSERT CITIES
-- ========================

-- Italia
INSERT INTO Cities (Id, Name, Description, CountryId, ExperienceTypeId)
VALUES
(@IdRome, 'Roma', 'Conosciuta come la Città Eterna...', @IdItaly, @IdHistorical),
(@IdVenice, 'Venezia', 'Una città sospesa tra acqua e cielo...', @IdItaly, @IdArtistic),
(@IdFlorence, 'Firenze', 'Cuore del Rinascimento...', @IdItaly, @IdArtistic),
(@IdNaples, 'Napoli', 'Città vulcanica e passionale...', @IdItaly, @IdFood),
(@IdVerona, 'Verona', 'Famosa per la tragedia di Romeo e Giulietta...', @IdItaly, @IdHistorical);

-- Germania
INSERT INTO Cities (Id, Name, Description, CountryId, ExperienceTypeId)
VALUES
(@IdBerlin, 'Berlino', 'La capitale della Germania...', @IdGermany, @IdHistorical),
(@IdMunich, 'Monaco di Baviera', 'Monaco è una città elegante...', @IdGermany, @IdArtistic),
(@IdHamburg, 'Amburgo', 'Amburgo è una città portuale...', @IdGermany, @IdAdventure),
(@IdCologne, 'Colonia', 'Colonia è una delle città più antiche...', @IdGermany, @IdWater),
(@IdFrankfurt, 'Francoforte', 'Francoforte è il centro finanziario...', @IdGermany, @IdFood);

-- Cina
INSERT INTO Cities (Id, Name, Description, CountryId, ExperienceTypeId)
VALUES
(@IdBeijing, 'Pechino', 'Pechino è la capitale della Cina...', @IdChina, @IdHistorical),
(@IdShanghai, 'Shanghai', 'Shanghai è una metropoli moderna...', @IdChina, @IdArtistic),
(@IdXian, 'Xi''an', 'Xi''an è una delle città più antiche...', @IdChina, @IdHistorical),
(@IdChengdu, 'Chengdu', 'Chengdu è la città famosa per il panda...', @IdChina, @IdFood),
(@IdGuilin, 'Guilin', 'Guilin è famosa per i suoi paesaggi...', @IdChina, @IdAdventure);

-- Giappone
INSERT INTO Cities (Id, Name, Description, CountryId, ExperienceTypeId)
VALUES
(@IdTokyo, 'Tokyo', 'Tokyo è una città ultramoderna...', @IdJapan, @IdArtistic),
(@IdKyoto, 'Kyoto', 'Kyoto è famosa per i suoi templi antichi...', @IdJapan, @IdHistorical),
(@IdOsaka, 'Osaka', 'Osaka è una città vivace, famosa per la sua cucina...', @IdJapan, @IdFood),
(@IdHokkaido, 'Hokkaido', 'Hokkaido è la regione montuosa...', @IdJapan, @IdAdventure),
(@IdFukuoka, 'Fukuoka', 'Fukuoka è una città costiera famosa per i suoi festival...', @IdJapan, @IdWellness);

-- Francia
INSERT INTO Cities (Id, Name, Description, CountryId, ExperienceTypeId)
VALUES
(@IdParis, 'Parigi', 'Parigi è la capitale della Francia...', @IdFrance, @IdArtistic),
(@IdLyon, 'Lione', 'Lione è una città storica, famosa per la sua gastronomia...', @IdFrance, @IdFood),
(@IdNice, 'Nizza', 'Nizza è una città sul mare con spiagge incantevoli...', @IdFrance, @IdWellness),
(@IdMarseille, 'Marsiglia', 'Marsiglia è una città portuale vivace...', @IdFrance, @IdFood),
(@IdBordeaux, 'Bordeaux', 'Bordeaux è famosa per i suoi vigneti...', @IdFrance, @IdFood);

-- Spagna
INSERT INTO Cities (Id, Name, Description, CountryId, ExperienceTypeId)
VALUES
(@IdBarcelona, 'Barcellona', 'Barcellona è una città costiera...', @IdSpain, @IdArtistic),
(@IdMadrid, 'Madrid', 'Madrid è la capitale della Spagna...', @IdSpain, @IdHistorical),
(@IdSeville, 'Siviglia', 'Siviglia è una città ricca di storia...', @IdSpain, @IdHistorical),
(@IdValencia, 'Valencia', 'Valencia è una città sul mare...', @IdSpain, @IdFood),
(@IdBilbao, 'Bilbao', 'Bilbao è una città moderna...', @IdSpain, @IdArtistic);

-- Inghilterra
INSERT INTO Cities (Id, Name, Description, CountryId, ExperienceTypeId)
VALUES
(@IdLondon, 'Londra', 'Londra è la capitale dell''Inghilterra...', @IdUK, @IdArtistic),
(@IdManchester, 'Manchester', 'Manchester è una città industriale...', @IdUK, @IdAdventure),
(@IdLiverpool, 'Liverpool', 'Liverpool è famosa per la sua storia musicale...', @IdUK, @IdArtistic),
(@IdOxford, 'Oxford', 'Oxford è conosciuta per la sua antica università...', @IdUK, @IdHistorical),
(@IdBath, 'Bath', 'Bath è famosa per le sue terme romane...', @IdUK, @IdWellness);



-- ID ListingDescriptions Roma
DECLARE @IdListingDescriptionRome1 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionRome2 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionRome3 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionRome4 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionRome5 UNIQUEIDENTIFIER = NEWID();

-- ID ListingDescriptions Venezia
DECLARE @IdListingDescriptionVenice1 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionVenice2 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionVenice3 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionVenice4 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionVenice5 UNIQUEIDENTIFIER = NEWID();

-- ID ListingDescriptions Firenze
DECLARE @IdListingDescriptionFlorence1 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionFlorence2 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionFlorence3 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionFlorence4 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionFlorence5 UNIQUEIDENTIFIER = NEWID();


INSERT INTO ListingDescriptions (Id, Description, Beds, Capacity, PricePerNight, PropertyTypeId, CityId) VALUES
(@IdListingDescriptionRome1, 'Accogliente appartamento nel cuore di Roma, a pochi passi dal Colosseo.', 2, 4, 120.00, @IdApartment, @IdRome),
(@IdListingDescriptionRome2, 'Villa con giardino privato vicino al Vaticano, perfetta per famiglie.', 3, 6, 250.00, @IdVilla, @IdRome),
(@IdListingDescriptionRome3, 'Hotel 4 stelle elegante con vista su Piazza di Spagna.', 1, 2, 180.00, @IdHotel, @IdRome),
(@IdListingDescriptionRome4, 'Appartamento moderno e luminoso in Trastevere.', 2, 3, 130.00, @IdApartment, @IdRome),
(@IdListingDescriptionRome5, 'Suite esclusiva in un hotel boutique, vicino al Pantheon.', 1, 2, 200.00, @IdHotel, @IdRome);


INSERT INTO ListingDescriptions (Id, Description, Beds, Capacity, PricePerNight, PropertyTypeId, CityId) VALUES
(@IdListingDescriptionVenice1, 'Romantico appartamento con vista sul Canal Grande.', 1, 2, 160.00, @IdApartment, @IdVenice),
(@IdListingDescriptionVenice2, 'Hotel classico in stile veneziano, vicino a Piazza San Marco.', 1, 2, 190.00, @IdHotel, @IdVenice),
(@IdListingDescriptionVenice3, 'Villa storica con giardino e molo privato.', 4, 8, 320.00, @IdVilla, @IdVenice),
(@IdListingDescriptionVenice4, 'Appartamento elegante in una calle tranquilla.', 2, 4, 140.00, @IdApartment, @IdVenice),
(@IdListingDescriptionVenice5, 'Suite di lusso in hotel 5 stelle con vista sulla laguna.', 1, 2, 280.00, @IdHotel, @IdVenice);


INSERT INTO ListingDescriptions (Id, Description, Beds, Capacity, PricePerNight, PropertyTypeId, CityId) VALUES
(@IdListingDescriptionFlorence1, 'Appartamento artistico nel centro storico, a due passi dal Duomo.', 2, 4, 110.00, @IdApartment, @IdFlorence),
(@IdListingDescriptionFlorence2, 'Hotel moderno con terrazza panoramica su Firenze.', 1, 2, 170.00, @IdHotel, @IdFlorence),
(@IdListingDescriptionFlorence3, 'Villa toscana immersa nel verde, perfetta per vacanze rilassanti.', 5, 10, 400.00, @IdVilla, @IdFlorence),
(@IdListingDescriptionFlorence4, 'Appartamento romantico in Oltrarno, con arredi d’epoca.', 1, 2, 120.00, @IdApartment, @IdFlorence),
(@IdListingDescriptionFlorence5, 'Hotel storico ristrutturato, con spa e ristorante gourmet.', 2, 4, 220.00, @IdHotel, @IdFlorence);


-- ====================================
-- DICHIARAZIONE ID ListingDescriptions
-- ====================================

-- Berlin
DECLARE @IdListingDescriptionBerlin1 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionBerlin2 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionBerlin3 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionBerlin4 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionBerlin5 UNIQUEIDENTIFIER = NEWID();

-- Munich
DECLARE @IdListingDescriptionMunich1 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionMunich2 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionMunich3 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionMunich4 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionMunich5 UNIQUEIDENTIFIER = NEWID();

-- Shanghai
DECLARE @IdListingDescriptionShanghai1 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionShanghai2 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionShanghai3 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionShanghai4 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionShanghai5 UNIQUEIDENTIFIER = NEWID();

-- Xi'an
DECLARE @IdListingDescriptionXian1 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionXian2 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionXian3 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionXian4 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionXian5 UNIQUEIDENTIFIER = NEWID();

-- Tokyo
DECLARE @IdListingDescriptionTokyo1 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionTokyo2 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionTokyo3 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionTokyo4 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionTokyo5 UNIQUEIDENTIFIER = NEWID();

-- Kyoto
DECLARE @IdListingDescriptionKyoto1 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionKyoto2 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionKyoto3 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionKyoto4 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionKyoto5 UNIQUEIDENTIFIER = NEWID();

-- Paris
DECLARE @IdListingDescriptionParis1 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionParis2 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionParis3 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionParis4 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionParis5 UNIQUEIDENTIFIER = NEWID();

-- Barcelona
DECLARE @IdListingDescriptionBarcelona1 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionBarcelona2 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionBarcelona3 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionBarcelona4 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionBarcelona5 UNIQUEIDENTIFIER = NEWID();

-- Madrid
DECLARE @IdListingDescriptionMadrid1 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionMadrid2 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionMadrid3 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionMadrid4 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionMadrid5 UNIQUEIDENTIFIER = NEWID();

-- Valencia
DECLARE @IdListingDescriptionValencia1 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionValencia2 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionValencia3 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionValencia4 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionValencia5 UNIQUEIDENTIFIER = NEWID();

-- London
DECLARE @IdListingDescriptionLondon1 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionLondon2 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionLondon3 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionLondon4 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionLondon5 UNIQUEIDENTIFIER = NEWID();

-- Manchester
DECLARE @IdListingDescriptionManchester1 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionManchester2 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionManchester3 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionManchester4 UNIQUEIDENTIFIER = NEWID();
DECLARE @IdListingDescriptionManchester5 UNIQUEIDENTIFIER = NEWID();


-- ======================
-- INSERT ListingDescriptions
-- ======================

-- BERLIN
INSERT INTO ListingDescriptions (Id, Description, Beds, Capacity, PricePerNight, PropertyTypeId, CityId) VALUES
(@IdListingDescriptionBerlin1, 'Loft moderno nel quartiere di Kreuzberg, ideale per coppie.', 1, 2, 110, @IdApartment, @IdBerlin),
(@IdListingDescriptionBerlin2, 'Hotel design vicino all''Isola dei Musei, perfetto per soggiorni culturali.', 1, 2, 160, @IdHotel, @IdBerlin),
(@IdListingDescriptionBerlin3, 'Appartamento spazioso a Mitte, comodo e centrale.', 2, 4, 130, @IdApartment, @IdBerlin),
(@IdListingDescriptionBerlin4, 'Villa privata nei pressi del lago Wannsee, immersa nel verde.', 3, 6, 280, @IdVilla, @IdBerlin),
(@IdListingDescriptionBerlin5, 'Hotel a 4 stelle con spa e rooftop bar.', 1, 2, 190, @IdHotel, @IdBerlin);

-- MUNICH
INSERT INTO ListingDescriptions (Id, Description, Beds, Capacity, PricePerNight, PropertyTypeId, CityId) VALUES
(@IdListingDescriptionMunich1, 'Accogliente appartamento vicino al Giardino Inglese.', 2, 3, 140, @IdApartment, @IdMunich),
(@IdListingDescriptionMunich2, 'Villa lussuosa in periferia con ampio giardino e sauna.', 4, 8, 350, @IdVilla, @IdMunich),
(@IdListingDescriptionMunich3, 'Hotel elegante in centro città, ottimo per viaggi d’affari.', 1, 2, 210, @IdHotel, @IdMunich),
(@IdListingDescriptionMunich4, 'Mini appartamento smart tech, perfetto per giovani viaggiatori.', 1, 2, 100, @IdApartment, @IdMunich),
(@IdListingDescriptionMunich5, 'Boutique hotel storico, atmosfera bavarese autentica.', 2, 4, 170, @IdHotel, @IdMunich);

-- SHANGHAI
INSERT INTO ListingDescriptions (Id, Description, Beds, Capacity, PricePerNight, PropertyTypeId, CityId) VALUES
(@IdListingDescriptionShanghai1, 'Appartamento high-tech con vista skyline Pudong.', 1, 2, 150, @IdApartment, @IdShanghai),
(@IdListingDescriptionShanghai2, 'Hotel di lusso sulla Nanjing Road con piscina panoramica.', 2, 4, 300, @IdHotel, @IdShanghai),
(@IdListingDescriptionShanghai3, 'Loft artistico in ex zona industriale creativa.', 2, 4, 180, @IdApartment, @IdShanghai),
(@IdListingDescriptionShanghai4, 'Villa esclusiva in quartiere internazionale, con giardino zen.', 3, 6, 400, @IdVilla, @IdShanghai),
(@IdListingDescriptionShanghai5, 'Hotel business a due passi dal Bund.', 1, 2, 160, @IdHotel, @IdShanghai);

-- XIAN
INSERT INTO ListingDescriptions (Id, Description, Beds, Capacity, PricePerNight, PropertyTypeId, CityId) VALUES
(@IdListingDescriptionXian1, 'Appartamento tradizionale in stile cinese nel centro storico.', 2, 4, 120, @IdApartment, @IdXian),
(@IdListingDescriptionXian2, 'Hotel vicino ai Guerrieri di Terracotta, ideale per escursioni.', 1, 2, 140, @IdHotel, @IdXian),
(@IdListingDescriptionXian3, 'Villa spaziosa con giardino e cucina locale inclusa.', 4, 8, 270, @IdVilla, @IdXian),
(@IdListingDescriptionXian4, 'Appartamento moderno vicino alle mura antiche.', 1, 2, 100, @IdApartment, @IdXian),
(@IdListingDescriptionXian5, 'Hotel boutique con spa e ristorante tradizionale.', 2, 3, 160, @IdHotel, @IdXian);

-- TOKYO
INSERT INTO ListingDescriptions (Id, Description, Beds, Capacity, PricePerNight, PropertyTypeId, CityId) VALUES
(@IdListingDescriptionTokyo1, 'Mini appartamento in Shibuya con design moderno.', 1, 2, 130, @IdApartment, @IdTokyo),
(@IdListingDescriptionTokyo2, 'Hotel futuristico a Shinjuku con capsule room.', 1, 1, 90, @IdHotel, @IdTokyo),
(@IdListingDescriptionTokyo3, 'Villa di lusso con giardino giapponese e onsen privato.', 3, 6, 450, @IdVilla, @IdTokyo),
(@IdListingDescriptionTokyo4, 'Appartamento panoramico con vista su Tokyo Tower.', 2, 4, 200, @IdApartment, @IdTokyo),
(@IdListingDescriptionTokyo5, 'Hotel elegante nel quartiere di Ginza.', 1, 2, 220, @IdHotel, @IdTokyo);

-- KYOTO
INSERT INTO ListingDescriptions (Id, Description, Beds, Capacity, PricePerNight, PropertyTypeId, CityId) VALUES
(@IdListingDescriptionKyoto1, 'Ryokan tradizionale con tatami e cena kaiseki inclusa.', 2, 4, 250, @IdVilla, @IdKyoto),
(@IdListingDescriptionKyoto2, 'Hotel classico vicino al Tempio d''Oro.', 1, 2, 180, @IdHotel, @IdKyoto),
(@IdListingDescriptionKyoto3, 'Appartamento centrale, ideale per esplorare i templi.', 2, 3, 120, @IdApartment, @IdKyoto),
(@IdListingDescriptionKyoto4, 'Villa giapponese con giardino zen e vista sul fiume.', 3, 6, 300, @IdVilla, @IdKyoto),
(@IdListingDescriptionKyoto5, 'Hotel boutique in Gion, vicino alle geishe.', 1, 2, 160, @IdHotel, @IdKyoto);

-- PARIS
INSERT INTO ListingDescriptions (Id, Description, Beds, Capacity, PricePerNight, PropertyTypeId, CityId) VALUES
(@IdListingDescriptionParis1, 'Appartamento romantico nel Marais, con balcone su Parigi.', 1, 2, 150, @IdApartment, @IdParis),
(@IdListingDescriptionParis2, 'Hotel 5 stelle vicino alla Torre Eiffel.', 1, 2, 300, @IdHotel, @IdParis),
(@IdListingDescriptionParis3, 'Attico elegante con vista su Montmartre.', 2, 4, 220, @IdApartment, @IdParis),
(@IdListingDescriptionParis4, 'Villa con giardino segreto in zona Saint-Germain.', 3, 5, 400, @IdVilla, @IdParis),
(@IdListingDescriptionParis5, 'Hotel boutique vicino al Louvre.', 1, 2, 180, @IdHotel, @IdParis);

-- BARCELONA
INSERT INTO ListingDescriptions (Id, Description, Beds, Capacity, PricePerNight, PropertyTypeId, CityId) VALUES
(@IdListingDescriptionBarcelona1, 'Appartamento colorato vicino alla Sagrada Familia, ideale per famiglie.', 2, 4, 140, @IdApartment, @IdBarcelona),
(@IdListingDescriptionBarcelona2, 'Hotel boutique con terrazza e vista mare a Barceloneta.', 1, 2, 180, @IdHotel, @IdBarcelona),
(@IdListingDescriptionBarcelona3, 'Loft di design nel quartiere El Born, perfetto per giovani.', 1, 2, 120, @IdApartment, @IdBarcelona),
(@IdListingDescriptionBarcelona4, 'Villa privata con piscina, ideale per vacanze di gruppo.', 4, 8, 350, @IdVilla, @IdBarcelona),
(@IdListingDescriptionBarcelona5, 'Hotel in stile modernista vicino a Passeig de Gracia.', 2, 4, 200, @IdHotel, @IdBarcelona);

-- MADRID
INSERT INTO ListingDescriptions (Id, Description, Beds, Capacity, PricePerNight, PropertyTypeId, CityId) VALUES
(@IdListingDescriptionMadrid1, 'Appartamento elegante nel quartiere Salamanca.', 2, 4, 130, @IdApartment, @IdMadrid),
(@IdListingDescriptionMadrid2, 'Hotel centrale vicino al Prado, ottimo per turisti.', 1, 2, 160, @IdHotel, @IdMadrid),
(@IdListingDescriptionMadrid3, 'Villa urbana con giardino e area barbecue.', 3, 6, 280, @IdVilla, @IdMadrid),
(@IdListingDescriptionMadrid4, 'Loft con cucina moderna e arredi minimalisti.', 1, 2, 110, @IdApartment, @IdMadrid),
(@IdListingDescriptionMadrid5, 'Hotel con rooftop bar e vista su Gran Vía.', 1, 2, 190, @IdHotel, @IdMadrid);

-- VALENCIA
INSERT INTO ListingDescriptions (Id, Description, Beds, Capacity, PricePerNight, PropertyTypeId, CityId) VALUES
(@IdListingDescriptionValencia1, 'Appartamento luminoso vicino alla Città delle Arti e delle Scienze.', 2, 4, 120, @IdApartment, @IdValencia),
(@IdListingDescriptionValencia2, 'Hotel vicino alla spiaggia di Malvarrosa, perfetto per l’estate.', 1, 2, 140, @IdHotel, @IdValencia),
(@IdListingDescriptionValencia3, 'Villa con patio e piscina, ideale per famiglie numerose.', 4, 9, 320, @IdVilla, @IdValencia),
(@IdListingDescriptionValencia4, 'Loft moderno con cucina attrezzata in centro.', 1, 2, 100, @IdApartment, @IdValencia),
(@IdListingDescriptionValencia5, 'Hotel moderno con centro benessere e palestra.', 2, 4, 160, @IdHotel, @IdValencia);

-- LONDON
INSERT INTO ListingDescriptions (Id, Description, Beds, Capacity, PricePerNight, PropertyTypeId, CityId) VALUES
(@IdListingDescriptionLondon1, 'Appartamento di lusso a Chelsea con vista sul Tamigi.', 2, 4, 220, @IdApartment, @IdLondon),
(@IdListingDescriptionLondon2, 'Hotel iconico nel centro di Londra, vicino a Trafalgar Square.', 1, 2, 250, @IdHotel, @IdLondon),
(@IdListingDescriptionLondon3, 'Villa vittoriana con giardino e 3 camere da letto.', 3, 6, 370, @IdVilla, @IdLondon),
(@IdListingDescriptionLondon4, 'Studio moderno in zona Camden, ideale per una coppia.', 1, 2, 130, @IdApartment, @IdLondon),
(@IdListingDescriptionLondon5, 'Hotel 4 stelle con colazione inclusa e lounge bar.', 2, 3, 180, @IdHotel, @IdLondon);

-- MANCHESTER
INSERT INTO ListingDescriptions (Id, Description, Beds, Capacity, PricePerNight, PropertyTypeId, CityId) VALUES
(@IdListingDescriptionManchester1, 'Appartamento industrial-style vicino al Northern Quarter.', 2, 4, 110, @IdApartment, @IdManchester),
(@IdListingDescriptionManchester2, 'Hotel vicino all''Etihad Stadium, perfetto per tifosi.', 1, 2, 140, @IdHotel, @IdManchester),
(@IdListingDescriptionManchester3, 'Villa spaziosa in periferia, ottima per famiglie numerose.', 4, 8, 290, @IdVilla, @IdManchester),
(@IdListingDescriptionManchester4, 'Loft moderno con cucina e soggiorno open space.', 2, 4, 120, @IdApartment, @IdManchester),
(@IdListingDescriptionManchester5, 'Hotel boutique con ristorante e camere eleganti.', 1, 2, 160, @IdHotel, @IdManchester);


-- Roma
INSERT INTO Listings (Id, HotelName, DescriptionId, ImgUrls) VALUES
(NEWID(), 'Appartamento Colosseo', @IdListingDescriptionRome1, '["/uploads/images/listingsImages/foto1.jpeg","/uploads/images/listingsImages/foto2.jpeg","/uploads/images/listingsImages/foto3.jpeg"]'),
(NEWID(), 'Villa Vaticano', @IdListingDescriptionRome2, '["/uploads/images/listingsImages/foto4.jpeg","/uploads/images/listingsImages/foto5.jpeg","/uploads/images/listingsImages/foto6.jpeg"]'),
(NEWID(), 'Hotel Piazza di Spagna', @IdListingDescriptionRome3, '["/uploads/images/listingsImages/foto7.jpeg","/uploads/images/listingsImages/foto8.jpeg","/uploads/images/listingsImages/foto9.jpeg"]'),
(NEWID(), 'Appartamento Trastevere', @IdListingDescriptionRome4, '["/uploads/images/listingsImages/foto10.jpeg","/uploads/images/listingsImages/foto11.jpeg","/uploads/images/listingsImages/foto12.jpeg"]'),
(NEWID(), 'Suite Pantheon', @IdListingDescriptionRome5, '["/uploads/images/listingsImages/foto13.jpeg","/uploads/images/listingsImages/foto14.jpeg","/uploads/images/listingsImages/foto15.jpeg"]');

INSERT INTO Listings (Id, HotelName, DescriptionId, ImgUrls) VALUES
(NEWID(), 'Appartamento Canal Grande', @IdListingDescriptionVenice1, '["/uploads/images/listingsImages/foto16.jpeg","/uploads/images/listingsImages/foto17.jpeg","/uploads/images/listingsImages/foto18.jpeg"]'),
(NEWID(), 'Hotel San Marco', @IdListingDescriptionVenice2, '["/uploads/images/listingsImages/foto19.jpeg","/uploads/images/listingsImages/foto20.jpeg","/uploads/images/listingsImages/foto21.jpeg"]'),
(NEWID(), 'Villa Molo', @IdListingDescriptionVenice3, '["/uploads/images/listingsImages/foto22.jpeg","/uploads/images/listingsImages/foto23.jpeg","/uploads/images/listingsImages/foto24.jpeg"]'),
(NEWID(), 'Appartamento Calle', @IdListingDescriptionVenice4, '["/uploads/images/listingsImages/foto25.jpeg","/uploads/images/listingsImages/foto26.jpeg","/uploads/images/listingsImages/foto27.jpeg"]'),
(NEWID(), 'Suite Laguna', @IdListingDescriptionVenice5, '["/uploads/images/listingsImages/foto28.jpeg","/uploads/images/listingsImages/foto29.jpeg","/uploads/images/listingsImages/foto30.jpeg"]');

INSERT INTO Listings (Id, HotelName, DescriptionId, ImgUrls) VALUES
(NEWID(), 'Appartamento Duomo', @IdListingDescriptionFlorence1, '["/uploads/images/listingsImages/foto31.jpeg","/uploads/images/listingsImages/foto1.jpeg","/uploads/images/listingsImages/foto2.jpeg"]'),
(NEWID(), 'Hotel Panorama', @IdListingDescriptionFlorence2, '["/uploads/images/listingsImages/foto3.jpeg","/uploads/images/listingsImages/foto4.jpeg","/uploads/images/listingsImages/foto5.jpeg"]'),
(NEWID(), 'Villa Toscana', @IdListingDescriptionFlorence3, '["/uploads/images/listingsImages/foto6.jpeg","/uploads/images/listingsImages/foto7.jpeg","/uploads/images/listingsImages/foto8.jpeg"]'),
(NEWID(), 'Appartamento Oltrarno', @IdListingDescriptionFlorence4, '["/uploads/images/listingsImages/foto9.jpeg","/uploads/images/listingsImages/foto10.jpeg","/uploads/images/listingsImages/foto11.jpeg"]'),
(NEWID(), 'Hotel Ristorante', @IdListingDescriptionFlorence5, '["/uploads/images/listingsImages/foto12.jpeg","/uploads/images/listingsImages/foto13.jpeg","/uploads/images/listingsImages/foto14.jpeg"]');

-- Berlin
INSERT INTO Listings (Id, HotelName, DescriptionId, ImgUrls) VALUES
(NEWID(), 'Loft Kreuzberg', @IdListingDescriptionBerlin1, '["/uploads/images/listingsImages/foto16.jpeg","/uploads/images/listingsImages/foto17.jpeg","/uploads/images/listingsImages/foto18.jpeg"]'),
(NEWID(), 'Hotel Musei', @IdListingDescriptionBerlin2, '["/uploads/images/listingsImages/foto19.jpeg","/uploads/images/listingsImages/foto20.jpeg","/uploads/images/listingsImages/foto21.jpeg"]'),
(NEWID(), 'Appartamento Mitte', @IdListingDescriptionBerlin3, '["/uploads/images/listingsImages/foto22.jpeg","/uploads/images/listingsImages/foto23.jpeg","/uploads/images/listingsImages/foto24.jpeg"]'),
(NEWID(), 'Villa Wannsee', @IdListingDescriptionBerlin4, '["/uploads/images/listingsImages/foto25.jpeg","/uploads/images/listingsImages/foto26.jpeg","/uploads/images/listingsImages/foto27.jpeg"]'),
(NEWID(), 'Hotel Spa', @IdListingDescriptionBerlin5, '["/uploads/images/listingsImages/foto28.jpeg","/uploads/images/listingsImages/foto29.jpeg","/uploads/images/listingsImages/foto30.jpeg"]');
-- Munich
INSERT INTO Listings (Id, HotelName, DescriptionId, ImgUrls) VALUES
(NEWID(), 'Appartamento Giardino', @IdListingDescriptionMunich1, '["/uploads/images/listingsImages/foto31.jpeg","/uploads/images/listingsImages/foto1.jpeg","/uploads/images/listingsImages/foto2.jpeg"]'),
(NEWID(), 'Villa Bavarese', @IdListingDescriptionMunich2, '["/uploads/images/listingsImages/foto3.jpeg","/uploads/images/listingsImages/foto4.jpeg","/uploads/images/listingsImages/foto5.jpeg"]'),
(NEWID(), 'Hotel Business', @IdListingDescriptionMunich3, '["/uploads/images/listingsImages/foto6.jpeg","/uploads/images/listingsImages/foto7.jpeg","/uploads/images/listingsImages/foto8.jpeg"]'),
(NEWID(), 'Mini Appartamento', @IdListingDescriptionMunich4, '["/uploads/images/listingsImages/foto9.jpeg","/uploads/images/listingsImages/foto10.jpeg","/uploads/images/listingsImages/foto11.jpeg"]'),
(NEWID(), 'Boutique Hotel', @IdListingDescriptionMunich5, '["/uploads/images/listingsImages/foto12.jpeg","/uploads/images/listingsImages/foto13.jpeg","/uploads/images/listingsImages/foto14.jpeg"]');
-- Shanghai
INSERT INTO Listings (Id, HotelName, DescriptionId, ImgUrls) VALUES
(NEWID(), 'Appartamento Pudong', @IdListingDescriptionShanghai1, '["/uploads/images/listingsImages/foto15.jpeg","/uploads/images/listingsImages/foto17.jpeg","/uploads/images/listingsImages/foto18.jpeg"]'),
(NEWID(), 'Hotel Nanjing', @IdListingDescriptionShanghai2, '["/uploads/images/listingsImages/foto19.jpeg","/uploads/images/listingsImages/foto20.jpeg","/uploads/images/listingsImages/foto21.jpeg"]'),
(NEWID(), 'Loft Creativo', @IdListingDescriptionShanghai3, '["/uploads/images/listingsImages/foto22.jpeg","/uploads/images/listingsImages/foto23.jpeg","/uploads/images/listingsImages/foto24.jpeg"]'),
(NEWID(), 'Villa Internazionale', @IdListingDescriptionShanghai4, '["/uploads/images/listingsImages/foto25.jpeg","/uploads/images/listingsImages/foto26.jpeg","/uploads/images/listingsImages/foto27.jpeg"]'),
(NEWID(), 'Hotel Bund', @IdListingDescriptionShanghai5, '["/uploads/images/listingsImages/foto28.jpeg","/uploads/images/listingsImages/foto29.jpeg","/uploads/images/listingsImages/foto30.jpeg"]');

-- Xi'an
INSERT INTO Listings (Id, HotelName, DescriptionId, ImgUrls) VALUES
(NEWID(), 'Appartamento Storico', @IdListingDescriptionXian1, '["/uploads/images/listingsImages/foto31.jpeg","/uploads/images/listingsImages/foto1.jpeg","/uploads/images/listingsImages/foto2.jpeg"]'),
(NEWID(), 'Hotel Terracotta', @IdListingDescriptionXian2, '["/uploads/images/listingsImages/foto3.jpeg","/uploads/images/listingsImages/foto4.jpeg","/uploads/images/listingsImages/foto5.jpeg"]'),
(NEWID(), 'Villa Giardino', @IdListingDescriptionXian3, '["/uploads/images/listingsImages/foto6.jpeg","/uploads/images/listingsImages/foto7.jpeg","/uploads/images/listingsImages/foto8.jpeg"]'),
(NEWID(), 'Appartamento Mura', @IdListingDescriptionXian4, '["/uploads/images/listingsImages/foto9.jpeg","/uploads/images/listingsImages/foto10.jpeg","/uploads/images/listingsImages/foto11.jpeg"]'),
(NEWID(), 'Hotel Boutique', @IdListingDescriptionXian5, '["/uploads/images/listingsImages/foto12.jpeg","/uploads/images/listingsImages/foto13.jpeg","/uploads/images/listingsImages/foto14.jpeg"]');

-- Tokyo
INSERT INTO Listings (Id, HotelName, DescriptionId, ImgUrls) VALUES
(NEWID(), 'Appartamento Shibuya', @IdListingDescriptionTokyo1, '["/uploads/images/listingsImages/foto15.jpeg","/uploads/images/listingsImages/foto16.jpeg","/uploads/images/listingsImages/foto17.jpeg"]'),
(NEWID(), 'Hotel Roppongi', @IdListingDescriptionTokyo2, '["/uploads/images/listingsImages/foto18.jpeg","/uploads/images/listingsImages/foto19.jpeg","/uploads/images/listingsImages/foto20.jpeg"]'),
(NEWID(), 'Villa Ginza', @IdListingDescriptionTokyo3, '["/uploads/images/listingsImages/foto21.jpeg","/uploads/images/listingsImages/foto22.jpeg","/uploads/images/listingsImages/foto23.jpeg"]'),
(NEWID(), 'Appartamento Tokyo Bay', @IdListingDescriptionTokyo4, '["/uploads/images/listingsImages/foto24.jpeg","/uploads/images/listingsImages/foto25.jpeg","/uploads/images/listingsImages/foto26.jpeg"]'),
(NEWID(), 'Hotel Harajuku', @IdListingDescriptionTokyo5, '["/uploads/images/listingsImages/foto27.jpeg","/uploads/images/listingsImages/foto28.jpeg","/uploads/images/listingsImages/foto29.jpeg"]');

-- Kyoto
INSERT INTO Listings (Id, HotelName, DescriptionId, ImgUrls) VALUES
(NEWID(), 'Appartamento Gion', @IdListingDescriptionKyoto1, '["/uploads/images/listingsImages/foto30.jpeg","/uploads/images/listingsImages/foto31.jpeg","/uploads/images/listingsImages/foto1.jpeg"]'),
(NEWID(), 'Hotel Kiyomizu', @IdListingDescriptionKyoto2, '["/uploads/images/listingsImages/foto2.jpeg","/uploads/images/listingsImages/foto3.jpeg","/uploads/images/listingsImages/foto4.jpeg"]'),
(NEWID(), 'Villa Zen', @IdListingDescriptionKyoto3, '["/uploads/images/listingsImages/foto5.jpeg","/uploads/images/listingsImages/foto6.jpeg","/uploads/images/listingsImages/foto7.jpeg"]'),
(NEWID(), 'Appartamento Arashiyama', @IdListingDescriptionKyoto4, '["/uploads/images/listingsImages/foto8.jpeg","/uploads/images/listingsImages/foto9.jpeg","/uploads/images/listingsImages/foto10.jpeg"]'),
(NEWID(), 'Hotel Nijo', @IdListingDescriptionKyoto5, '["/uploads/images/listingsImages/foto11.jpeg","/uploads/images/listingsImages/foto12.jpeg","/uploads/images/listingsImages/foto13.jpeg"]');

-- Paris
INSERT INTO Listings (Id, HotelName, DescriptionId, ImgUrls) VALUES
(NEWID(), 'Appartamento Montmartre', @IdListingDescriptionParis1, '["/uploads/images/listingsImages/foto14.jpeg","/uploads/images/listingsImages/foto15.jpeg","/uploads/images/listingsImages/foto16.jpeg"]'),
(NEWID(), 'Hotel Louvre', @IdListingDescriptionParis2, '["/uploads/images/listingsImages/foto17.jpeg","/uploads/images/listingsImages/foto18.jpeg","/uploads/images/listingsImages/foto19.jpeg"]'),
(NEWID(), 'Villa de la Seine', @IdListingDescriptionParis3, '["/uploads/images/listingsImages/foto20.jpeg","/uploads/images/listingsImages/foto21.jpeg","/uploads/images/listingsImages/foto22.jpeg"]'),
(NEWID(), 'Appartamento Champs-Élysées', @IdListingDescriptionParis4, '["/uploads/images/listingsImages/foto23.jpeg","/uploads/images/listingsImages/foto24.jpeg","/uploads/images/listingsImages/foto25.jpeg"]'),
(NEWID(), 'Hotel Saint-Germain', @IdListingDescriptionParis5, '["/uploads/images/listingsImages/foto26.jpeg","/uploads/images/listingsImages/foto27.jpeg","/uploads/images/listingsImages/foto28.jpeg"]');

-- Barcelona
INSERT INTO Listings (Id, HotelName, DescriptionId, ImgUrls) VALUES
(NEWID(), 'Appartamento Gothic', @IdListingDescriptionBarcelona1, '["/uploads/images/listingsImages/foto29.jpeg","/uploads/images/listingsImages/foto30.jpeg","/uploads/images/listingsImages/foto31.jpeg"]'),
(NEWID(), 'Hotel Eixample', @IdListingDescriptionBarcelona2, '["/uploads/images/listingsImages/foto1.jpeg","/uploads/images/listingsImages/foto2.jpeg","/uploads/images/listingsImages/foto3.jpeg"]'),
(NEWID(), 'Villa Miró', @IdListingDescriptionBarcelona3, '["/uploads/images/listingsImages/foto4.jpeg","/uploads/images/listingsImages/foto5.jpeg","/uploads/images/listingsImages/foto6.jpeg"]'),
(NEWID(), 'Appartamento La Rambla', @IdListingDescriptionBarcelona4, '["/uploads/images/listingsImages/foto7.jpeg","/uploads/images/listingsImages/foto8.jpeg","/uploads/images/listingsImages/foto9.jpeg"]'),
(NEWID(), 'Hotel Montjuïc', @IdListingDescriptionBarcelona5, '["/uploads/images/listingsImages/foto10.jpeg","/uploads/images/listingsImages/foto11.jpeg","/uploads/images/listingsImages/foto12.jpeg"]');

-- Madrid
INSERT INTO Listings (Id, HotelName, DescriptionId, ImgUrls) VALUES
(NEWID(), 'Appartamento Sol', @IdListingDescriptionMadrid1, '["/uploads/images/listingsImages/foto13.jpeg","/uploads/images/listingsImages/foto14.jpeg","/uploads/images/listingsImages/foto15.jpeg"]'),
(NEWID(), 'Hotel Gran Via', @IdListingDescriptionMadrid2, '["/uploads/images/listingsImages/foto16.jpeg","/uploads/images/listingsImages/foto17.jpeg","/uploads/images/listingsImages/foto18.jpeg"]'),
(NEWID(), 'Villa Prado', @IdListingDescriptionMadrid3, '["/uploads/images/listingsImages/foto19.jpeg","/uploads/images/listingsImages/foto20.jpeg","/uploads/images/listingsImages/foto21.jpeg"]'),
(NEWID(), 'Appartamento Retiro', @IdListingDescriptionMadrid4, '["/uploads/images/listingsImages/foto22.jpeg","/uploads/images/listingsImages/foto23.jpeg","/uploads/images/listingsImages/foto24.jpeg"]'),
(NEWID(), 'Hotel Palace', @IdListingDescriptionMadrid5, '["/uploads/images/listingsImages/foto25.jpeg","/uploads/images/listingsImages/foto26.jpeg","/uploads/images/listingsImages/foto27.jpeg"]');

-- Valencia
INSERT INTO Listings (Id, HotelName, DescriptionId, ImgUrls) VALUES
(NEWID(), 'Appartamento Ciudad', @IdListingDescriptionValencia1, '["/uploads/images/listingsImages/foto28.jpeg","/uploads/images/listingsImages/foto29.jpeg","/uploads/images/listingsImages/foto30.jpeg"]'),
(NEWID(), 'Hotel Playa', @IdListingDescriptionValencia2, '["/uploads/images/listingsImages/foto31.jpeg","/uploads/images/listingsImages/foto1.jpeg","/uploads/images/listingsImages/foto2.jpeg"]'),
(NEWID(), 'Villa Mar', @IdListingDescriptionValencia3, '["/uploads/images/listingsImages/foto3.jpeg","/uploads/images/listingsImages/foto4.jpeg","/uploads/images/listingsImages/foto5.jpeg"]'),
(NEWID(), 'Appartamento Oceanografico', @IdListingDescriptionValencia4, '["/uploads/images/listingsImages/foto6.jpeg","/uploads/images/listingsImages/foto7.jpeg","/uploads/images/listingsImages/foto8.jpeg"]'),
(NEWID(), 'Hotel El Carmen', @IdListingDescriptionValencia5, '["/uploads/images/listingsImages/foto9.jpeg","/uploads/images/listingsImages/foto10.jpeg","/uploads/images/listingsImages/foto11.jpeg"]');

-- London
INSERT INTO Listings (Id, HotelName, DescriptionId, ImgUrls) VALUES
(NEWID(), 'Appartamento Covent Garden', @IdListingDescriptionLondon1, '["/uploads/images/listingsImages/foto12.jpeg","/uploads/images/listingsImages/foto13.jpeg","/uploads/images/listingsImages/foto14.jpeg"]'),
(NEWID(), 'Hotel Westminster', @IdListingDescriptionLondon2, '["/uploads/images/listingsImages/foto15.jpeg","/uploads/images/listingsImages/foto16.jpeg","/uploads/images/listingsImages/foto17.jpeg"]'),
(NEWID(), 'Villa Hyde Park', @IdListingDescriptionLondon3, '["/uploads/images/listingsImages/foto18.jpeg","/uploads/images/listingsImages/foto19.jpeg","/uploads/images/listingsImages/foto20.jpeg"]'),
(NEWID(), 'Appartamento Soho', @IdListingDescriptionLondon4, '["/uploads/images/listingsImages/foto21.jpeg","/uploads/images/listingsImages/foto22.jpeg","/uploads/images/listingsImages/foto23.jpeg"]'),
(NEWID(), 'Hotel Kensington', @IdListingDescriptionLondon5, '["/uploads/images/listingsImages/foto24.jpeg","/uploads/images/listingsImages/foto25.jpeg","/uploads/images/listingsImages/foto26.jpeg"]');

-- Manchester
INSERT INTO Listings (Id, HotelName, DescriptionId, ImgUrls) VALUES
(NEWID(), 'Appartamento Northern Quarter', @IdListingDescriptionManchester1, '["/uploads/images/listingsImages/foto27.jpeg","/uploads/images/listingsImages/foto28.jpeg","/uploads/images/listingsImages/foto29.jpeg"]'),
(NEWID(), 'Hotel Manchester City', @IdListingDescriptionManchester2, '["/uploads/images/listingsImages/foto30.jpeg","/uploads/images/listingsImages/foto31.jpeg","/uploads/images/listingsImages/foto1.jpeg"]'),
(NEWID(), 'Villa Media City', @IdListingDescriptionManchester3, '["/uploads/images/listingsImages/foto2.jpeg","/uploads/images/listingsImages/foto3.jpeg","/uploads/images/listingsImages/foto4.jpeg"]'),
(NEWID(), 'Appartamento Castlefield', @IdListingDescriptionManchester4, '["/uploads/images/listingsImages/foto5.jpeg","/uploads/images/listingsImages/foto6.jpeg","/uploads/images/listingsImages/foto7.jpeg"]'),
(NEWID(), 'Hotel Spinningfields', @IdListingDescriptionManchester5, '["/uploads/images/listingsImages/foto8.jpeg","/uploads/images/listingsImages/foto9.jpeg","/uploads/images/listingsImages/foto10.jpeg"]');















