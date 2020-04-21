import { Container } from "../components/Container";
import { Typography } from "@material-ui/core";
import fetch from "isomorphic-unfetch";
import { AppConfig } from '../AppConfig';

export default function({users}) {
    return (
        <Container>
        <Typography children="Home page" variant="h6" />
        <h4>List of users from /api/v2/users-nosql</h4>
        <h6>Data fetched with Next.js method getServerSideProps</h6>
        <ul>
            {users.map(user => {
                return <li key={user.id}>{user.name}</li>
            })}
        </ul>
        </Container>
    )
}

export async function getServerSideProps(context){

    const res = await fetch(`${AppConfig.appUrl}/api/v2/users-nosql`);
    const respData = await res.json();
    const users = respData.data.users; 

    return {
        props:{
            users
        }
    }
}