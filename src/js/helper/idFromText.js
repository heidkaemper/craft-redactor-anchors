export default function idFromText(str) {
    return str ? str.substring(0, 50).trim().toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-_.]/g, '') : '';
};
