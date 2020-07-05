import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

const CustomInput = withStyles((theme) => ({
    root: {
      'label + &': {
        color: '#154854',
        marginTop: theme.spacing(2),
      },
    },
    input: {
        minWidth: 150,
        minHeight: 35,
        maxWidth: 410,
        scrollBehavior: 'auto',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: '#e3ecef',
        border: '1px solid #6493a1',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#6493a1',
            color: '#6493a1',
        },
    },
  })) (InputBase);

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
        color: '#e3ecef',
        backgroundColor: '#6493a1',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 170,
    },
    resultCard: {
        width: '500px',
        height: '520px',
        paddingTop: '20px',
        paddingLeft: '20px',
        paddingRight: '15px',
        paddingBottom: '15px',
    },
    textField: {
        maxWidth: 490,
        minWidth: 490,
        minHeight: 510,
        maxHeight: 510,
        borderColor: '#6493a1',
    },
    button: {
        backgroundColor: '#6493a1',
        color: 'white',
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        '&:hover': {
          backgroundColor: '#537b86',
        },
    },
    disableButton: {
        backgroundColor: '#808080',
        color: 'white',
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        '&:hover': {
            backgroundColor: '#808080',
        },
    },
}));

function getStyles(operation, operationNames, theme) {
    return {
        color:
        operationNames.indexOf(operation) === -1
            ? '#154854'
            : '#6493a1',
    };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        elevation: 0,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

const operations = [
    'Remove Javadocs', 'Remove // Comments', 
    'Remove /* Comments', 'Add Javadocs', 'Fix Whitespaces'
];

export default function Operator() {

    const [chosenOperations, setChosenOperations] = React.useState([]);
    const [openOperation, setOpenOperation] = React.useState(false);
    const classes = useStyles();
    const theme = useTheme();

    const handleChange = (event) => {
        setChosenOperations(event.target.value);
    };

    return (
        <div className={classes.root} style={{ whiteSpace: 'break-spaces'}}>
            <p>

            </p>
            <div style={{ whiteSpace: 'break-spaces', flex: 1, flexDirection: 'row', display: 'flex'}}>
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor='operation-selector' id="operation-label">Select Operations</InputLabel>
                <Select
                autoWidth
                variant='outlined'
                labelId="operation-label"
                id="operation-chip"
                multiple
                value={chosenOperations}
                onChange={handleChange}
                input={<CustomInput />}
                inputProps={{
                    name: 'operation',
                    id: 'operation-selector',
                }}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip}></Chip>
                    ))}
                    </div>
                )}
                MenuProps={MenuProps}
                >
                {operations.map((operation) => (
                    <MenuItem key={operation} value={operation} style={getStyles(operation, chosenOperations, theme)}>
                    {operation}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <span></span>
            <div style={{ padding: 28}}>
            {chosenOperations.length === 0 ? <Button className={classes.disableButton}>Run</Button> :
            <Button className={classes.button}>Run</Button>}
            <span>   </span>
            <Button className={classes.button}>Download File</Button>
            </div>
            </div>
            <div style={{ lineHeight: 2.8 }}>
                <span>    </span>
            </div>
            <Card elevation={0} className={classes.resultCard}>
            <TextareaAutosize 
                rowsMin={550} 
                className={classes.textField}
                value="Something random"
                >
            </TextareaAutosize>
            </Card>
        </div>
    );
}