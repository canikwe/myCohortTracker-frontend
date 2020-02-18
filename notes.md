# Todo

- on click of cell:
  - select the two students in the form
  - display all pairings the students have had
    - if it's a three person pair, put below the pairing "with... so and so"
  - display a dropdown to add another student to the group
  - autocomplete input for the projects/labs/etc.
- convert css to scss
- add gradient to the pairings based on frequency
- add color wheel to allow users to choose their own colors?
- Filter by category
- Filter by mod

```ruby
class Pair < ApplicationRecord
  belongs_to :first_student, class_name: :Student, foreign_key: 's1_id'
  belongs_to :second_student, class_name: :Student, foreign_key: 's2_id'
end

```
