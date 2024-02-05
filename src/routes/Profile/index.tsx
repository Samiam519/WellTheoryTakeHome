import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import * as Theme from '@theme';
import {
    Button,
    Checkbox,
    Container,
    Form,
    FormField, FormTextArea,
    Grid,
    GridColumn,
    GridRow,
    Label,
    Menu,
    MenuItem, Popup,
    Segment
} from "semantic-ui-react";
import styles from '../../styles.module.scss';
import {useUser} from "@providers";
import {createSupportTicket} from '@api';

/* TODO:
### Layout
1. Implement a layout with a menu on the left and views on the right. Use grid and/or flexbox.
2. Implement a way to navigate between base and support views. Use "react-router-dom".

### Base view
1. Display user's full name and their email. Use UserProvider's functionality (see providers.js)
2. Display user's masked phone number, and implement a way to unmask it. Use UserProvider's context.
3. Display user's address.

### Support view
1. Use your preferred form library to implement a form that will call API's createSupportTicket.
2. Display a success message after the form is submitted.
Make sure to handle field validation.
*/

const menuStyle = {
    display: 'flex',
    'flex-direction': 'column',
    height: '100vh',
    'overflow-y': 'scroll',
};

const BaseView = () => {
    const [phoneUmasked, setPhoneUnmasked] = useState(false)
    const {state, togglePhoneMask} = useUser()

    const switchPhoneMask = (check) => {
        setPhoneUnmasked(check)
        togglePhoneMask(check)
    }

    return (
        <div id="base-view" className={styles.beigeBackground}>
            <h2>User Information</h2>
            <Grid padded>
                <GridRow className={styles['py-2']}>
                    <GridColumn width={3}>
                        <Label>Name</Label>
                    </GridColumn>
                    <GridColumn width={13}>
                        <span>{state.name}</span>
                    </GridColumn>
                </GridRow>
                <GridRow className={styles['py-2']}>
                    <GridColumn width={3}>
                        <Label>Email</Label>
                    </GridColumn>
                    <GridColumn width={13}>
                        <span>{state.email}</span>
                    </GridColumn>
                </GridRow>
                <GridRow className={styles['py-2']}>
                    <GridColumn width={3}>
                        <Label>Phone</Label>
                    </GridColumn>
                    <GridColumn width={9}>
                        <span>{state.phoneDisplay}</span>
                    </GridColumn>
                    <GridColumn width={4}>
                        <Checkbox toggle label="Show" checked={phoneUmasked}
                                  onChange={(e,data)=>switchPhoneMask(data.checked)}/>
                    </GridColumn>
                </GridRow>
                <GridRow className={styles['py-2']}>
                    <GridColumn width={3}>
                        <Label>Address</Label>
                    </GridColumn>
                    <GridColumn width={13}>
                        <span>{state.address}</span>
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
};

export const SupportView = () => {
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = ()=>{
        createSupportTicket(title, message)
    }

    return (
        <div id="support-view">
            <h2>Create Support Ticket</h2>
            <Form>
                <FormField required>
                    <label>Subject</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Quick description of the issue' />
                </FormField>
                <FormTextArea required value={message} onChange={e => setMessage(e.target.value)} label="Details" placeholder="Describe the issue in as many details as possible. Include browser type and version"/>
                {
                    title && message && message.length >= 80?
                        (<Button type='submit' onClick={handleSubmit}>Submit</Button>):
                        (<Popup content={!title || !message ? 'Fill out all fields before submitting' : message.length < 80 ? 'Details must be at least 80 characters': ''} trigger={<span><Button disabled type='submit'>Submit</Button></span>} />)
                }
            </Form>
        </div>
    );
};

const profileStyle = {
    backgroundColor: Theme.colors.beige,
    width: '100vw',
    height: '100vh',
};

export default class Profile extends Component {
    state = {activeItem: 'base'}

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    componentDidMount() {
        this.setState({activeItem: window.location.pathname.includes('support') ? 'support' : 'base'})
    }

    render() {
        const {activeItem} = this.state

        return (
            <Container>
                <h1>Profile</h1>
                <Grid>
                    <GridColumn width={4}>
                        <Menu fluid vertical tabular>
                            <MenuItem
                                name='base'
                                active={activeItem === 'base'}
                                onClick={this.handleItemClick}
                                as={Link} to='/profile'
                            />
                            <MenuItem
                                name='support'
                                active={activeItem === 'support'}
                                onClick={this.handleItemClick}
                                as={Link} to='/profile/support'
                            />
                        </Menu>
                    </GridColumn>

                    <GridColumn stretched width={12}>
                        <Segment>
                            {
                                activeItem === 'base' ? <BaseView/> : <SupportView/>
                            }
                        </Segment>
                    </GridColumn>
                </Grid>
            </Container>
        )
    }
}
