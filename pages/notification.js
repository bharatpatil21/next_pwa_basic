import React, { Component } from 'react'
import { Container } from "../components/Container";
import { Typography } from "@material-ui/core";

const publicVapidKey = "BCj54G9kp6-MuxVje45_rEdNd24WnFaDLOquVDqrdeqGy_NwwaeTovYJoKdP429zTri6hqypw4TXKMFF6a57aMQ";

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export default class notification extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }


    configurePushSubscription = () => {

        this.setState({ loading: true });
        console.log("you are inside the web notification subscription code !!");
        if (!'Notification' in navigator) {
            return;
        }

        let swRef;

        navigator.serviceWorker.ready.then(sw => {
            swRef = sw;
            return swRef.pushManager.getSubscription(); // this allow to get the subscripition 

        }).then(sub => {
            if (sub === null) {
                // create a new subscription 
                console.log("we dont have the subcription")

                return swRef.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
                }).then(subscription => {
                    console.log("user is subscribed", subscription)
                });
            } else {
                // we have a subscription ;
                console.log("we have the subcription", sub);
                return sub;
            }
        }).then(function (newSub) {

            // here you have to store this newsbu i.e. your subscription user to database
            // with the help of newSub Request payload // you get the endpoing and keys {p256dh , auth}
            // which is used to send the notification to the user 
            console.log("this is subsciriton body", newSub);

            let urlDb = "https://pwa-serv-notify.herokuapp.com/api/pwa/subscribe";
            return fetch(urlDb, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newSub)
            })
        }).then(function (res) {
            if (res.ok) {
                console.log("new subscriber is added to DB ", res);
                this.setState({ loading: false });

                let subBtn = document.getElementById("sub-notification");
                subBtn.style.display = "none";
            }
        }).catch(function (err) {
            this.setState({ loading: false });

            console.log("server : App subscriber error ", err);
        });

    }


    render() {
        return (
            <div>
                <Container>
                    <Typography children="Notification" variant="h6" />

                    {this.state.isLoading && <h3>Loading...</h3>}

                    <h6>Start Notification from server </h6>
                    <button onClick={() => this.configurePushSubscription()} >Start Server Notification</button>
                </Container>
            </div>
        )
    }
}
