const wdk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org",
  sparqlEndpoint: "https://query.wikidata.org/sparql"
});

/**
 * Returns the URL to fetch for the JSON results from Wikimedia
 * @param {int} year The year you were born.
 * @param {string} gender Your identified gender.
 */
function getResultUrl(year, gender) {
  // Define gender codes
  let g = {
    male: "Q6581097",
    female: "Q6581072",
    intersex: "Q1097630",
    "non-binary": "Q48270",
    "transgender female": "Q1052281",
    "transgender male": "Q2449503"
  };

  // Map sex to code.
  let genderQuery = "# gender query";
  let newGen = g[gender];
  if (typeof newGen !== "undefined") {
    genderQuery = `wdt:P21 wd:${newGen} ;`;
  }

  // Update year
  year = year - 31;

  const sparql = `
      SELECT ?name ?picture ?born ?died ?wikipedia_article WHERE {
        ?person wdt:P31 wd:Q5;
          wdt:P18 ?picture;
          ${genderQuery}
          wdt:P569 ?born.
        OPTIONAL { ?person wdt:P570 ?died. }
        FILTER((?born >= "${year}-01-01T00:00:00Z"^^xsd:dateTime) && (?born <= "${year}-12-31T23:59:59Z"^^xsd:dateTime))
        ?person wikibase:sitelinks ?linkcount.
        FILTER(?linkcount > 50 )
        ?person rdfs:label ?name.
        FILTER((LANG(?name)) = "en")
        ?wikipedia_article schema:about ?person;
          schema:isPartOf <https://en.wikipedia.org/>.
      }
      ORDER BY DESC (?linkcount)
      LIMIT 25
      `;

  return wdk.sparqlQuery(sparql);
}

window.getResultUrl = getResultUrl;
