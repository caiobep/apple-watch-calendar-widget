export const command =
  "/usr/local/bin/icalbuddy -ea -nc -iep 'datetime, title' -b '' -ps '|,|' eventsNow || icalBuddy -n -li 1 -ea -nc -iep 'datetime, title' -b '' -ps '|,|' eventsToday";

const minutes = (min) => min * 60 * 1000;

export const refreshFrequency = minutes(5);

const convertIcalOutputToJson = (icalOutput) => {
  return (
    icalOutput
      .trim()
      .split("\n")
      .map((e) => e.split(",")) || [
      ["Calendar", "🤔 No Scheduled events today"],
    ]
  );
};

export const render = ({ output }) => {
  const events = convertIcalOutputToJson(output).reverse();

  return (
    <div>
      <div className="container">
        <div id="vertical-event-calendar-color"></div>
        <div class="text-container">
          <div id="event-name">{events[0][1]}</div>
          {events.map((ev) => (
            <div id="event-duration">{ev[0]}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const className = `
  left: 10px;
  top: 50px;
  font-family: "SF Pro Display";
  color: #fff;

  .container {
    backdrop-filter: blur(0.8);
    display:flex;
    z-index: 2;
  }

  .text-container {
    font-weight: 500;
    text-shadow: 0 0 20px black;
  }

  #vertical-event-calendar-color {
    border: 3px #fabd2f solid;
    border-radius: 12px;
    margin: 0 8px;
  }

`;
