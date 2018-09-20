import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Stop from '@material-ui/icons/Stop'
import Delete from '@material-ui/icons/Delete'
import AutoRenew from '@material-ui/icons/AutoRenew'
import green from '@material-ui/core/colors/green'
import classnames from 'classnames'

const styles = (theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        marginTop: 16,
    },
    table: {
        minWidth: 700,
    },
})

class ContainersTable extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {this.props.headers.map((header) => (
                                <TableCell>{header.name}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.data.map((row) => (
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {row.Names[0].substr(1)}
                                </TableCell>
                                <TableCell>{row.State}</TableCell>
                                <TableCell>{row.Status}</TableCell>
                                <TableCell>{row.Image}</TableCell>
                                <TableCell>
                                    {row.Ports[0].IP}, {row.Ports[0].PrivatePort} -> {row.Ports[0].PublicPort}
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color={row.State == 'running' ? 'secondary' : green}>
                                        <Stop />
                                    </Button>
                                    <Button variant="contained">
                                        <Delete />
                                    </Button>
                                    <Button variant="contained" color="primary">
                                        <AutoRenew />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

ContainersTable.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ContainersTable)
