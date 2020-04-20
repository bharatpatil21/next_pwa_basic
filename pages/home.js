import { Container } from "../components/Container";
import { Typography } from "@material-ui/core";
import fetch from 'node-fetch'

const APP_URL = 'https://intense-brook-66021.herokuapp.com';
const LOCALHOST = 'http://localhost:80';

export default ({todos}) => (
    <Container>
        <Typography children="Home page" variant="h6" />
        <h5>Welcome page </h5>
        {todos.map(todo => <h6>{todo.name}</h6>)}
    </Container>
);

export async function getStaticProps(){
    const resp =  await fetch(`${LOCALHOST}/api/todos`);

    const todos = await resp.json();


    return {
        props:{
            todos,
        }
    }
}
