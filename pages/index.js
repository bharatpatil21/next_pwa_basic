import { Container } from "../components/Container";
import { Typography } from "@material-ui/core";
import Link from "next/link";

export default () => (
  <Container>
    <Typography children="Index page" variant="h6" />
    <div><Link href="/home"><a>Go to Home</a></Link></div>
    <div><Link href="/users"><a>Go to users</a></Link></div>
    <div><Link href="/login"><a>Login</a></Link></div>
  </Container>
);
