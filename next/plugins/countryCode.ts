
const countryCodes = require('config/coutnry_code.json');

export const countryCodebook: Record<string, string | undefined> = Object.assign({}, ...countryCodes.map((d: any) => { return { [d.code]: d.ja_name }; }));
