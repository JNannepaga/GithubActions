import React from "react";
import {Button} from "./Button";
import renderer from "react-test-renderer";

describe("Components",()=>{
    describe("Atoms",()=>{
        describe("Button",()=>{
            it("matches snapshot",()=>{
               const wrapper = renderer.create(<Button/>).toJSON();
               expect(wrapper).toMatchSnapshot();
            })
        })
    })
})