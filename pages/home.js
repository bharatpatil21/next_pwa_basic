import { Container } from "../components/Container";
import { Typography } from "@material-ui/core";
import fetch from 'node-fetch'


export default ({todos}) => (
    <Container>
        <Typography children="Home page" variant="h6" />
        <h5>Welcome page </h5>
        {todos.map(todo => <h6>{todo.name}</h6>)}
    </Container>
);

export async function getServerSideProps(){
    const resp =  await fetch('http://localhost:3000/api/todos');

    const todos = await resp.json();

    console.log('[TODOS]',todos); 

    return {
        props:{
            todos,
        }
    }
}
