#Lucy – Messenger statistics

Ce dépôt contient les sources pour le site Lucy. Il s'agit de statistiques basiques sur les conversations Facebook Messenger.
Ce site est uniquement côté client, aucune donnée n'est envoyée à un quelconque serveur, tout est fait localement, sur la machine de l'utilisateur.

##Installation

    git clone https://github.com/Estournet/lucy.git
    npm install
    npm start

##Comment ça marche

###Récupérer sa propre conversation Facebook

Connectez vous à Facebook, allez dans [Paramètres -> Vos informations Facebook](https://www.facebook.com/settings?tab=your_facebook_information)
et cliquez sur ["Télécharger vos informations"](https://www.facebook.com/dyi/?x=AdkyKUsIfjQzOtSt&referrer=yfi_settings).
Assurez vous que l'option *Messages* est bien cochée et que le format choisi est `JSON` puis cliquez sur *Créer un fichier*.

Une fois le fichier téléchargé, naviguez dans l'archive et allez dans `messages/LaConversationALire/` et importez le
fichier `message.json` sur la page d'accueil.
Patientez quelques instants et vous pouvez accéder à vos statistiques !

###Lire les statistiques d'une conversation déjà disponible

Vous pouvez lire les statistiques d'une conversation déjà disponible simplement en cliquant dessus. Si la conversation est chiffrée, 
vous devrez saisir le mot de passe qui vous aura été fourni par la personne hébergeant le site. 

##Nota Bene

Étant donné que le site est client uniquement, c'est à celui qui héberge le site de mettre en place les conversations disponible et celles chiffrées.
Vous pouvez accéder à `adressedusite/encrypt` pour chiffrer votre fichier. C'est aussi à l'hébergeur de remplir le fichier `conversation.json` qui 
décrit les conversations disponibles.

**Vincent M**

#License

>Lucy – Messenger statistics
>
>Copyright (C) 2018  Vincent M
>
>This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
>
>This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
>
>You should have received a copy of the GNU General Public License
along with this program.  If not, see [http://www.gnu.org/licenses/](http://www.gnu.org/licenses/).