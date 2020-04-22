import { GET_DUMMY_DATA, ADD_DUMMY_NAME } from "./types";


export const getDummyData = () => {
    return {type: GET_DUMMY_DATA}
};

export const addDummyName = (name) => {
    return {
        type:ADD_DUMMY_NAME,
        payload:name
    }
}