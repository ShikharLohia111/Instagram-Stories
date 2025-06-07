import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import App from "./App";

jest.mock("./assets/story1.jpg", () => "story1.jpg");
jest.mock("./assets/story2.jpg", () => "story2.jpg");
jest.mock("./assets/story3.jpg", () => "story3.jpg");
jest.useFakeTimers();

describe("Instagram stories dashboard", () => {
  it("renders the dashboard title", () => {
    render(<App />);
    expect(screen.getByText("Instagram Stories")).toBeInTheDocument();
  });

  it("Shows Thumbnails", async () => {
    render(<App />);
    expect(await screen.findByTestId("thumbnail-0")).toBeInTheDocument();
    expect(screen.getByTestId("thumbnail-1")).toBeInTheDocument();
    expect(screen.getByTestId("thumbnail-2")).toBeInTheDocument();
  });
})

describe("Instgram stories story window", () => {
  it("opens viewer for Shikhar", async () => {
    render(<App />);
    fireEvent.click(await screen.findByTestId("thumbnail-1"));
    expect(await screen.findByTestId("viewer-header")).toHaveTextContent("Shikhar");
  });

  it("automatically advances to next story after 5 seconds", async () => {
    render(<App />);
    fireEvent.click(await screen.findByTestId("thumbnail-1")); 

    expect(await screen.findByTestId("viewer-header")).toHaveTextContent("Shikhar");

    act(() => {
      jest.advanceTimersByTime(5000); 
    });

    expect(await screen.findByTestId("viewer-header")).toHaveTextContent("Shikhar");
  });

  it("navigates stories by tapping left and right", async () => {
    render(<App />);
    fireEvent.click(await screen.findByTestId("thumbnail-1")); 

    fireEvent.click(screen.getByTestId("right-tap"));
    fireEvent.click(screen.getByTestId("left-tap"));

    expect(screen.getByTestId("viewer-header")).toHaveTextContent("Shikhar");
  });
  it("opens viewer for Krish, then closes", async () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("thumbnail-2"));
    expect(await screen.findByTestId("viewer-header")).toHaveTextContent("Krish");

    fireEvent.click(screen.getByRole("button", { name: "×" }));

    await waitFor(() =>
      expect(screen.queryByTestId("viewer-header")).not.toBeInTheDocument()
    );
  });
  });

  describe("Full user story flow test", () => {
  it("Renders app, opens a story, auto advances, navigates, and closes", async () => {
    render(<App />);

    const thumbnail = await screen.findByTestId("thumbnail-1");
    fireEvent.click(thumbnail);

    const viewer = await screen.findByTestId("viewer-header");
    expect(viewer).toBeInTheDocument();
    expect(viewer).toHaveTextContent("Shikhar");

    act(() => {
      jest.advanceTimersByTime(5500);
    });
    expect(screen.getByTestId("viewer-header")).toHaveTextContent("Shikhar");

    //required to handle the animation transtion time lag as well
    fireEvent.click(screen.getByTestId("right-tap"));
        act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(screen.getByTestId("viewer-header")).toHaveTextContent("Krish");

    //required to handle the animation transtion time lag as well
    fireEvent.click(screen.getByTestId("left-tap"));
        act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(screen.getByTestId("viewer-header")).toHaveTextContent("Shikhar");

    fireEvent.click(screen.getByRole("button", { name: "×" }));

    expect(screen.queryByTestId("viewer-header")).not.toBeInTheDocument();
  });
});
