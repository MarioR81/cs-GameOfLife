# cs-GameOfLife

Rubric

Your simulation will receive a 2 when it satisfies the following:

    Display includes a text area that shows the current generation of cells being displayed
    Display includes a grid of cells, at least 25x25, that can be toggled to be alive or dead
    Display includes working buttons that start / stop the animation and clear the grid
    Algorithm to generate new generations of cells correctly implemented
    At least 3 features from Custom Features section successfully implemented
    Application includes a section outlining the rules to Conway's "Game of Life"



    What is the project?

The project was to write an algorithm, that has simple yet intreging rules thats actully very interesting, and a bit surpriseing.

    What problem does it solve?

it solves the curious thinking about building a machine that can copy itself, is that possible.  

    Exceptional difficulties and solutions, if any.
    TODO list/wishlist. What do you want to add to it if you have more time?

I had a couple small issues with variables being kept in the intedted format (strings to integer).  My largest hurdle was actully making the grid display correctly.


rules:
    Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.