import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Prescriptions } from "../../collections/prescriptions.js";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Medication from "./Medication";
import Grid from "@material-ui/core/Grid";
import MedicationCard from "./MedicationCard";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2
  }
});

class MedicationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingPrescription: false
    };
  }

  renderMedication() {
    return this.props.prescriptions.map(px => (
      <Medication key={px._id} ContainerProps={px} />
    ));
  }

  render() {
    const { classes } = this.props;
    console.log(this.props);
    console.log(classes);
    return (
      <React.Fragment>
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={0}>
          <Grid item xs={6}>
            <Paper className={classes.root}>
              <Typography variant="h5" component="h3">
                Medications
              </Typography>
              <Typography component="p">Replace with some headers</Typography>
              {this.renderMedication()}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <MedicationCard />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

// this checks that prescriptions and classes (for styling)
// are being passed as props to the Component
MedicationsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  prescriptions: PropTypes.array.isRequired
};

const styledComponent = withStyles(styles)(MedicationsPage);
export default withTracker(() => {
  Meteor.subscribe("prescriptions");
  return {
    prescriptions: Prescriptions.find().fetch()
  };
})(styledComponent);
