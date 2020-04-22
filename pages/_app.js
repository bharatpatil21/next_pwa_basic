import App from 'next/app';
import {Provider} from 'react-redux';
import React from 'react';

import { createStore, compose } from "redux";
import withRedux from "next-redux-wrapper";
import reducers from "../redux/reducers";

//REDUX DEV TOOLS
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//REDUX STORE
// create a store creator
const store = createStore(
    reducers,
    composeEnhancers()
);

//make store is a function that returns a new store for every request
const makeStore = () => store;

class MyApp extends App {

    static async getStaticProps({Component, ctx}) {
        const pageProps = Component.getStaticProps ? 
                await Component.getStaticProps(ctx) : {};

        //Anything returned here can be access by the client
        return {pageProps: pageProps};
    }

    render() {
        const {Component, pageProps} = this.props;
        return (
            <Provider store={store}>
                 <Component {...pageProps}/>
            </Provider>
        );
    }

}

export default withRedux(makeStore)(MyApp);