# My Awesome Cohort Tracker


## Todo

✅ routes
✅ main page showing all cohorts
  - cohort create/edit modal
- add login/splash page
- finish sidebar styles
- finish cell styles
- finish filters styles

## Backlog

- on click of cell:
  - autocomplete input for the projects/labs/etc.
- styling
  - finalize color scheme
  - update grid styles
  - update typography
    - choose font schema
    - update cell font-sizes
    - establish global weights
✅ ceate cohort (page)
✅ create roster from CSV
- add hide attribute on students table
❌ add sort by most recent pairing
✅ update cohort page
  ✅ update student (page?)
  ✅ create student modal
- Add Update for activity(?)
- reset all onClick outside of cells
- reset all onClick of Flatiron logo //
- add test suite
- refactor to Node/Express backend?
- add auth

## DONE

✅ refactor to Redux
✅ toggle Search Activities and Create New. When searching, Create New should display. When creating, Search Activities should display, but not at the same time.
✅ refactor component heirarchy
✅ add header
✅ add dates to activities (pairs?)
❌ add sort by most recent pairing
✅ style sidebar
✅ style filters
✅ if it's a three person pair, put below the pairing "with... so and so"
✅ convert css to scss
✅ add gradient to the pairings based on frequency
✅ add color wheel to allow users to choose their own colors
✅ separate create activity from create group
✅ add search to filters
✅ add filter by mod
✅ update create/update user workflow
✅ refactor component heirarchy
✅ plan out main view wireframes]
✅ add group attributes to new group form
✅ update a group
✅ delete a group
✅ group rows by sections
✅ select the two students in the form
✅ display all pairings the students have had
✅ auto sort by Mod
✅ filter by category
✅ create form to create a new activity with activity attributes
✅ Filter by category
✅ Filter by mod

## QA Testing Feedback

### Round 1

✅ highlighted students when there is no active student bug
✅ actiive group only clears when update or back button is clicked, but will not reset when there are new active students.
✅ add label next to activities icons
✅ project cell colors should be invers to the selected theme so it stands out

### Round 2

- clear filters when a new group is selected (?)
✅ category for activity create form should be a dropdown
✅ onHover of group, popup to the left for a mini Group Show display
  ✅ show date, notes, students, bad pairing --> currently this info is only visible in the group edit view
✅ show icon of bad pairs in both the cell and group list
✅ search/create activity header in the sidebar component
✅ dividers for the sidebar
✅ Header component with the cohort's info (name, batch)
✅ search results for activities may want to include what module the activity is for as well as the name

### Redux Refactor

- Actions
  - Async
    - GET_STUDENTS
    - GET_GROUPS
    - GET_ACTIVITIES
    - CREATE_GROUP
    - UPDATE_GROUP
    - DELETE_GROUP
  - CLICK_CELL
  - SUBMIT_FORM (?)
  - SELECT_ACTIVITY (?)
  - SELECT_GROUP (?)
  - TOGGLE_ACTIVITY_FORM
  - TOGGLE_GROUP_FORM
  - UPDATE_SEARCHTERM (?)
