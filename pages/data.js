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


    getMydata = async () => {

        const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
        const result = await res.json();
        // this.setState({users:result.data.users});
        console.log("USER REQ", result);
    }

    getUserData = async () => {

        const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const result = await res.json();
        // this.setState({users:result.data.users});
        console.log("USER REQ" ,result);
    }
    
    render(){
        return (
        <Container>
        <Typography children="Dummy Data API" variant="h6" />
        
        <button onClick={() =>this.getMydata()} > GET_ TODOS</button>
        <button onClick={() => this.getUserData()}>GET_ USER</button>

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
