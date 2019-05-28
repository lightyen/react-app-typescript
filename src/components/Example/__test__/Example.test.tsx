import React from "react"
import Jest from "jest"
import { shallow } from "enzyme"

// Component
import { Example } from "../Example"

test("Test my button", () => {
    const button = shallow(<Example content="helloworld" />)
    expect(button.text()).toEqual("helloworld")
})
