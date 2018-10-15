/*
 * Lucy - Messenger statistics
 * Copyright (C) 2018 Vincent M
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import format from "date-fns/format";
import { fr } from "date-fns/locale";

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

export const formatFullDate = date =>
  format(date, "eeee dd MMMM yyyy", { locale: fr });

export const formatMMMYYDate = date => format(date, "MMM yy", { locale: fr });
