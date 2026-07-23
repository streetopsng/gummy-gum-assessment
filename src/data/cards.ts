import { Card } from "./types";

export const CARDS: Card[] = [
  {
    "num": 1,
    "title": "The Trailer on Third Mainland",
    "act": "Act One: Arrival",
    "day": "Day 1, 7:40 AM",
    "connector": "Your first day at NovaCore Africa begins the way most Lagos mornings do — badly. A trailer has jack-knifed across Third Mainland Bridge and traffic has gone completely still. Onboarding starts in fifteen minutes, and there is no version of this where you arrive on time.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Call your manager Ada immediately, before you've even worked out a new arrival time.",
        "skill": "Verbal Communication Clarity",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 1
        },
        "quality": "Good",
        "reaction": "Ada picks up fast, her voice already mid-thought.\n\"Okay — how far are you? Just keep me posted.\""
      },
      {
        "label": "B",
        "text": "Send Ada a short message: stuck in bridge traffic, new ETA in 20 minutes.",
        "skill": "Digital & Remote Communication Etiquette",
        "meters": {
          "rep": 1,
          "inf": 0,
          "gro": 0,
          "imp": 2
        },
        "quality": "Best",
        "reaction": "Your phone buzzes back within a minute.\n\"Noted. Drive safe, see you soon.\""
      },
      {
        "label": "C",
        "text": "Say nothing for now and simply explain the delay when you arrive.",
        "skill": "Self-Discipline & Follow-Through",
        "meters": {
          "rep": -1,
          "inf": 0,
          "gro": 0,
          "imp": -1
        },
        "quality": "Poor",
        "reaction": "No reply comes, because none was sent.\nThe bridge inches forward, one car length at a time."
      },
      {
        "label": "D",
        "text": "Message HR instead, since they normally manage onboarding logistics.",
        "skill": "Organisational Savvy",
        "meters": {
          "rep": 0,
          "inf": -1,
          "gro": 0,
          "imp": -1
        },
        "quality": "Weak",
        "reaction": "HR's auto-reply lands first.\n\"Thanks for letting us know — please also loop in your line manager directly.\""
      }
    ],
    "transition": "The bridge finally clears. Fifty-five minutes after you were meant to start, you pull up outside a glass building in Victoria Island. Inside, the lobby is brighter than you expected, and a woman behind the front desk looks up as you approach."
  },
  {
    "num": 2,
    "title": "Lucia",
    "act": "Act One: Arrival",
    "day": "Day 1, 8:35 AM",
    "connector": "You arrive fifty-five minutes late, slightly out of breath. The ground floor is already busy. Lucia at reception is scrolling through a folder that clearly does not contain your name, and a small queue is forming behind you.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Ask Lucia, politely, who else might be able to help locate your file.",
        "skill": "Resourcefulness Under Constraint",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 2
        },
        "quality": "Best",
        "reaction": "Lucia picks up the desk phone without missing a beat.\n\"Let me try one more person.\""
      },
      {
        "label": "B",
        "text": "Wait quietly while Lucia keeps searching, even as the queue grows.",
        "skill": "Self-Discipline & Follow-Through",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "Lucia keeps flipping through the folder, murmuring names under her breath.\nThe queue behind you shifts and resettles."
      },
      {
        "label": "C",
        "text": "Call Ada again to explain that reception has lost your onboarding file.",
        "skill": "Time & Priority Management",
        "meters": {
          "rep": 0,
          "inf": -1,
          "gro": 0,
          "imp": 1
        },
        "quality": "Good",
        "reaction": "Ada answers on the second ring.\n\"Reception doesn't have you? Let me send someone down.\""
      },
      {
        "label": "D",
        "text": "Ask another employee walking past if they know where new-starter files are kept.",
        "skill": "Relationship & Network Building",
        "meters": {
          "rep": 0,
          "inf": 1,
          "gro": 0,
          "imp": 1
        },
        "quality": "Good",
        "reaction": "\"New starter? Try the lifts, third floor — someone'll sort you out,\" a man in a blue lanyard says without slowing down."
      }
    ],
    "transition": "Your file turns up eventually, tucked in the wrong folder. Lucia prints a visitor badge with your name spelled almost correctly and points you toward the lifts. Upstairs, someone shows you to a desk — a laptop, a login sheet, and not much else."
  },
  {
    "num": 3,
    "title": "The Empty Desk",
    "act": "Act One: Arrival",
    "day": "Day 1, 10:15 AM",
    "connector": "Your file eventually turns up. You're shown to a desk with a laptop, a login sheet, and nothing else. Ada, your manager, is in back-to-back meetings until noon. No one has told you what to do with the next ninety minutes.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Explore the company intranet and internal resources on your own.",
        "skill": "Self-Motivation & Initiative",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 2,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "A page titled \"Welcome to NovaCore\" loads slowly, half-finished but full of names you don't recognise yet."
      },
      {
        "label": "B",
        "text": "Walk around and introduce yourself to nearby colleagues.",
        "skill": "Relationship & Network Building",
        "meters": {
          "rep": 0,
          "inf": 2,
          "gro": 0,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "\"Oh, you're the new person,\" someone says, already reaching to shake your hand. \"I'm Chika. Ops team, over there.\""
      },
      {
        "label": "C",
        "text": "Write down a list of questions to ask Ada the moment she's free.",
        "skill": "Goal Setting & Planning",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 1,
          "imp": 1
        },
        "quality": "Good",
        "reaction": "The list grows longer than expected — four questions become six."
      },
      {
        "label": "D",
        "text": "Wait at your desk until someone comes to tell you what to do.",
        "skill": "Self-Motivation & Initiative",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": -2,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "The clock on the wall ticks past eleven, then eleven-thirty. The laptop screen dims itself twice from inactivity."
      }
    ],
    "transition": "Just after noon, Ada finally appears — moving fast, already apologising for the wait. \"Sorry, sorry — back to back all morning. Let's get you set up properly.\" She taps a few things into her phone, and your screen buzzes with a notification."
  },
  {
    "num": 4,
    "title": "The WhatsApp Group",
    "act": "Act One: Arrival",
    "day": "Day 1, 2:00 PM",
    "connector": "Just after lunch, Ada finally surfaces and adds you to the Operations Team WhatsApp group. There are already one hundred and twenty-seven unread messages, and a conversation is actively moving without you.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Post a short introduction so the team knows who just joined.",
        "skill": "Digital & Remote Communication Etiquette",
        "meters": {
          "rep": 0,
          "inf": 2,
          "gro": 0,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "Three reactions land under your message within a minute. \"Welcome o!\" someone named Chika replies."
      },
      {
        "label": "B",
        "text": "Read back through the history quietly before saying anything.",
        "skill": "Adaptability & Flexibility",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 1,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "By the time you reach the top of the thread, you understand who Uche is, and why everyone is quietly annoyed at the printer on the third floor."
      },
      {
        "label": "C",
        "text": "Jump straight into the live conversation with an opinion.",
        "skill": "Reading the Room",
        "meters": {
          "rep": 0,
          "inf": -1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "A laughing emoji comes back, from someone whose name you don't recognise yet."
      },
      {
        "label": "D",
        "text": "Message a couple of people privately instead of posting to the group.",
        "skill": "Relationship & Network Building",
        "meters": {
          "rep": 0,
          "inf": 1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "\"Hey! Welcome, let me know if you need anything,\" comes back almost instantly."
      }
    ],
    "transition": "The group chat settles into its usual rhythm. By Wednesday, the pleasantries are over — Ada drops three documents on your desk without much ceremony: a client brief, a competitor summary, last quarter's numbers."
  },
  {
    "num": 5,
    "title": "The Assignment",
    "act": "Act Two: First Work",
    "day": "Day 3",
    "connector": "By Wednesday the pleasantries are over. Ada drops three dense documents on your desk — a client brief, a competitor summary, and last quarter's numbers — and asks for your observations before close of business.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Read all three documents in full, start to finish, in the order given.",
        "skill": "Attention to Detail",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 1
        },
        "quality": "Good",
        "reaction": "The office empties out around you as you work through the last document, page by page."
      },
      {
        "label": "B",
        "text": "Skim all three first, then go deep on the sections most relevant to the brief.",
        "skill": "Prioritisation Under Pressure",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 2
        },
        "quality": "Best",
        "reaction": "You build a short list of the sections that actually matter, and start there."
      },
      {
        "label": "C",
        "text": "Ask Ada what she specifically wants you to look for before starting.",
        "skill": "Working with Ambiguity",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 1,
          "imp": 1
        },
        "quality": "Good",
        "reaction": "Ada glances up from her screen. \"Honestly? I mainly want to know if the numbers still support the pitch. Start there.\""
      },
      {
        "label": "D",
        "text": "Start, then wait for further clarification before going further.",
        "skill": "Self-Motivation & Initiative",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": -1
        },
        "quality": "Poor",
        "reaction": "The cursor blinks on an empty document for longer than feels comfortable."
      }
    ],
    "transition": "The deadline draws close enough to feel it. From the desk beside you, Tunde leans back in his chair, watching you work."
  },
  {
    "num": 6,
    "title": "Tunde's Shortcut",
    "act": "Act Two: First Work",
    "day": "Day 3, 4:30 PM",
    "connector": "With the deadline close, Tunde — a colleague two desks over — leans in with a suggestion: just reuse last month's report and change the numbers, instead of reading everything Ada gave you.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Thank Tunde, but do the work properly using this week's actual documents.",
        "skill": "Integrity & Ethical Judgement",
        "meters": {
          "rep": 2,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "Tunde shrugs. \"Suit yourself,\" he says, and turns back to his own screen."
      },
      {
        "label": "B",
        "text": "Use Tunde's shortcut to save time, since the deadline is close.",
        "skill": "Integrity & Ethical Judgement",
        "meters": {
          "rep": -2,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "\"See,\" Tunde grins, \"that's how we survive deadlines here.\" The report comes together fast."
      },
      {
        "label": "C",
        "text": "Quickly compare last month's report against this week's numbers to see what's changed.",
        "skill": "Critical Thinking",
        "meters": {
          "rep": 1,
          "inf": 0,
          "gro": 0,
          "imp": 1
        },
        "quality": "Good",
        "reaction": "Half the figures match. The other half don't — and now you know exactly where the difference is."
      },
      {
        "label": "D",
        "text": "Ask Ada directly whether reusing the old report would be acceptable.",
        "skill": "Managing Up",
        "meters": {
          "rep": 1,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "Ada considers it for a second longer than expected. \"Let's not. Use this week's numbers.\""
      }
    ],
    "transition": "The report goes out before the day is done. The next morning, it's back on your desk — Ada's handwriting filling the margins, more red than black."
  },
  {
    "num": 7,
    "title": "The Red Markup",
    "act": "Act Two: First Work",
    "day": "Day 4",
    "connector": "Ada returns your first piece of work covered in comments and corrections — more red than black. It's your first real feedback at NovaCore, and it stings a little more than you expected.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Read every comment carefully and note the patterns before responding.",
        "skill": "Giving and Receiving Feedback",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 2,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "A pattern starts to surface by the third page — the same note, worded differently, three separate times."
      },
      {
        "label": "B",
        "text": "Make the edits quietly without discussing them further.",
        "skill": "Giving and Receiving Feedback",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "Twenty minutes later, the document looks cleaner. Ada hasn't said anything else about it."
      },
      {
        "label": "C",
        "text": "Explain to Ada the reasoning behind the choices she flagged.",
        "skill": "Self-Awareness",
        "meters": {
          "rep": 0,
          "inf": -1,
          "gro": -1,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "Ada listens, arms folded, until you finish. \"Okay. Let's talk about a couple of these.\""
      },
      {
        "label": "D",
        "text": "Ask two peers what they think of Ada's comments before acting on them.",
        "skill": "Self-Awareness",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "Chika and another colleague read the same comments and land on two different opinions."
      }
    ],
    "transition": "By Friday, you're pulled into your first team meeting — a slide deck already up on the screen, numbers scrolling past faster than you can double-check them."
  },
  {
    "num": 8,
    "title": "The Silent Meeting",
    "act": "Act Two: First Work",
    "day": "Day 5",
    "connector": "In your first team meeting, a number in the shared slide doesn't match the report you read yesterday. No one else in the room seems to notice, and the discussion is already moving on.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Raise it in the room, briefly and without making it a big moment.",
        "skill": "Respect for Hierarchy Balanced with Voice",
        "meters": {
          "rep": 0,
          "inf": 2,
          "gro": 0,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "\"Good catch,\" someone murmurs, already checking their own copy as a couple of heads turn toward the slide."
      },
      {
        "label": "B",
        "text": "Say nothing in the meeting and flag it to Ada privately afterward.",
        "skill": "Respect for Hierarchy Balanced with Voice",
        "meters": {
          "rep": 0,
          "inf": 1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "Ada listens, then makes a short note on her pad. \"Let me look into that.\""
      },
      {
        "label": "C",
        "text": "Stay quiet, assuming someone more senior would have caught it if it mattered.",
        "skill": "Respect for Hierarchy Balanced with Voice",
        "meters": {
          "rep": 0,
          "inf": -1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "The meeting moves on to the next slide, numbers and all."
      },
      {
        "label": "D",
        "text": "Ask a clarifying question about the number rather than stating it's wrong outright.",
        "skill": "Diplomacy & Tact",
        "meters": {
          "rep": 0,
          "inf": 1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "\"Sorry — is that figure from this month or last?\" Someone leans forward to check."
      }
    ],
    "transition": "The mismatch turns out to be real. Worse, the same report is due to go out to a client in twenty minutes — and right now, you seem to be the only one who's noticed."
  },
  {
    "num": 9,
    "title": "The Wrong Numbers",
    "act": "Act Two: First Work",
    "day": "Day 5, 3:40 PM",
    "connector": "The mismatch turns out to be real. Worse, it's in a report going to a client in twenty minutes, and you're the only one who's clocked it.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Escalate to Ada immediately, even though it interrupts her.",
        "skill": "Personal Accountability",
        "meters": {
          "rep": 2,
          "inf": 0,
          "gro": 0,
          "imp": 1
        },
        "quality": "Best",
        "reaction": "Ada's chair scrapes back before you've even finished the sentence. \"Show me. Now.\""
      },
      {
        "label": "B",
        "text": "Fix the figure yourself quickly and send the corrected version.",
        "skill": "Attention to Detail",
        "meters": {
          "rep": -1,
          "inf": 0,
          "gro": 0,
          "imp": 1
        },
        "quality": "Weak",
        "reaction": "The corrected file goes out with four minutes to spare, no one else the wiser."
      },
      {
        "label": "C",
        "text": "Investigate further to confirm the error before saying anything.",
        "skill": "Root Cause Analysis",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": -1
        },
        "quality": "Poor",
        "reaction": "The clock reads 3:59 by the time you're finally certain."
      },
      {
        "label": "D",
        "text": "Let it go, since the deadline has nearly passed and it's not your report.",
        "skill": "Integrity & Ethical Judgement",
        "meters": {
          "rep": -2,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "The email marked \"Sent\" sits at the top of the outbox, numbers and all."
      }
    ],
    "transition": "Two weeks pass without incident. Then you're pulled into your first client presentation — Ada mid-sentence, slides on the wall — when the power cuts without warning."
  },
  {
    "num": 10,
    "title": "NEPA Happens",
    "act": "Act Three: Operating Alone",
    "day": "Week 2",
    "connector": "Two weeks in, you're pulled into your first client presentation. Ada is mid-sentence when the power cuts, the generator fails to kick in, and the room goes dark and silent.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Suggest switching to printed handouts or phone screens while power is restored.",
        "skill": "Resourcefulness Under Constraint",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 2
        },
        "quality": "Best",
        "reaction": "Someone digs out a stack of printouts from last week's meeting. \"This'll do for now,\" Ada mutters, already handing them round."
      },
      {
        "label": "B",
        "text": "Wait quietly for facilities or Ada to decide the next step.",
        "skill": "Resourcefulness Under Constraint",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": -1
        },
        "quality": "Poor",
        "reaction": "The room sits in half-dark, a dozen phone screens the only light."
      },
      {
        "label": "C",
        "text": "Call facilities directly to find out how long the outage will last.",
        "skill": "Problem Solving",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 1
        },
        "quality": "Good",
        "reaction": "\"Ten minutes, ten minutes,\" the voice on the line promises, in the tone that usually means longer."
      },
      {
        "label": "D",
        "text": "Reassure the client directly that the meeting will continue shortly.",
        "skill": "Customer Orientation",
        "meters": {
          "rep": 0,
          "inf": 1,
          "gro": 0,
          "imp": 1
        },
        "quality": "Good",
        "reaction": "\"No wahala,\" the client's voice says, tinny through the speaker. \"Take your time.\""
      }
    ],
    "transition": "The lights come back before the client's patience runs out. A week later, a new task lands on your desk — numbers that live entirely with the Finance team, three floors down."
  },
  {
    "num": 11,
    "title": "Data Roadblock",
    "act": "Act Three: Operating Alone",
    "day": "Week 3",
    "connector": "For a new analysis, you need numbers that sit with the Finance team. Your first two requests have gone unanswered for four days, and your own deadline is now at risk.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Walk over, introduce yourself properly, and ask what would help them prioritise your request.",
        "skill": "Relationship & Network Building",
        "meters": {
          "rep": 0,
          "inf": 2,
          "gro": 0,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "\"Ah, you're the one Ada mentioned,\" someone on the Finance floor says, already pulling up a spreadsheet. \"Give me an hour.\""
      },
      {
        "label": "B",
        "text": "Escalate the delay to Ada and ask her to intervene.",
        "skill": "Managing Up",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 1
        },
        "quality": "Good",
        "reaction": "Ada sends one email. A reply lands from Finance within the hour."
      },
      {
        "label": "C",
        "text": "Keep waiting, assuming the data will arrive eventually.",
        "skill": "Cross-Departmental Awareness",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": -2
        },
        "quality": "Poor",
        "reaction": "Day five arrives. Your inbox stays exactly as empty as before."
      },
      {
        "label": "D",
        "text": "Look for a reasonable alternative data source to keep moving in the meantime.",
        "skill": "Resourcefulness Under Constraint",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 1
        },
        "quality": "Good",
        "reaction": "The workaround numbers aren't perfect, but they're something to build the analysis around."
      }
    ],
    "transition": "The week rounds out quietly enough — until Friday evening, when a new request lands in your inbox at 5:45pm, marked urgent, due first thing Monday."
  },
  {
    "num": 12,
    "title": "Friday 5:45 PM",
    "act": "Act Three: Operating Alone",
    "day": "Week 3, Friday",
    "connector": "It's almost 6pm on a Friday when an urgent request lands in your inbox, due first thing Monday. Your weekend plans, and everyone else's, were already set.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Stay and complete the whole task tonight rather than let it linger.",
        "skill": "Self-Discipline & Follow-Through",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 1
        },
        "quality": "Good",
        "reaction": "The office empties out around you as the task slowly takes shape, one section at a time."
      },
      {
        "label": "B",
        "text": "Message the requester to confirm scope and negotiate a realistic Monday deadline.",
        "skill": "Managing Up",
        "meters": {
          "rep": 0,
          "inf": 1,
          "gro": 0,
          "imp": 2
        },
        "quality": "Best",
        "reaction": "A reply lands within minutes: \"Monday 10am is fine — thanks for checking.\""
      },
      {
        "label": "C",
        "text": "Do a partial version tonight and finish the rest first thing Monday.",
        "skill": "Time & Priority Management",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "A half-finished draft sits saved for Monday, one more thing to remember."
      },
      {
        "label": "D",
        "text": "Leave it until Monday morning without flagging anything.",
        "skill": "Self-Discipline & Follow-Through",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": -2
        },
        "quality": "Poor",
        "reaction": "Your phone goes quiet. The weekend starts, uninterrupted."
      }
    ],
    "transition": "Monday brings a team meeting, and with it, an idea for improving client onboarding — an idea that sounds strangely familiar, coming from Femi's mouth instead of yours."
  },
  {
    "num": 13,
    "title": "Femi's Big Idea",
    "act": "Act Three: Operating Alone",
    "day": "Week 4",
    "connector": "In a team meeting, Femi presents an idea for improving the client onboarding process — the exact idea you mentioned to him over lunch last week. He gets visible praise for it, and doesn't mention where it came from.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Speak to Femi privately afterward to address it directly, one to one.",
        "skill": "Diplomacy & Tact",
        "meters": {
          "rep": 1,
          "inf": 1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "Femi goes quiet for a second. \"Fair point,\" he says eventually. \"I probably should've mentioned where that came from.\""
      },
      {
        "label": "B",
        "text": "Correct the record in the room, right when it happens.",
        "skill": "Political Intelligence",
        "meters": {
          "rep": 0,
          "inf": -1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "The room goes briefly, noticeably still. Femi's smile tightens at the edges."
      },
      {
        "label": "C",
        "text": "Let it go and focus on your own visible contributions going forward.",
        "skill": "Career Navigation & Self-Advocacy",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "The meeting moves on. Femi's idea — your idea — is now simply \"the plan.\""
      },
      {
        "label": "D",
        "text": "Mention it to Ada afterward, framed factually rather than as a complaint.",
        "skill": "Political Intelligence",
        "meters": {
          "rep": 0,
          "inf": 1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "Ada listens without much reaction in the moment. \"Noted,\" she says, and moves to the next item."
      }
    ],
    "transition": "The project moves forward, onboarding fix and all. A few weeks in, you notice one teammate has now missed three deadlines in a row — and the rest of the team is quietly absorbing the slack without saying anything."
  },
  {
    "num": 14,
    "title": "The Weak Link",
    "act": "Act Three: Operating Alone",
    "day": "Week 4",
    "connector": "A teammate on your project has now missed three deadlines in a row, and the rest of the team is quietly absorbing the slack without saying anything to him directly.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Talk to him directly and privately to understand what's going on.",
        "skill": "Difficult Conversations & Conflict Communication",
        "meters": {
          "rep": 0,
          "inf": 2,
          "gro": 0,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "He exhales, like he's been waiting for someone to actually ask. \"It's been a lot at home, honestly.\""
      },
      {
        "label": "B",
        "text": "Escalate the pattern to Ada without speaking to him first.",
        "skill": "Difficult Conversations & Conflict Communication",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "\"I'll keep an eye on it,\" Ada says. \"Keep noting the pattern for me.\""
      },
      {
        "label": "C",
        "text": "Keep quietly absorbing the extra work like everyone else.",
        "skill": "Accountability for Results",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": -1
        },
        "quality": "Poor",
        "reaction": "The extra tasks land on your desk again, the way they have most of the month."
      },
      {
        "label": "D",
        "text": "Confront him publicly in the next team check-in.",
        "skill": "Diplomacy & Tact",
        "meters": {
          "rep": 0,
          "inf": -2,
          "gro": 0,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "The room goes quiet in a different way than usual. He doesn't say much back."
      }
    ],
    "transition": "By your second month, you're trusted with more cross-functional work — which comes with new complications. One afternoon, Mr Bello from Commercial and Ada both need something from you, both call it urgent, and both would take the whole afternoon."
  },
  {
    "num": 15,
    "title": "Two Bosses",
    "act": "Act Four: The Politics of the Middle",
    "day": "Month 2",
    "connector": "You're now trusted with cross-functional work, which means new complications. Mr Bello from Commercial and Ada both need something from you today, both call it urgent, and both tasks would take the whole afternoon.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Ask both directly which task takes priority, and be transparent about the conflict.",
        "skill": "Managing Up",
        "meters": {
          "rep": 0,
          "inf": 2,
          "gro": 0,
          "imp": 1
        },
        "quality": "Best",
        "reaction": "A short thread between Mr Bello and Ada resolves it within minutes. \"Ada's first,\" comes the reply. \"Mine can wait till tomorrow.\""
      },
      {
        "label": "B",
        "text": "Do Mr Bello's task first, since he's more senior.",
        "skill": "Political Intelligence",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "Ada's task sits untouched, growing more overdue with each hour that passes."
      },
      {
        "label": "C",
        "text": "Do Ada's task first, since she's your direct manager.",
        "skill": "Managing Up",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "Mr Bello's assistant calls once, then again, twenty minutes later."
      },
      {
        "label": "D",
        "text": "Delay both slightly while you work out privately which matters more.",
        "skill": "Decision Making Under Uncertainty",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": -1
        },
        "quality": "Poor",
        "reaction": "Two unread messages sit at the top of your inbox as the afternoon slips by."
      }
    ],
    "transition": "Lunchtime arrives regardless. At the table, the conversation drifts toward a colleague who isn't there to hear it."
  },
  {
    "num": 16,
    "title": "Lunch Table Politics",
    "act": "Act Four: The Politics of the Middle",
    "day": "Month 2",
    "connector": "At lunch, the conversation at your table drifts into pointed gossip about a colleague who isn't there to respond. A couple of people look at you, waiting to see if you'll join in.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Gently steer the conversation toward something else.",
        "skill": "Diplomacy & Tact",
        "meters": {
          "rep": 2,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "Someone laughs and starts talking about the weekend's football instead. The moment passes easily."
      },
      {
        "label": "B",
        "text": "Listen without adding anything to the conversation.",
        "skill": "Integrity & Ethical Judgement",
        "meters": {
          "rep": 1,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "The conversation moves on without much input from you either way."
      },
      {
        "label": "C",
        "text": "Join in, since it seems harmless and everyone else is doing it.",
        "skill": "Integrity & Ethical Judgement",
        "meters": {
          "rep": -2,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "The words are out before you've really thought about where they'll travel."
      },
      {
        "label": "D",
        "text": "Get up and leave the table without explanation.",
        "skill": "Diplomacy & Tact",
        "meters": {
          "rep": 0,
          "inf": -1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "Your chair scrapes back. The conversation continues, a little quieter, without you."
      }
    ],
    "transition": "That afternoon, in a planning session, the team settles on an approach fairly quickly — one you happen to have real evidence against."
  },
  {
    "num": 17,
    "title": "The Debate",
    "act": "Act Four: The Politics of the Middle",
    "day": "Month 2",
    "connector": "In a planning session, the team settles on an approach you genuinely think is wrong. You have evidence to support a different direction, but the discussion has already moved toward a decision.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Present your case clearly, with the evidence, before the decision is finalised.",
        "skill": "Critical Thinking",
        "meters": {
          "rep": 0,
          "inf": 1,
          "gro": 2,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "The room goes quiet for a moment, actually weighing it. \"Send me that data,\" Ada says."
      },
      {
        "label": "B",
        "text": "Accept the team's direction without raising your concern.",
        "skill": "Critical Thinking",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": -1,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "The plan moves forward exactly as it was before you spoke."
      },
      {
        "label": "C",
        "text": "Raise your concern with Ada privately after the meeting instead.",
        "skill": "Respect for Hierarchy Balanced with Voice",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "Ada listens, then nods slowly. \"Put it in writing, I'll raise it next round.\""
      },
      {
        "label": "D",
        "text": "Gather more supporting evidence first, before deciding whether to raise it at all.",
        "skill": "Judgement & Sound Reasoning",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 1,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "By the time you're ready to speak, the room has already moved on to the next item."
      }
    ],
    "transition": "The week winds down. As everyone packs up on Friday, the team turns toward you with an invitation you weren't expecting — their regular after-work hangout."
  },
  {
    "num": 18,
    "title": "Friday Hangout",
    "act": "Act Four: The Politics of the Middle",
    "day": "Month 2, Friday",
    "connector": "The team invites you to their regular Friday hangout after work — the first time you've been asked. You'd planned to head straight home.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Attend and stay for the evening.",
        "skill": "Team Bonding & Social Cohesion",
        "meters": {
          "rep": 0,
          "inf": 2,
          "gro": 0,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "Someone orders a second round of suya before you've even finished the first. The stories get better as the night goes on."
      },
      {
        "label": "B",
        "text": "Attend briefly, then head home earlier than the rest.",
        "skill": "Team Bonding & Social Cohesion",
        "meters": {
          "rep": 0,
          "inf": 1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "You wave goodbye from the door just as the stories are getting good."
      },
      {
        "label": "C",
        "text": "Decline politely, with a genuine reason.",
        "skill": "Work-Life Integration in a Communal Context",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "\"Next time, for sure,\" you say. The group chat fills with photos you'll see on Monday."
      },
      {
        "label": "D",
        "text": "Suggest meeting the group another time instead.",
        "skill": "Relationship & Network Building",
        "meters": {
          "rep": 0,
          "inf": 1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "\"Next week then,\" comes the reply, with a thumbs up."
      }
    ],
    "transition": "The following week brings your first real taste of the front line — a call transferred straight from support, a client already mid-sentence before you've finished introducing yourself."
  },
  {
    "num": 19,
    "title": "Angry Customer",
    "act": "Act Five: Facing the Client",
    "day": "Month 2",
    "connector": "You take a call transferred from support. The client on the line is shouting about a delayed delivery before you've even finished introducing yourself.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Let them finish, then calmly acknowledge what they're upset about.",
        "skill": "Active Listening",
        "meters": {
          "rep": 1,
          "inf": 0,
          "gro": 0,
          "imp": 2
        },
        "quality": "Best",
        "reaction": "\"Finally,\" the client mutters, the shouting running out of road, \"someone who's actually listening.\""
      },
      {
        "label": "B",
        "text": "Explain the delivery policy clearly and factually.",
        "skill": "Verbal Communication Clarity",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 1
        },
        "quality": "Good",
        "reaction": "The client's voice doesn't soften much, but it does slow down."
      },
      {
        "label": "C",
        "text": "Escalate the call immediately to a manager.",
        "skill": "Emotional Regulation",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": -1
        },
        "quality": "Weak",
        "reaction": "The call transfers with a soft click, the client's voice still rising on the other end."
      },
      {
        "label": "D",
        "text": "Offer a solution right away, before fully hearing them out.",
        "skill": "Service Recovery & Complaint Handling",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "There's a pause — the client caught slightly off guard by how fast the offer came."
      }
    ],
    "transition": "The complaint resolves itself, one way or another. A few weeks later, one of NovaCore's biggest clients calls — this time asking you, personally, for a favour that isn't exactly within policy."
  },
  {
    "num": 20,
    "title": "VIP Request",
    "act": "Act Five: Facing the Client",
    "day": "Month 2",
    "connector": "One of NovaCore's largest clients asks you, directly and personally, for an exception to a firm company policy. Saying no risks the relationship; saying yes sets a precedent.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Explore what's actually driving the request and look for a compliant alternative.",
        "skill": "Judgement & Sound Reasoning",
        "meters": {
          "rep": 1,
          "inf": 1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "The client's tone shifts, just slightly, once they realise you're actually trying to understand, not just refuse."
      },
      {
        "label": "B",
        "text": "Approve the exception yourself to protect the relationship.",
        "skill": "Integrity & Ethical Judgement",
        "meters": {
          "rep": -2,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "The email goes out. Somewhere, a policy document quietly gains a new footnote."
      },
      {
        "label": "C",
        "text": "Decline the request outright, citing policy.",
        "skill": "Diplomacy & Tact",
        "meters": {
          "rep": 0,
          "inf": -1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "\"I see,\" the client says, flatly, after a pause on the line."
      },
      {
        "label": "D",
        "text": "Seek approval from Ada before responding either way.",
        "skill": "Managing Up",
        "meters": {
          "rep": 1,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "Ada reads the message twice before typing anything back."
      }
    ],
    "transition": "The request resolves, one way or another, and the relationship survives it. Not long after, you're pulled into the middle of a disagreement between Marketing and Operations — both certain they're right, both waiting on you to referee."
  },
  {
    "num": 21,
    "title": "Stakeholder Battle",
    "act": "Act Five: Facing the Client",
    "day": "Month 3",
    "connector": "Marketing wants a client deliverable out this week. Operations says quality checks need another week. Both are adamant, and you're stuck coordinating between them.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Get both sides in a room and work toward an option that protects quality without missing the client entirely.",
        "skill": "Stakeholder Management",
        "meters": {
          "rep": 0,
          "inf": 2,
          "gro": 0,
          "imp": 1
        },
        "quality": "Best",
        "reaction": "Twenty minutes of talking past each other slowly turns into five minutes of actually listening."
      },
      {
        "label": "B",
        "text": "Side with Marketing's timeline, since the client is externally facing.",
        "skill": "Systems Thinking",
        "meters": {
          "rep": 0,
          "inf": -1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "A Slack message from Operations arrives within the hour: \"Can we talk about this?\""
      },
      {
        "label": "C",
        "text": "Escalate the conflict upward rather than trying to resolve it yourself.",
        "skill": "Consensus Building",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "The email thread grows to fourteen replies before anyone actually decides anything."
      },
      {
        "label": "D",
        "text": "Gather more specifics from both sides before proposing anything.",
        "skill": "Analytical & Data-Driven Thinking",
        "meters": {
          "rep": 0,
          "inf": 1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "Two documents land in your inbox. They don't agree with each other on a single figure."
      }
    ],
    "transition": "The deliverable ships, eventually, in one form or another. On the next client call, the client offers a compliment — aimed, mistakenly, at the colleague sitting next to you."
  },
  {
    "num": 22,
    "title": "The Praise",
    "act": "Act Five: Facing the Client",
    "day": "Month 3",
    "connector": "On a client call, the client specifically praises a colleague for analysis that was actually your work. Your colleague says nothing to correct them.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Say nothing on the call, then raise it with your colleague privately afterward.",
        "skill": "Diplomacy & Tact",
        "meters": {
          "rep": 1,
          "inf": 1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "Your colleague goes quiet for a second when you bring it up later, over coffee. \"Oh — I didn't even clock that. My bad.\""
      },
      {
        "label": "B",
        "text": "Correct the client politely, in the moment.",
        "skill": "Reading the Room",
        "meters": {
          "rep": 0,
          "inf": -1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "\"Ah, my mistake,\" the client says, unbothered, after a small pause on the line."
      },
      {
        "label": "C",
        "text": "Mention the mix-up to Ada afterward, factually.",
        "skill": "Career Navigation & Self-Advocacy",
        "meters": {
          "rep": 0,
          "inf": 1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "\"Thanks for flagging that,\" Ada says, and nothing more."
      },
      {
        "label": "D",
        "text": "Let it go entirely, on both fronts.",
        "skill": "Career Navigation & Self-Advocacy",
        "meters": {
          "rep": 0,
          "inf": -1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "The call recording sits in the shared drive afterward, praise and all."
      }
    ],
    "transition": "Weeks pass. You start noticing the same customer complaint resurface, three times now, always tracing back to the same clunky step in the process."
  },
  {
    "num": 23,
    "title": "Broken Process",
    "act": "Act Five: Facing the Client",
    "day": "Month 3",
    "connector": "You've now noticed the same customer complaint surface three weeks running — all tracing back to one clunky step in the process that nobody has fixed.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Put together a short case for fixing it and propose it to Ada.",
        "skill": "Process Improvement & Efficiency",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 1,
          "imp": 2
        },
        "quality": "Best",
        "reaction": "Ada reads the one-pager twice. \"This is good. Bring it to the team on Thursday.\""
      },
      {
        "label": "B",
        "text": "Gather more examples first to strengthen the case before proposing anything.",
        "skill": "Root Cause Analysis",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 1
        },
        "quality": "Good",
        "reaction": "Three more examples land in your notes by the end of the week."
      },
      {
        "label": "C",
        "text": "Leave it, since fixing processes isn't formally part of your role.",
        "skill": "Self-Motivation & Initiative",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": -2
        },
        "quality": "Poor",
        "reaction": "The same complaint resurfaces again the following Monday, right on schedule."
      },
      {
        "label": "D",
        "text": "Escalate it as a complaint rather than proposing a fix.",
        "skill": "Problem Solving",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "The ticket gets logged, filed, and joins a queue of similar ones."
      }
    ],
    "transition": "Not long after, a different kind of problem lands on your desk — a client's preferred delivery date, and the news that it simply isn't achievable."
  },
  {
    "num": 24,
    "title": "Difficult News",
    "act": "Act Five: Facing the Client",
    "day": "Month 3",
    "connector": "You have to tell a client something they will not want to hear — their preferred delivery date simply isn't achievable.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Call them directly and be transparent about the situation and the reasons.",
        "skill": "Difficult Conversations & Conflict Communication",
        "meters": {
          "rep": 2,
          "inf": 0,
          "gro": 0,
          "imp": 1
        },
        "quality": "Best",
        "reaction": "\"Okay,\" the client says eventually, after a long pause. \"Thanks for calling yourself, at least.\""
      },
      {
        "label": "B",
        "text": "Stick strictly to the facts, without much softening.",
        "skill": "Verbal Communication Clarity",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "The client asks two follow-up questions you hadn't quite prepared for."
      },
      {
        "label": "C",
        "text": "Send the news by email instead of a call.",
        "skill": "Written Communication & Business Writing",
        "meters": {
          "rep": -1,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "A read receipt comes back within a minute. No reply yet."
      },
      {
        "label": "D",
        "text": "Ask Ada to be the one to deliver the news.",
        "skill": "Personal Accountability",
        "meters": {
          "rep": -2,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "Ada takes the call. You catch only her half of it through the wall."
      }
    ],
    "transition": "A high-profile project launches across the company that week — one that drew on work you did earlier in the quarter. Your name, somehow, isn't anywhere on the list."
  },
  {
    "num": 25,
    "title": "Left Out",
    "act": "Act Six: Probation",
    "day": "Month 3",
    "connector": "A high-profile project launches across the company, and your name isn't anywhere on the list — despite work you did earlier in the quarter that fed directly into it.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Ask Ada directly for honest feedback on why you weren't included.",
        "skill": "Career Navigation & Self-Advocacy",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 2,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "Ada pauses, actually considering the question instead of brushing past it. \"Okay — let's talk about that properly.\""
      },
      {
        "label": "B",
        "text": "Keep your focus on your current work without raising it.",
        "skill": "Resilience & Grit",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "The project launches down the hall, loud and celebratory, without you."
      },
      {
        "label": "C",
        "text": "Express frustration openly to the team.",
        "skill": "Emotional Regulation",
        "meters": {
          "rep": 0,
          "inf": -1,
          "gro": -1,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "The room gets a little quieter after you speak. Nobody quite meets your eye."
      },
      {
        "label": "D",
        "text": "Start quietly looking for opportunities elsewhere.",
        "skill": "Resilience & Grit",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": -2,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "A message from a recruiter sits unopened in your personal inbox that evening."
      }
    ],
    "transition": "Soon after, your probation review appears on the calendar. Ada is, as always, direct."
  },
  {
    "num": 26,
    "title": "Tough Feedback",
    "act": "Act Six: Probation",
    "day": "Month 3",
    "connector": "Your probation review arrives. Ada is direct: alongside real strengths, there are gaps you'll need to close before the role becomes permanent.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Listen fully first, then ask for specific examples of the gaps she's describing.",
        "skill": "Giving and Receiving Feedback",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 2,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "Ada pulls up two specific instances, more prepared than expected. \"Let's go through them.\""
      },
      {
        "label": "B",
        "text": "Defend the decisions behind the areas she's raising.",
        "skill": "Self-Awareness",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": -1,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "Ada waits until you finish, then repeats the original point, mostly unchanged."
      },
      {
        "label": "C",
        "text": "Agree with everything immediately, without much reflection.",
        "skill": "Self-Awareness",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "Ada looks up, slightly unconvinced by how fast you agreed."
      },
      {
        "label": "D",
        "text": "Ask what a concrete improvement plan would look like.",
        "skill": "Coaching & Developing Others",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 1,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "Ada opens a blank document. \"Let's actually build one together.\""
      }
    ],
    "transition": "A few days later, a difficult, high-visibility assignment appears with no clear owner. Nobody on the team has volunteered for it yet."
  },
  {
    "num": 27,
    "title": "Stretch Assignment",
    "act": "Act Six: Probation",
    "day": "Month 3",
    "connector": "A difficult, high-visibility assignment appears with no clear owner. Nobody on the team has volunteered for it yet.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Volunteer for it directly.",
        "skill": "Self-Motivation & Initiative",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 2,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "Ada's eyebrows lift slightly. \"Alright then,\" she says, sliding the folder across the desk."
      },
      {
        "label": "B",
        "text": "Evaluate whether you're genuinely ready before deciding.",
        "skill": "Self-Awareness",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 1,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "By the time you've decided, someone else has already put their hand up."
      },
      {
        "label": "C",
        "text": "Wait to see if someone more senior takes it first.",
        "skill": "Self-Motivation & Initiative",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": -1,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "The assignment sits unclaimed at the end of the meeting, a little longer than expected."
      },
      {
        "label": "D",
        "text": "Avoid it, given how much is already riding on your review.",
        "skill": "Resilience & Grit",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": -2,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "The folder moves to someone else's desk before the day is out."
      }
    ],
    "transition": "Two weeks into it, an old error resurfaces — something from a while back, now visible in front of senior leadership, in a meeting you weren't even part of."
  },
  {
    "num": 28,
    "title": "Public Mistake",
    "act": "Act Six: Probation",
    "day": "Month 3",
    "connector": "An error you made two weeks ago has just become visible — in front of senior leadership, in a meeting you weren't even in.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Own it directly with Ada as soon as you hear, without minimising it.",
        "skill": "Personal Accountability",
        "meters": {
          "rep": 2,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "Ada listens, nods once. \"Okay. What do you need to fix it?\""
      },
      {
        "label": "B",
        "text": "Explain the circumstances that led to the mistake.",
        "skill": "Personal Accountability",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "Ada listens to the explanation, then asks, simply, \"What happens next?\""
      },
      {
        "label": "C",
        "text": "Fix it quietly without drawing attention to it.",
        "skill": "Integrity & Ethical Judgement",
        "meters": {
          "rep": -1,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Poor",
        "reaction": "The correction goes out unannounced, sitting quietly beside the original."
      },
      {
        "label": "D",
        "text": "Ask a colleague for advice on how to handle it before doing anything.",
        "skill": "Self-Awareness",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "Their advice comes with a look you can't quite place."
      }
    ],
    "transition": "Life moves on. A new graduate joins the team that week, visibly overwhelmed — exactly how you felt on Day One, ninety days ago."
  },
  {
    "num": 29,
    "title": "New Graduate",
    "act": "Act Six: Probation",
    "day": "Month 3",
    "connector": "A new graduate joins the team this week, visibly overwhelmed — exactly how you felt on Day One, ninety days ago.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Actively check in and offer to walk them through the basics.",
        "skill": "Mentorship & Peer Support",
        "meters": {
          "rep": 0,
          "inf": 2,
          "gro": 0,
          "imp": 0
        },
        "quality": "Best",
        "reaction": "Their shoulders drop slightly, relieved someone finally noticed. \"Thank you, honestly.\""
      },
      {
        "label": "B",
        "text": "Introduce yourself, then let them find their own footing.",
        "skill": "Belonging & Inclusion Behaviour",
        "meters": {
          "rep": 0,
          "inf": 1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "A quick handshake, a quick smile, and you both get back to your screens."
      },
      {
        "label": "C",
        "text": "Give them space, assuming someone else has it covered.",
        "skill": "Belonging & Inclusion Behaviour",
        "meters": {
          "rep": 0,
          "inf": -1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Weak",
        "reaction": "They spend the morning quietly figuring things out on their own, the way you once did."
      },
      {
        "label": "D",
        "text": "Share the resources that helped you most in your own first weeks.",
        "skill": "Mentorship & Peer Support",
        "meters": {
          "rep": 0,
          "inf": 1,
          "gro": 1,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "A grateful reply pings back within the hour: \"This is really helpful, thank you.\""
      }
    ],
    "transition": "And then, somehow, it's the night before your final probation review. Ninety days, come down to this."
  },
  {
    "num": 30,
    "title": "Probation Review",
    "act": "Act Six: Probation",
    "day": "Day 90",
    "connector": "Tomorrow is your final probation review. Tonight, you can genuinely only focus on one thing before you walk in.",
    "prompt": "What do you do?",
    "options": [
      {
        "label": "A",
        "text": "Make sure every open commitment is actually closed out.",
        "skill": "Accountability for Results",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 0,
          "imp": 2
        },
        "quality": "Best",
        "reaction": "Your task list empties out, one line at a time, until it's just... done."
      },
      {
        "label": "B",
        "text": "Reach out to a couple of colleagues to strengthen those relationships.",
        "skill": "Relationship & Network Building",
        "meters": {
          "rep": 0,
          "inf": 2,
          "gro": 0,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "A couple of short, easy conversations later, the evening feels lighter than it did."
      },
      {
        "label": "C",
        "text": "Spend the evening building capability in an area you know is a gap.",
        "skill": "Continuous Learning Orientation",
        "meters": {
          "rep": 0,
          "inf": 0,
          "gro": 2,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "The tutorial tab stays open long after everyone else has logged off."
      },
      {
        "label": "D",
        "text": "Focus on making sure your recent contributions are visible to the right people.",
        "skill": "Career Navigation & Self-Advocacy",
        "meters": {
          "rep": 0,
          "inf": 1,
          "gro": 0,
          "imp": 0
        },
        "quality": "Good",
        "reaction": "A short, well-aimed update goes out to the right people, just before the office empties out."
      }
    ],
    "transition": "Tomorrow comes. Ninety days end the same way they began — with a decision. Whatever you walk into that review having done, it's yours now."
  }
];
