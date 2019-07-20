import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    maxWidth: 360
  },
  inline: {
    display: "inline"
  },
  avatar: {
    margin: 10
  }
};

function Medication(props) {
  const { classes, ContainerProps } = props;
  const name = ContainerProps.rxName + " " + ContainerProps.rxStrength;
  const directions = ContainerProps.rxDose;
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start" divider={true}>
        <ListItemAvatar>
          <Avatar>PH</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                className={classes.inline}
                color="textSecondary"
              >
                Directions:{" "}
              </Typography>
              <Typography
                component="span"
                className={classes.inline}
                color="textPrimary"
              >
                {directions}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}

Medication.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Medication);
