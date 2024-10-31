import {fireEvent, render} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../sections/section";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import Login from "../authentication/Login";
import {handleInitialData} from "../actions/shared";

describe("Login", () => {
    it("should render the component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it('should clear input elements after clicking submit button', async () => {
        await store.dispatch(handleInitialData());

        const wrapper = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );

        const usernameInputElement = wrapper.getByTestId("username");
        const passwordInputElement = wrapper.getByTestId("password");
        const submitButtonElement = wrapper.getByTestId("submit");

        fireEvent.change(usernameInputElement, {target: {value: 'sarahedo'}});
        fireEvent.change(passwordInputElement, {target: {value: 'wrongpassword'}});
        expect(usernameInputElement.value).toBe("sarahedo");
        expect(passwordInputElement.value).toBe("wrongpassword");
        fireEvent.click(submitButtonElement); // User stays on page
        expect(usernameInputElement.value).toBe("");
        expect(passwordInputElement.value).toBe("");
    });
});
