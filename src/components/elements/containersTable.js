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
import PlayArrow from '@material-ui/icons/PlayArrow'
import Delete from '@material-ui/icons/Delete'
import AutoRenew from '@material-ui/icons/AutoRenew'
import green from '@material-ui/core/colors/green'
import classnames from 'classnames'
import DockerIcon from '../../assets/icons8-docker-48.png'
import * as io from 'socket.io-client'
const API_URL = 'http://localhost:8000'
const socket = io.connect(API_URL)

const styles = (theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        marginTop: 16,
    },
    table: {
        minWidth: 700,
    },
    icon: {
        bottom: 0,
        height: 20,
        width: 20,
        marginBottom: -5,
        marginRight: 5,
        color: 'rgba(0, 0, 0, 0.87)',
    },
    button: {
        padding: 8,
    },
    green: {
        color: '#8bc34a',
        fontWeight: 450,
    },
    red: {
        color: 'red',
        fontWeight: 'bold',
    },
})

class ContainersTable extends Component {
    constructor(props) {
        super(props)
        this.startContainer = this.startContainer.bind(this)
        this.stopContainer = this.stopContainer.bind(this)
    }

    startContainer(id) {
        socket.emit('container.start', { id })
    }

    stopContainer(id) {
        socket.emit('container.stop', { id })
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
                                <TableCell className={row.State == 'running' ? classes.green : classes.red}>
                                    {row.State}
                                </TableCell>
                                <TableCell>{row.Status}</TableCell>
                                <TableCell position="relative">
                                    <img src={DockerIcon} className={classes.icon} />
                                    {row.Image}
                                </TableCell>
                                <TableCell>
                                    {row.Ports[0] && row.Ports[0].IP ? row.Ports[0].IP : 'No IP'},{' '}
                                    {row.Ports[0] && row.Ports[0].PrivatePort ? row.Ports[0].PrivatePort : '....'} ->{' '}
                                    {row.Ports[0] && row.Ports[0].PublicPort ? row.Ports[0].PublicPort : '....'}
                                </TableCell>
                                <TableCell>
                                    {row.State === 'running' ? (
                                        <Button
                                            onClick={() => this.stopContainer(row.Id)}
                                            className={classes.button}
                                            variant="contained"
                                            color="secondary"
                                        >
                                            <Stop />
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => this.startContainer(row.Id)}
                                            variant="contained"
                                            color="primary"
                                        >
                                            <PlayArrow />
                                        </Button>
                                    )}
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
