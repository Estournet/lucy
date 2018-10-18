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
import { Route, Switch, withRouter } from "react-router-dom";
import asyncComponent from "./AsyncComponent.jsx";

const AsyncScarlettJohanssonPage = asyncComponent(() =>
  import("../pages/ScarlettJohanssonPage.jsx")
);
const AsyncUserPage = asyncComponent(() => import("../pages/UserPage.jsx"));
const AsyncHowToPage = asyncComponent(() => import("../pages/HowToPage.jsx"));
const AsyncEncryptPage = asyncComponent(() =>
  import("../pages/EncryptPage.jsx")
);
const AsyncConversationPage = asyncComponent(() =>
  import("../pages/ConversationPage.jsx")
);

const AsyncErrorPage = asyncComponent(() => import("../pages/ErrorPage.jsx"));

/**
 * Charge le contenu de la page dynamiquement. Ainsi, webpack peut importer à la volée les différents bundles nécéssaires.
 * Ca optimise grandement les temps de changement, notament sur les connexion les plus restreintes.
 * @returns {*}
 * @constructor
 */
const AsyncContent = () => (
  <Switch>
    <Route
      exact
      path="/scarlettjohansson"
      render={newProps => <AsyncScarlettJohanssonPage {...newProps} />}
    />
    <Route
      exact
      path="/howto"
      render={newProps => <AsyncHowToPage {...newProps} />}
    />
    <Route
      exact
      path="/encrypt"
      render={newProps => <AsyncEncryptPage {...newProps} />}
    />
    <Route
      exact
      path="/:conversationID"
      render={newProps => <AsyncConversationPage {...newProps} />}
    />
    <Route
      exact
      path="/:conversationID/:userName"
      render={newProps => <AsyncUserPage {...newProps} />}
    />
    <Route
      render={newProps => (
        <AsyncErrorPage error={"404 Not found"} {...newProps} />
      )}
    />
  </Switch>
);

export default withRouter(AsyncContent);
