import React from "react"
import jest from "jest"
import { shallow } from "enzyme"
import "~/test/setupEnzyme"

// Component
import { Example } from "../Example"

test("Test my button", () => {
    const button = shallow(<Example content="helloworld" />)
    expect(button.text()).toEqual("helloworld")
})
