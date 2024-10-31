import React from 'react';
import {render} from '@testing-library/react';
import App from '../App';
import {Provider} from "react-redux";
import {store} from "../sections/section";
import {BrowserRouter} from "react-router-dom";
import {setAuthedUser} from "../authentication/authedUser";

describe("App", () => {
    it("should render the component", () => {
        var component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
                expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
});
