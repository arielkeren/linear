# Linear

Web application for graphing linear functions.

## Live Demo

Try it here: [https://graphlinear.netlify.app](https://graphlinear.netlify.app)

## Features

- Graph linear functions using simple equations in the form of $y=mx+b$.
- Supports having multiple graphs rendered at once.
- Toggle the visibility of graphs.
- Change a graph's color.
- Modify a graph's line thickness.
- Calculate the equation of a graph by providing the program with 2 of the following: slope, $y$-intercept, a point, another point.
- Move around the coordinate plane by dragging on the plane with the mouse, or by pressing and holding the arrow buttons at the top right of the screen.
- Reset to $(0,0)$ being the center of the screen by pressing the home button.
- Zoom in and out of the coordinate plane using the mouse wheel, or by pressing and holding the `+` and `-` buttons at the top right of the screen.
- Reset to the default zoom by pressing the magnifying glass button.
- Numbers appear uniformly on the $x$-axis and on the $y$-axis depending on the amount of zoom.

## How It Works

To graph a linear function, the program uses a long enough `div` and translates it up or down, according to the $y$-intercept of the graph, given by $b$'s value in the general form of $y=mx+b$. After that, all that is left is to fit the line to the slope. This is done by rotating the line by an angle $θ$ given by the formula $θ=arctan(m)$, where $m$ is the slope of the line in the general form of $y=mx+b$.

## Instructions

- Clone this repository.
  ```bash
  git clone https://github.com/arielkeren/linear.git
  ```
- Run the development server.
  ```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  ```
- Open [http://localhost:3000](http://localhost:3000) on your browser.
