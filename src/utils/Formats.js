export const formatNumber = nb => new Intl.NumberFormat().format(nb);

/**
 * Convertit le Unicode. Utilise une méthode dépréciée mais bon, pas le choix pour le moment
 * @param input la chaine de caractère à décoder
 * @returns {string} la chaine de caractère décodée
 */
export const convertUnicode = input => decodeURIComponent(escape(input));

export const formatMap = map => {
  map.keys = Array.from(map.keys());
  map.values = Array.from(map.values());
};
