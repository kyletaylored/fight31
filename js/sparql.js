const wdk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org",
  sparqlEndpoint: "https://query.wikidata.org/sparql"
});

/**
 * Returns the URL to fetch for the JSON results from Wikimedia
 * @param {int} year The year you were born.
 * @param {string} sex Your identified gender.
 */
function getResultUrl(year, s) {
  let gender = {
    male: "Q6581097",
    female: "Q6581072",
    intersex: "Q1097630",
    "transgender female": "Q1052281",
    "transgender male": "Q2449503"
  };

  // Map sex to code.
  let sex = gender[s];
  let genderQuery = "";
  if (s) {
    genderQuery = `wdt:P21 wd:${sex} ;`;
  }

  const sparql = `
      SELECT ?person ?name ?wikipedia_article
      WHERE
      {
        ?person wdt:P31 wd:Q5 ;   # human
           ${genderQuery}
           wdt:P569 ?born .
        FILTER (?born >= "${year}-01-01T00:00:00Z"^^xsd:dateTime && ?born <= "${year}-12-31T23:59:59Z"^^xsd:dateTime) .
        ?person wikibase:sitelinks ?linkcount .
        FILTER (?linkcount > 50) .
        ?person rdfs:label ?name FILTER(lang(?name)="en").
        ?wikipedia_article schema:about ?person .
        ?wikipedia_article schema:isPartOf <https://en.wikiquote.org/> .
      }
      ORDER BY DESC(?linkcount)
      LIMIT 100
      `;

  return wdk.sparqlQuery(sparql);
}
