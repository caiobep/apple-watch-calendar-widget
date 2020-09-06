import React from "react";

export const command: string = `/usr/local/bin/icalbuddy -ea -nc -n -iep 'datetime, title' -b '' -ps '|,|' eventsToday`;

const minutes = (min: number) => min * 60 * 1000;

export const refreshFrequency = minutes(1);

interface Event {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    duration: number;
}

const convertiCalOutputToJson = (iCalOutput: string): Event[] => {
    return iCalOutput
        .trim()
        .split("\n")
        .slice(0, 3)
        .map((eventText) => {
            const [name, time] = eventText.split(",");
            const [startTime, endTime] = time.split("-");

            const duration =
                Number(endTime.replace(":", "")) - Number(startTime.replace(":", "")) ||
                0;

            return {
                id: `${eventText}`,
                name,
                startTime,
                endTime,
                duration,
            };
        });
};

const isEventSmallerThanHours = (hours: number) => (event: Event) =>
    !(event.duration > 0 && event.duration < hours);

export const render = ({output}: { output: string }): JSX.Element => {
    const events = convertiCalOutputToJson(output).filter(
        isEventSmallerThanHours(4)
    );

    if (events.length < 1) {
        return <div/>;
    }

    const firstEvent = events[0];

    return (
        <div className="container">
            <div id="vertical-event-calendar-color"/>
            <div className="text-container">
                <div id="event-duration" data-testid="event-duration">
                    {firstEvent.startTime}-{firstEvent.endTime}
                </div>
                {events.map((event) => (
                    <div key={event.id} id="event-name"
                         data-testid="event-name">
                        {event.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const className = `
  left: 10px;
  top: 48px;
  font-family: "SF Pro Display";
  font-weight: bolder;
  color: #FFFFFF;
  opacity: 0.8;

  .time-separator {
    animation: blink 1000ms infinite;
  }

  .container {
    backdrop-filter: blur(0.8);
    display:flex;
    z-index: 2;
  }

  #event-duration {
    font-weight: bolder;
    font-family: "SF Pro Display";
  }

  .text-container {
    font-weight: 500;
  }

  #vertical-event-calendar-color {
    border: 3px #fabd2f solid;
    border-radius: 12px;
    margin: 0 8px;
  }

  @keyframes blink {
      from { opacity: 1.0; }
      50% { opacity: 0.5; }
      to { opacity: 1.0; }
  }     
`;
