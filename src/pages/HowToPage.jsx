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

import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Slide from "@material-ui/core/Slide/Slide";
import { Link } from "react-router-dom";

const HowToPage = () => (
  <Slide in direction="up" mountOnEnter unmountOnExit>
    <div>
      <Grid container spacing={32}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Comment utiliser ce site ?
          </Typography>
          <Typography variant="body1">
            Connectez vous à Facebook, allez dans{" "}
            <a href="https://www.facebook.com/settings?tab=your_facebook_information">
              Paramètres -> Vos informations Facebook
            </a>
            {" et cliquez sur "}
            <a href="https://www.facebook.com/dyi/?x=AdkyKUsIfjQzOtSt&referrer=yfi_settings">
              "Télécharger vos informations"
            </a>
            . Assurez vous que l'option "Messages" est bien cochée et que le
            format choisi est "JSON" puis cliquez sur "Créer un fichier".
          </Typography>
          <Typography variant="body1">
            Une fois le fichier téléchargé, naviguez dans l'archive et allez
            dans <code>messages/LaConversationALire/</code> et importez le
            fichier <code>message.json</code> sur la{" "}
            <Link to="/">page d'accueil</Link>.
          </Typography>
          <Typography variant="body1">
            Patientez quelques instants et vous pouvez accéder à vos
            statistiques !
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Mais c'est hyper chiant, on peut pas juste se connecter avec son
            compte Facebook ?
          </Typography>
          <Typography variant="body1">
            Je sais mais non, pas le choix, se connecter avec son compte
            Facebook ne permet pas d'accéder aux conversations de l'utilisateur.
          </Typography>
        </Grid>
      </Grid>
    </div>
  </Slide>
);

// As we import pages asynchroneously, the IDE thinks the component is unused.
// See AsyncComponent.jsx and AsyncContent.jsx for more details
// noinspection JSUnusedGlobalSymbols
export default HowToPage;
