import React from "react";
import { shallow } from "enzyme";
import Reset from "./Reset";

describe("Reset", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Reset />);
    expect(wrapper).toMatchSnapshot();
  });
});
