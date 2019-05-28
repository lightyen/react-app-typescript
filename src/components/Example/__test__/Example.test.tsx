import React from "react"
import Jest from "jest"
import { shallow } from "enzyme"

// Component
import { Example, ExampleFC } from "../Example"

test("Test my button", () => {
    const button0 = shallow(<Example content="hehehe" />)
    expect(button0.text()).toBe("hehehe")
    const button1 = shallow(<ExampleFC onClick={() => {}} />)
    button1.simulate("click")
    expect(button1.text()).toBe("helloworld")
})
