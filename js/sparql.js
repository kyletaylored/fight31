const wdk = require("wikibase-sdk")({
  instance: "https://www.wikidata.org",
  sparqlEndpoint: "https://query.wikidata.org/sparql"
});

/**
 * Returns the URL to fetch for the JSON results from Wikimedia
 * @param {int} year The year you were born.
 * @param {string} gender Your identified gender.
 */
function getResultUrl(year, gender, notfamous) {
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
  let genderQuery = "# gender query \n";
  let newGen = g[gender];
  if (typeof newGen !== "undefined") {
    genderQuery = `wdt:P21 wd:${newGen} ; \n`;
  }

  // Check for famous people.
  let lc = notfamous ? "1" : "50";

  // Update year
  year = year - 31;

  const sparql =
    "SELECT ?name ?picture ?born ?died ?wikipedia_article WHERE { \n" +
    "?person wdt:P31 wd:Q5; \n" +
    "wdt:P18 ?picture; \n" +
    genderQuery +
    "wdt:P569 ?born . \n" +
    "OPTIONAL { ?person wdt:P570 ?died . } " +
    'FILTER((?born >= "' +
    year +
    '-01-01T00:00:00Z"^^xsd:dateTime) && (?born <= "' +
    year +
    '-12-31T23:59:59Z"^^xsd:dateTime)) \n' +
    "?person wikibase:sitelinks ?linkcount . \n" +
    "FILTER(?linkcount > " +
    lc +
    " ) \n" +
    "?person rdfs:label ?name . \n" +
    'FILTER((LANG(?name)) = "en") \n' +
    "?wikipedia_article schema:about ?person; schema:isPartOf <https://en.wikipedia.org/> . \n" +
    "} \n" +
    "ORDER BY DESC (?linkcount) \n" +
    "LIMIT 25";

  // Prepare object
  const obj = {
    url: wdk.sparqlQuery(sparql),
    uri: encodeURIComponent(sparql)
  };

  return obj;
}

window.getResultUrl = getResultUrl;
