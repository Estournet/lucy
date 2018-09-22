import React from 'react';
import { Typography } from '@material-ui/core';
import Stats from '../components/Stats';
import Parser from '../utils/Parser';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import Chart from '../components/Chart';
import Members from '../components/Members';
import Slide from '@material-ui/core/Slide/Slide';
import { withRouter } from 'react-router-dom';

class ConversationPage extends React.PureComponent {
  constructor(props) {
    super();
    Parser.parse(props.match.params.conversationID);
  }

  render() {
    const { props } = this;
    const conversationData = Parser.getConversationData(
      props.match.params.conversationID
    );
    return (
      <Slide in direction="up" mountOnEnter unmountOnExit>
        <div>
          <Typography
            variant="display1"
            align="center"
            color="textPrimary"
            className={props.classes.title}
          >
            {conversationData.conversationName}
          </Typography>
          <Grid container spacing={32}>
            <Grid item xs={12}>
              <Members
                usersName={conversationData.users.map(user => user.userName)}
                conversationID={conversationData.conversationID}
              />
            </Grid>
            <Grid item xs={12}>
              <Stats conversationID={conversationData.conversationID} />
            </Grid>
            <Grid item xs={12}>
              <Chart
                data={conversationData.messageCountPerUser}
                label="Nombre de messages"
                defaultChart="bar"
                title="Nombre de messages total"
              />
            </Grid>
            <Grid item xs={12}>
              <Chart
                data={conversationData.charCountPerUser}
                label="Nombre de caractères"
                defaultChart="bar"
                title="Nombre de caractères total"
              />
            </Grid>
            <Grid item xs={12}>
              <Chart
                data={conversationData.messagesPerMonth}
                label="Nombre de messages"
                defaultChart="line"
                title="Nombre de messages au cours du temps"
              />
            </Grid>
          </Grid>
        </div>
      </Slide>
    );
  }
}

// const ConversationPage = props => {
//   const parser = Parser.getConversationData(props.match.params.conversationID);
//   // console.log(props);
//   // console.log(parser);
//   // p.parsedData()
//   // console.log(Parser.parsedData("Le club pétanque MONARD"));
//   return (
//     <Slide in direction="up" mountOnEnter unmountOnExit>
//       <div>
//         <Typography
//           variant="display1"
//           align="center"
//           color="textPrimary"
//           className={props.classes.title}
//         >
//           {parser.conversationID}
//         </Typography>
//         <Grid container spacing={32}>
//           <Grid item xs={12}>
//             <Members usersName={parser.users.map(user => user.userName)}
//                      conversationID={parser.conversationID}/>
//           </Grid>
//           <Grid item xs={12}>
//             <Stats/>
//           </Grid>
//           <Grid item xs={12}>
//             <Chart
//               data={parser.messageCountPerUser}
//               label="Nombre de messages"
//               defaultChart="bar"
//               title="Nombre de messages total"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Chart
//               data={parser.charCountPerUser}
//               label="Nombre de caractères"
//               defaultChart="bar"
//               title="Nombre de caractères total"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Chart
//               data={parser.messagesPerMonth}
//               label="Nombre de messages"
//               defaultChart="line"
//               title="Nombre de messages au cours du temps"
//             />
//           </Grid>
//         </Grid>
//       </div>
//     </Slide>
//   );
// };

const styles = theme => ({
  title: {
    paddingBottom: theme.spacing.unit * 4
  }
});

export default withStyles(styles)(withRouter(ConversationPage));
