The page has a title
The page describes "Session" or "Break" depending on current state
The page shows the current time (default to the current session length)
When clicked, the page begins counting down from the current time
When clicked again, the page pauses the count down
There are options to increase or decrease the break length (default to 5 min) and it is shown
	This should not be able to be decreased below 1 or increased beyond 120
There are options to increase or decrease the session length (default to 25 min) and the current length is shown
	This should not be able to be decreased below 1 or increased beyond 120
There is an option to reset the timer to the current session length
When the session timer expires, the page signals the user in some way and "begins the break timer"
	The break timer begins at the current break length and begins counting down immediately
	The current state changes to "Break"
When the break timer expires, the page signals the user in some way and "begins the session timer"
	The session timer begins at the current session length and begins counting down immediately
	The current state updates to "Session"


Variables:
const defSessionLen = 25
const defBreakLen = 5
curSessionLen = defSessionLen
curBreakLen = defBreakLen

curState "Session" or "Break"
curTime a var determining the number of seconds remaining. defaults to 60*curSessionLen
