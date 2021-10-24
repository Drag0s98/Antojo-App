import React from "react";
import { shallow } from "enzyme";
import Chat from "./Chat";

describe("Chat", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Chat />);
    expect(wrapper).toMatchSnapshot();
  });
});
