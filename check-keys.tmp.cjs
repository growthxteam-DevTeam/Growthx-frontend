const en = require("./messages/en.json");
const fr = require("./messages/fr.json");
const keys = (o, p = "") =>
  Object.entries(o).flatMap(([k, v]) => (typeof v === "object" && v ? keys(v, p + k + ".") : [p + k]));
const a = new Set(keys(en));
const b = new Set(keys(fr));
console.log("en", a.size, "fr", b.size);
console.log(
  "missing in fr:",
  [...a].filter((k) => !b.has(k)),
);
console.log(
  "extra in fr:",
  [...b].filter((k) => !a.has(k)),
);
