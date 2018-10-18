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
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide/Slide";
import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import GridList from "@material-ui/core/GridList/GridList";
import PropTypes from "prop-types";

const ScarlettJohanssonPage = props => (
  <Slide in direction="up" mountOnEnter unmountOnExit>
    <div className={props.classes.backgroundColor}>
      <GridList cellHeight="auto" className={props.classes.gridList} cols={1}>
        <GridListTile cols={1}>
          <a
            href="https://image.noelshack.com/fichiers/2018/32/5/1533893214-36973454.jpg"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src="https://image.noelshack.com/fichiers/2018/32/5/1533893214-36973454.jpg"
              alt="1"
              className={props.classes.autoWidth}
            />
          </a>
        </GridListTile>
        <GridListTile cols={1}>
          <a
            href="https://image.noelshack.com/fichiers/2018/32/5/1533893214-32759140.jpg"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src="https://image.noelshack.com/fichiers/2018/32/5/1533893214-32759140.jpg"
              alt="1"
              className={props.classes.autoWidth}
            />
          </a>
        </GridListTile>
        <GridListTile cols={1}>
          <a
            href="https://image.noelshack.com/fichiers/2018/32/5/1533893214-77177962.jpg"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src="https://image.noelshack.com/fichiers/2018/32/5/1533893214-77177962.jpg"
              alt="1"
              className={props.classes.autoWidth}
            />
          </a>
        </GridListTile>
        <GridListTile cols={1}>
          <a
            href="https://image.noelshack.com/fichiers/2018/32/5/1533893214-76700830.jpg"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src="https://image.noelshack.com/fichiers/2018/32/5/1533893214-76700830.jpg"
              alt="1"
              className={props.classes.autoWidth}
            />
          </a>
        </GridListTile>
      </GridList>
    </div>
  </Slide>
);

const styles = theme => ({
  backgroundColor: {
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%",
    height: "100%"
  },
  autoWidth: {
    width: "100%"
  }
});

ScarlettJohanssonPage.propTypes = {
  classes: PropTypes.object.isRequired
};

// As we import pages asynchroneously, the IDE thinks the component is unused.
// See AsyncComponent.jsx and AsyncContent.jsx for more details
// noinspection JSUnusedGlobalSymbols
export default withStyles(styles)(ScarlettJohanssonPage);
