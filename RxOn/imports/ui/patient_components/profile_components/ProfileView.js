import React from 'react';
import pify from 'pify';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    menu: {
        width: 200,
    },
});

const sexes = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
];

class ProfileView extends React.Component {
    state = {
        fieldsDisabled: true,
        isSubmitDisabled: false,

        firstName: '',
        firstNameError: false,
        firstNameErrorText: '',

        lastName: '',
        lastNameError: false,
        lastNameErrorText: '',

        sex: '',
        sexError: false,
        sexErrorText: '',

        address: '',
        addressError: false,
        addressErrorText: '',
    };

    handleButtonClick = () => {
        if (this.state.fieldsDisabled) {
            this.setState({ firstName: this.props.firstName });
            this.setState({ lastName: this.props.lastName });
            this.setState({ sex: this.props.sex });
            this.setState({ address: this.props.address });
            this.setState({ fieldsDisabled: false });
        } else {
            this.handleSubmit();
        }
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    getValue = field => {
        if (!this.state.fieldsDisabled) {
            return this.state[field];
        }
        return this.props[field] || '';
    };

    validateReqFields = fields => {
        let invalid = false;
        for (let f of fields) {
            if (!f.value) {
                this.setState({ [f.error]: true, [f.text]: 'Field is required.' });
                invalid = true;
            } else {
                this.setState({ [f.error]: false });
            }
        }
        if (invalid) throw new Error();
        return true;
    };

    handleSubmit = async () => {
        this.setState({ isSubmitDisabled: true });
        try {
            this.validateReqFields([
                {
                    value: this.state.firstName,
                    error: 'firstNameError',
                    text: 'firstNameErrorText',
                },
                {
                    value: this.state.lastName,
                    error: 'lastNameError',
                    text: 'lastNameErrorText',
                },
                { value: this.state.sex, error: 'sexError', text: 'sexErrorText' },
                {
                    value: this.state.address,
                    error: 'addressError',
                    text: 'addressErrorText',
                },
            ]);
            await pify(Meteor.call)(
                'account.edit',
                this.state.firstName,
                this.state.lastName,
                this.state.sex,
                this.state.address
            );
            this.setState({ fieldsDisabled: true });
        } catch (error) {
            this.setState({ isSubmitDisabled: false, errorMessage: error.reason });
        }
    };

    handleCancel = () => {
        this.setState({
            fieldsDisabled: true,

            firstNameError: false,
            firstNameErrorText: '',

            lastNameError: false,
            lastNameErrorText: '',

            sexError: false,
            sexErrorText: '',

            addressError: false,
            addressErrorText: '',
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <form noValidate autoComplete="off">
                <div>
                    <TextField
                        required
                        id="firstName"
                        label="First Name"
                        value={this.getValue('firstName')}
                        onChange={this.handleChange('firstName')}
                        error={this.state.firstNameError}
                        helperText={this.state.firstNameErrorText}
                        className={classes.textField}
                        margin="normal"
                        disabled={this.state.fieldsDisabled}
                    />

                    <TextField
                        required
                        id="lastName"
                        label="Last Name"
                        value={this.getValue('lastName')}
                        onChange={this.handleChange('lastName')}
                        error={this.state.lastNameError}
                        helperText={this.state.lastNameErrorText}
                        className={classes.textField}
                        margin="normal"
                        disabled={this.state.fieldsDisabled}
                    />

                    <TextField
                        required
                        id="standard-select-sex"
                        select
                        label="Sex"
                        className={classes.textField}
                        value={this.getValue('sex')}
                        onChange={this.handleChange('sex')}
                        error={this.state.sexError}
                        helperText={this.state.sexErrorText}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                        disabled={this.state.fieldsDisabled}
                    >
                        {sexes.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        required
                        id="address"
                        label="Address"
                        value={this.getValue('address')}
                        onChange={this.handleChange('address')}
                        error={this.state.addressError}
                        helperText={this.state.addressErrorText}
                        className={classes.textField}
                        margin="normal"
                        disabled={this.state.fieldsDisabled}
                    />
                </div>

                <Typography component="div" color="error">
                    <br />
                    {this.state.errorMessage}
                </Typography>

                <div>
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleButtonClick}
                        disabled={this.isSubmitDisabled}
                    >
                        {this.state.fieldsDisabled ? 'Edit' : 'Submit'}
                    </Button>
                    {this.state.fieldsDisabled ? (
                        ''
                    ) : (
                        <Button
                            variant="contained"
                            color="default"
                            onClick={this.handleCancel}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        );
    }
}

export default withStyles(styles)(
    withTracker(() => {
        Meteor.subscribe('userData');
        let currentUser = Meteor.users.findOne();
        return {
            firstName: currentUser ? currentUser.firstname : '',
            lastName: currentUser ? currentUser.lastname : '',
            sex: currentUser ? currentUser.sex : '',
            address: currentUser ? currentUser.address : '',
        };
    })(ProfileView)
);
