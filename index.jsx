export const command =
  "/usr/local/bin/icalbuddy -ea -li 1 -nc -b '' -ps '|,@|' eventsNow";

const minutes = (min) => min * 60 * 1000;

export const refreshFrequency = minutes(30);

const convertIcalOutputToJson = (icalOutput) => {
  const icalSplitedVector = icalOutput.split(",@");

  return {
    name: icalSplitedVector[0],
    duration: icalSplitedVector[icalSplitedVector.length - 1],
  };
};

export const render = ({ output }) => {
  const event = convertIcalOutputToJson(output);

  return (
    <div>
      <div className="background"></div>
      <div className="container">
        <div id="vertical-event-calendar-color"></div>
        <div class="text-container">
          <div id="event-duration">{event.duration}</div>
          <div id="event-name">{event.name}</div>
        </div>
      </div>
    </div>
  );
};

export const className = `
  left: 10px;
  top: 60px;
  font-family: "SF Pro Display";
  color: #fff;

  .background {
    filter: blur(4px);
    background-color: rgba(0,0,0,0.2);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index:-1;
  }

  .container {
    backdrop-filter: blur(0.8);
    display:flex;
    z-index: 2;
  }

  .text-container {
    font-weight: 500;
  }

  #vertical-event-calendar-color {
    border: 3px #fabd2f solid;
    border-radius: 12px;
    margin: 0 8px;
  }

`;
