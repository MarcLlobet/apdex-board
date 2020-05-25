# apdex-board
This application shows a list of applications running on every host according on the data we have.

## Stack
Fully developed in JS without fameworks.
The libraries that are installed are only used for generating the bundle and development purposes.

## Algorithm
In order to do that a Counter Sort algorithm is applied which is at worst case O(n+k), being n the number of elements and k the maximum value.
The advantatge of this algorithm is not a comparison sort, so adds less complexity.

## State manager
State manager is based on the flux model.
Service file has all the data and logic in order to provide data.
Store is listenning to the service file and at the same time being listened by the `app` (the view).
`decrementSortByApdex` is a generator function that yields 3 times the result in order to satisfy this case scenario. First time with 5 apps by host, the 25, and the all of them.
