import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import asyncComponent from './AsyncComponent.jsx';

// const AsyncHomePage = asyncComponent(() => import('../pages/Homepage.jsx'));
const AsyncUserPage = asyncComponent(() => import('../pages/UserPage.jsx'));
const AsyncConversationPage = asyncComponent(() =>
  import('../pages/ConversationPage.jsx')
);

// const AsyncAdministrationPage = asyncComponent(() => import('components/pages/AdministrationPage.jsx'));
const AsyncNotFoundPage = asyncComponent(() =>
  import('../pages/NotFoundPage.jsx')
);

// const AsyncAboutPage = asyncComponent(() => import('components/pages/AboutPage.jsx'));

/**
 * Charge le contenu de la page dynamiquement. Ainsi, webpack peut importer à la volée les différents bundles nécéssaires.
 * Ca optimise grandement les temps de changement, notament sur les connexion les plus restreintes.
 * @returns {*}
 * @constructor
 */
const AsyncContent = () => (
  <Switch>
    {/*<Route*/}
    {/*exact*/}
    {/*path="/"*/}
    {/*render={newProps => <AsyncHomePage {...newProps} />}*/}
    {/*/>*/}
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

    {/*<Route exact path="/administration" render={newProps => <AsyncAdministrationPage {...newProps} openSnackbar={props.openSnackbar}/>}/>*/}

    {/*<Route exact path="/about" render={newProps => <AsyncAboutPage {...newProps} openSnackbar={props.openSnackbar}/>}/>*/}

    <Route render={newProps => <AsyncNotFoundPage {...newProps} />} />
  </Switch>
);

export default withRouter(AsyncContent);
