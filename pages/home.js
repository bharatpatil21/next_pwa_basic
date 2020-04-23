import { Container } from "../components/Container";
import { Typography } from "@material-ui/core";
import fetch from "isomorphic-unfetch";
import { AppConfig } from '../AppConfig';
import { Component } from 'react';
import Link from 'next/link';
import { connect } from "react-redux";
import { getDummyData, addDummyName } from "../redux/actions";

class Home extends Component {
    state = {
        users:[]
    }

    getUserList = async () => {
        const res = await fetch(`${AppConfig.appUrl}/api/v2/users-sql`);
        const result = await res.json();
        this.setState({users:result.data.users});
    }
    
    render(){
        return (
        <Container>
        <Typography children="Home page" variant="h6" />
        <h4>List of users from /api/v2/users-sql</h4>
        <h6>Data fetched on click with normal react syntax</h6>
        <button onClick = {() => this.getUserList()}>Get users list</button>
        <ul>
        {this.state.users.map(user => {
            return <li key={user.id}>{user.name}</li>
        })}
        </ul>
        <Link href='/users'><a>Go to /api/v2/users-nosql</a></Link>
        <h6>Dummy Data from Reducer</h6>
        <ul>
        {this.props.names.map(name => {
            return <li key={name}>{name}</li>
        })}
        </ul>

        <button onClick={() => this.props.addDummyName('Ronil')}>Add Dummy name - Ronil</button>
    </Container>
        );
    }
}

const mapStateToProps = ({dummyData}) => {
    const { names } = dummyData;

    return {
        names
    }
}

export default connect(mapStateToProps,{getDummyData,addDummyName})(Home);
