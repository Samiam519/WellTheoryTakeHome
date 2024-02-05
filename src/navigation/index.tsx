import React, {Component} from 'react'
import {Menu, MenuItem, MenuMenu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

export class Navigation extends Component {

    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    componentDidMount() {
        this.setState({activeItem: window.location.pathname.includes('profile') ? 'profile' : window.location.pathname === '/' ? 'home' : null })
    }

    render() {
        const { activeItem } = this.state

        return (
            <Menu color="green" inverted style={{marginTop: 0}}>
                <MenuMenu position="right">
                    <MenuItem
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                        as={NavLink} to="/"
                    />
                    <MenuItem
                        name='profile'
                        active={activeItem === 'profile'}
                        onClick={this.handleItemClick}
                        as={NavLink} to="/profile"
                    />
                </MenuMenu>
            </Menu>
        )
    }
}
