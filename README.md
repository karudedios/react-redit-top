(I sort of made a typo on `reddit` on the repo name please don't pay too much attention to that :sweat_smile:)

## How to Run

- Ensure you're running the same version from the `.nvmrc` of Node
- Run `npm i` or `yarn` to install all dependencies
- Run `npm run watch` or `yarn watch` to run webpack dev server
- Enter `http://localhost:8080` or where the console points you at from the output of `webpack-dev-server` to view the application running

## Features

Each entry displays:

    - Title (at its full length, so take this into account when sizing your cells)
    - Author
    - entry date, following a format like “x hours ago”
    - A thumbnail for those who have a picture.
    - Number of comments
    - Unread status

~In addition, for those having a picture (besides the thumbnail), please allow the user to tap on the thumbnail to be sent to the full sized picture.~

## What's Included
    - App state-preservation/restoration
    - Indicator of unread/read post (updated status, after post it’s selected)
    - Dismiss Post Button (remove the cell from list. Animations required)
    - Support split layout (left side: all posts / right side: detail post)
    - Responsive design

## Comments:

Each Item on the Sidebar can be Dismissed by hitting the `&times;` or by swiping to either the left or the right.

Ended up going slightly over 5 hours between pauses, should've been around 5h 25m approximately, Reddit api was not integrated as I failed to realize all endpoints require OAuth, and by the time I noticed integrating it into what I had built thus far wasn't possible, unless I sacrificed the rest of the missing UI so I decided to continue using `static` data with the same structure, so in the future if ever retaken the API can be seamlessly integrated.

Displaying of all Preview Images was something I was unable to complete, as I prioritized the rest of the UI over the preview capabilities which I intended to have either as a Slider or a Lightbox, but time didn't allow for either.
