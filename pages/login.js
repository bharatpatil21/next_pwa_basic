import { Container } from "../components/Container";
import { Typography } from "@material-ui/core";
import { Component } from "react";
import styles from "../styles/login.module.css";

export default class Login extends Component{

    state = {
        email:"",
        password:""
    }

    login = () => {
        let { email, password } =  this.state;
        console.log(email,password);
    }

    render(){
        return(
            <Container>
                <div className={styles.wrapper}>
                <div>
                    <img 
                        src="images/access.svg" 
                        alt="access_svg"
                        width="500px"
                    ></img>
                </div>
                <div className={styles.formContainer}>
                <div>
                    <input
                         className={styles.input} 
                        type = "email" 
                        placeholder = "Enter Email" 
                        value = { this.state.email }
                        onChange = { (e) => this.setState({email:e.target.value})}
                    />
                </div>
                <div>
                    <input
                         className={styles.input} 
                        type = "password" 
                        placeholder = "Enter Secret Key" 
                        value = { this.state.password }
                        onChange = { (e) => this.setState({password:e.target.value})}
                    />
                </div>
                <div className={styles.button}>
                    <button 
                        type = "button"  
                        onClick = { () => this.login()}
                    >
                        Login
                    </button>
                </div>
                </div>
                </div>
            </Container>  
          );
    }
}