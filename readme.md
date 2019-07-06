
# Übung 6 — Europäische Hauptstädte

In dieser sechsten Übung geht es darum alle Hauptstädte Euopas auf einer Karte zu zeigen und eine Story mit diesen Daten zu erzählen.

### Start

Installiere zunächst alle node modules mit `npm install`.

```bash
npm install
```

Nachdem alles installiert ist kannst du den Server mit `npm start` starten.

```bash
npm start
```

Die visualisierung wird auf [http://localhost:1234/](http://localhost:1234/) zugänglich sein.

> ⚠️ Du musst die visualisierung via localhost aufrufen. Da die daten für die Visualisierung asynchron geladen werden ist der Server notwendig. Die visualisierung wird nicht funktionieren wenn du auf das index.html doppelklickst.

### Zu den Daten

Die Daten für diese Aufgabe stammen von:

* [NaturalEarthData](https://www.naturalearthdata.com/downloads/) - 1:110m shapefiles konvertiert zu geojson mit [Mapshaper](https://mapshaper.org/)
* Stadtdaten (`WUP2018-F13-Capital_Cities.xls` auf Europa reduziert) von [World Urbanization Prospects](https://population.un.org/wup/Download/) => Urban Agglomerations

### Aufgabe

In erster Linie geht es darum eine gute Karte von Europa zu erstellen. Bevor du die Karte mit d3 implementierst, überlege dir welche Kartenprojektion mit welcher Konfiguration du benutzen willst (siehe Hinweis 1).

Hier ist eine Checkliste für die Implementierung der Karte.

1. Erstelle eine SVG node mit den Dimensionen `800x600`.
2. Konfiguriere eine geeignete Kartenprojektion für Europa.
3. Erstelle einen Pfadgenerator mithilfe der Projektion (Hinweis 2)
4. Binde die geografischen Daten an Pfade und rendere die Länder auf deine Karte (Hinweis 5).
5. Binde die Stadtdaten an Kreise und rendere die Städte auf deine Karte (Du kannst `d.size` für den radius benutzen). Diese Zahl ist von der Bevölkerungszahl abgeleitet (Hinweis 3, Hinweis 5).
6.  Du kannst die Länder und die Kreise weiter gestalten mithilfe von `.attr()` (siehe Hinweis 4).
7. Überlege dir wie du mit dieser Karte und mit diesem Datensatz eine Story erzählen könntest. Dabei kannst du dir folgende Fragen stellen?
    * Was sieht man auf dieser Karte?
    * Welche Städte sind interessant.
    * Was fällt dir auf wenn du die Städte auf der Karte siehst?
    * Findest du etwas komisch?
    * Gibt es hier eine politische Komponente?
    * Fehlt etwas, und wieso?
    * Gibt es Anmerkungen die du anbringen könntest um die Story hervorzuheben?
    * Für wen ist diese Karte?
    * Welchen Namen würdest du dieser Karte geben?
    * Braucht deine Karte oder die Daten auf deiner Karte einen Massstab?
8. Exportiere deine Karte aus dem Browser und verarbeite sie weiter in Sketch. Für Anmerkungen kann das zum Teil einfacher sein (Hinweis 7).
9. Vergiss nicht die Datenquellen anzugeben
10. Präpariere deine Visualisierung mit Anmerkungen (Titel, Visualisierung, Anmerkungen, Datenquelle).

> Wenn du willst kannst du ein Gradnetz auf deiner Karte anzeigen (Hinweis 6).

### Inspiration

Deine Visualisierung sollte ein Format verwenden welches auf Twitter passt. Lass dich dabei von diesen Twitter Feeds inspirieren.

* [Bloomberg Graphics](https://twitter.com/BBGVisualData)
* [Economist Data Team](https://twitter.com/ECONdailycharts)
* [NZZ Visuals](https://twitter.com/nzzvisuals)
* [Pudding](https://twitter.com/puddingviz)

### Hinweise

#### 1. Kartenprojektionen

Zu Europa und geeigneten Projektionen für Europa gibt es gute Hinweise im [Slidedeck](https://geografie-visualisierung.netlify.com/).

#### 2. Geografische Formen

Um eine geografische Form mit d3 in eine SVG node zu rendern brauchst du eine Kartenprojektion und einen Pfadgenerator:

```js
// Figure 1

const width = 800
const height = 400

const projection = d3.geoEqualEarth()
  .translate([width/2, height/2])

const pathGenerator = d3.geoPath().projection(projection)

```

#### 3. Geografische Punkte

Um einen Punkt auf eine Karte in d3 zu rendern brauchst du nur eine Kartenprojektion. Wenn `lon` und `lat` gegeben sind, gibt die Funktion `projection` ein Array von svg Koordinaten `[x, y]` zurück.

> ⚠️ Beachte die Reihenfolge von `[lon,lat]`. 

```js
// Figure 2

const width = 800
const height = 400

const projection = d3.geoEqualEarth()
  .translate([width/2, height/2])

// z.B. Bern Koordinaten
// https://www.google.com/search?q=bern+coordinates
const coordinates = [7.4474, 46.9480]

const circle = svg.append("circle")
  .attr("cx", projection(coordinates)[0])
  .attr("cy", projection(coordinates)[1])
  .attr("r", 6)

```

#### 4. Styling

Um die Formen und Kreise zu gestalten, kannst du `.attr()` und `.style()` benutzen. Falls du die Visualisierung in Sketch weiter gestalten möchstest, dann ist es besser `.attr()` zu benutzen.

```js
// Figure 2 - cont.

const circle = svg.append("circle")
  .attr("cx", projection(coordinates)[0])
  .attr("cy", projection(coordinates)[1])
  .attr("r", 6)
  .attr("stroke", "#25282A")
  .attr("stroke-width", 2)
  .attr("fill", "#E63422")

```

> ⚠️ Mehr informationen zu [circle](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle), [rect](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect), [line](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line) und [path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path) findest du auf [MDN](https://developer.mozilla.org/en-US/).

#### 5. Daten an Elemente binden

Um Datensätze an Elemente zu binden, musst du `.data()` und `.enter()` benutzen.

```js
// Figure 3

const width = 800
const height = 400

const projection = d3.geoEqualEarth()
  .translate([width/2, height/2])

const data = [
  { name: "Bern", coordinates: [7.4474, 46.9480], size: 4 },
  ...
]

const circles = svg.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", d => projection(coordinates)[0])
    .attr("cy", d => projection(coordinates)[1])
    .attr("r", d => d.size)

```

#### 6. Gradnetz

Wenn du ein Gradnetz (graticule) generieren möchtest um die Krümmung der Erde zu zeigen und das Lesen dere Karte zu vereinfachen, dann kannst du die Funktion `d3.graticule` verwenden. Zusammen mit dem Pfadgenerator kannst du dann ein Gradnetz wie einen normalen Pfad rendern.

> ⚠️ Vergiss nicht dem Gradnetz `stroke` eine Farbe zu geben und den `fill` transparent zu machen. Sonst sieht die ganze Sache sehr schlecht aus.

```js
// Figure 4

const graticule = d3.geoGraticule()()

const graticulePath = svg.append("path")
      .attr("d", pathGenerator(graticule))
      .attr("stroke", "#DDD")
      .attr("stroke-width", 0.5)
      .attr("fill", "transparent")

```

#### 7. SVG Export

Du kannst deine Karte weiter in Sketch gestalten. Um das SVG aus dem browser zu exportieren kannst du das Chrome Plugin [SVG Export](https://chrome.google.com/webstore/detail/svg-export/naeaaedieihlkmdajjefioajbbdbdjgp?hl=en-GB) benutzen.

#### 8. Dateninspektor

Um zu sehen welcher Kreis zu welcher Stadt gehört kannst du einen `click handler` anbringen und die Daten in der `console` sehen.

```js
// Figure 5

const circles = svg.selectAll("circle")
  .data(cities)
  .enter()
  .append("circle")
    .attr("cx", d => pojection([d.lon, l.lat])[0])
    .attr("cy", d => pojection([d.lon, l.lat])[1])
    .attr("d", d => d.size)
    .on("click", d => {
      console.log("Data: ", d)
    })

```

Im Browser kannst du den `console` tab in den Chrome devtools öffnen. Sobald du auf einen Kreis clickst siehst du den dazugehörenden Datenpunkt in der console.
