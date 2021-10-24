import React from "react";
import { shallow } from "enzyme";
import Agregar from "./Agregar";

describe("Agregar", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Agregar />);
    expect(wrapper).toMatchSnapshot();
  });
});
