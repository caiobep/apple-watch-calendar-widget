import React from "react";
import { render } "@testing-library/react"
import { render as Component } from './apple-watch-calendar'

describe("Apple Watch Calendar", () => {
  it("Displays event names", () => {
        const mockCommandResult = `Work on Apple Watch Calendar Widget For macOS,16:00 - 17:00`;

    const { getByText } = render(<Component output={mockCommandResult} />);

    expect(getByText(/work on apple watch calendar widget for macOS/gi)).toBeVisible()
    expect(getByText(/16:00 - 17:00/gi)).toBeVisible()
  });
});
