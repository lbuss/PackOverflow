User.create!([
  {username: "Guest 74221", email: "email@email.com", password_digest: "$2a$10$kNJZWkGh6CEmLJhjBsIAqOtdCgEXMI9m59GjUuqcvB0aRgElvKoQq", session_token: "_JmjwpGzimrVkl7hurwbCg", gravatar_url: nil, guest: true},
  {username: "Tr3kker", email: "trek@tmail.com", password_digest: "$2a$10$29aHfu2C3EaF2qGEUjNo8uCVl5zrgJK/nIfqvreMnVNf7vM3b8Vsq", session_token: "yhTEgMAhe9cDjrUPf4baew", gravatar_url: nil, guest: nil},
  {username: "SuperFoot", email: "SFoot@footmail.com", password_digest: "$2a$10$IrMWyAzQ522KePhHKL.BFeCYZSABkXjBtUVhLBiRu.veuFBAnsehm", session_token: "E_4yIC6xrJYcd00MPZZV0g", gravatar_url: nil, guest: nil},
  {username: "Hiker58", email: "hikeboy@hikemail.com", password_digest: "$2a$10$s5Qj9lCQ6J4ZQVIyTmP0AuFo5Z1cWvxoJ.mZdlWYaDo72UIH7mDB2", session_token: "zW7sQaair6_4gBPlZBB62A", gravatar_url: nil, guest: nil},
  {username: "sm4sh", email: "smush@tmail.com", password_digest: "$2a$10$Y2C23T6gPeSap2gxI9Yg..8UXmR7S3MavC4DsDU54.cQzoYSTOikK", session_token: "xxRd3wKibhd2jsimK8mmVA", gravatar_url: nil, guest: nil},
  {username: "Guest 96235", email: "email@email.com", password_digest: "$2a$10$aIvTsHXmGsja.u7Ir03eMO8SOUc.bHixcxL.SIzmJM.92jBmyB1S6", session_token: "G3VT3yOsWfebGnAW-SYU4w", gravatar_url: nil, guest: true}
])
Question.create!([
  {title: "Hiking Shoes for Unevenly Sized Feet?", body: "So, I have one foot that is much larger than the other. I love the outdoors, but hiking for too long gets very uncomfortable. I guess I am looking for any suggestions anyone may have.", votes: nil, answer_id: nil, user_id: 3, vote_count: nil},
  {title: "Sharpening Tools in the Backcountry", body: "So, I was recently on a trip where my knife blade got really dull. What's the best way to make sure I can always have that razor edge?", votes: nil, answer_id: nil, user_id: 2, vote_count: 1},
  {title: "What are some good/trustworthy brands for water filters?", body: "Hey. I am planning on buying a new water filter soon. I will probably get a pump one as they are reliable but don't taste too bad (as opposed to the UV lamps which can break or the tablets which taste bad). Any recommendations?", votes: nil, answer_id: nil, user_id: 5, vote_count: nil},
  {title: "What is a good size for my first backpacking pack?", body: "Hello,<div><br></div><div>I was wondering what people recommended for a first backpacking pack. I will probably only do weekend trips with 1-3 other people to start out with, however I would like to be able to carry the essentials for a solo trip in case I would like to do that later.&nbsp;</div><div><br></div><div>Thanks!&nbsp;</div>", votes: nil, answer_id: nil, user_id: 2, vote_count: 2},
  {title: "What is the Best Season for Wildflowers?", body: "My friend said winter, but I'm not sure he was right. Does anyone have an idea?<div><br></div><div>Thanks,</div><div><br></div><div>-Hiker58</div>", votes: nil, answer_id: nil, user_id: 4, vote_count: 2}
])
Answer.create!([
  {body: "You can scrape it on rocks, i usually buy rocks from my local quarry for less than 10$ a pound.", votes: nil, question_id: 2, user_id: 4, vote_count: nil},
  {body: "40L for a weekend trip, scale up from there.", votes: nil, question_id: 1, user_id: 5, vote_count: nil},
  {body: "Spring is the best for flowers, winter is the best for dead things.", votes: nil, question_id: 4, user_id: 5, vote_count: nil}
])
Comment.create!([
  {body: "20L does it for me.", votes: nil, commentable_id: 1, commentable_type: "Question", user_id: 3, vote_count: nil}
])
Vote.create!([
  {value: 1, votable_id: 1, votable_type: "Question", user_id: 3},
  {value: 1, votable_id: 2, votable_type: "Question", user_id: 4},
  {value: 1, votable_id: 4, votable_type: "Question", user_id: 4},
  {value: 1, votable_id: 1, votable_type: "Question", user_id: 5},
  {value: 1, votable_id: 4, votable_type: "Question", user_id: 5}
])
