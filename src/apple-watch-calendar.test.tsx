import React from "react";
import { render } from "@testing-library/react";

const Component = () => <div>batata</div>;

describe("Apple Watch Calendar", () => {
  it("Passes the test", () => {
    const { getByText } = render(<Component />);

    expect(getByText(/batata/gi)).toBeVisible();
  });
});
