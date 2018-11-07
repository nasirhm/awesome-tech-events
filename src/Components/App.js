import React, { Component } from 'react';

let events = [];
const shuffle = a => {
  const arr = a;
  for (let i = a.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }

  return arr;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      events: []
    };
  }

  componentDidMount() {
    fetch(
      `https://api.github.com/repos/devncode/awesome-tech-events/contents/events.json`
    )
      .then(response => response.json())
      .then(jsonResponse => atob(jsonResponse.content))
      .then(contentResponse => JSON.parse(contentResponse))
      .then(eventsResponse => {
        const shuffledEvents = shuffle(eventsResponse);
        events = shuffledEvents;
        this.setState({
          isLoading: false,
          events: shuffledEvents
        });
      });
  }

  searchEvents(event) {
    let updatedList = events;
    updatedList = updatedList.filter(item => {
      const regex = new RegExp(event.target.value);
      if (
        item.name.match(regex) ||
        (item.company !== undefined && item.company.match(regex)) ||
        (item.city !== undefined && item.city.match(regex)) ||
        (item.github !== undefined && item.github.match(regex)) ||
        (item.email !== undefined && item.email.match(regex)) ||
        (item.skills !== undefined && item.skills.find(s => s.match(regex)))
      ) {
        return item;
      }
      return false;
    });
    this.setState({ events: updatedList });
  }

  render() {
    return (
      <div>
        <div className="logo-corner">
          <img src="http://devncode.tech/img/logo.png" alt="devncode logo" />
        </div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/devncode/awesome-tech-events"
          className="github-corner"
          aria-label="View source on Github"
        >
          <svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
            <path
              d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
              fill="currentColor"
              className="octo-arm"
            />
            <path
              d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
              fill="currentColor"
              className="octo-body"
            />
          </svg>
        </a>
        <br />
        <div className="header">
          <div className="hd1"> Awesome Tech Events </div>
          <div className="hd-small">
            Curated list of awesome tech event by {` `}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://devncode.tech"
            >
              devncode
            </a>
          </div>

          <div className="search-div">
            <input
              type="text"
              placeholder="Search"
              onChange={ev => this.searchEvents(ev)}
              className="search"
            />
          </div>
        </div>

        <div>
          {this.state.isLoading ? (
            <div className="center">
              <img src="loader.gif" className="loader" alt="loader" />
            </div>
          ) : (
            <div className="event-list">
              {this.state.events.map((event, index) => (
                <div className="event" key={index}>
                  <div className="cover">
                    <img src={event.eventCover} alt="Event Cover" />
                  </div>
                  <div className="body">
                    <div className="title">
                      <h3>{event.eventName}</h3>
                    </div>
                    <div className="detail">
                      <div className="host-by">
                        <b>Host By:</b> {event.hostBy}
                      </div>
                      <div className="location-date">
                        <span className="location">
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 500 500"
                            aria-hidden="true"
                          >
                            <path
                              id="Facebook_Places"
                              d="M356.208,107.051c-1.531-5.738-4.64-11.852-6.94-17.205C321.746,23.704,261.611,0,213.055,0 C148.054,0,76.463,43.586,66.905,133.427v18.355c0,0.766,0.264,7.647,0.639,11.089c5.358,42.816,39.143,88.32,64.375,131.136 c27.146,45.873,55.314,90.999,83.221,136.106c17.208-29.436,34.354-59.259,51.17-87.933c4.583-8.415,9.903-16.825,14.491-24.857 c3.058-5.348,8.9-10.696,11.569-15.672c27.145-49.699,70.838-99.782,70.838-149.104v-20.262 C363.209,126.938,356.581,108.204,356.208,107.051z M214.245,199.193c-19.107,0-40.021-9.554-50.344-35.939 c-1.538-4.2-1.414-12.617-1.414-13.388v-11.852c0-33.636,28.56-48.932,53.406-48.932c30.588,0,54.245,24.472,54.245,55.06 C270.138,174.729,244.833,199.193,214.245,199.193z"
                            />
                          </svg>{' '}
                          {event.city}, {event.country}
                        </span>
                        <div className="date">
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 50 50"
                            aria-hidden="true"
                          >
                            <path d="M30.224,3.948h-1.098V2.75c0-1.517-1.197-2.75-2.67-2.75c-1.474,0-2.67,1.233-2.67,2.75v1.197h-2.74V2.75 c0-1.517-1.197-2.75-2.67-2.75c-1.473,0-2.67,1.233-2.67,2.75v1.197h-2.74V2.75c0-1.517-1.197-2.75-2.67-2.75 c-1.473,0-2.67,1.233-2.67,2.75v1.197H6.224c-2.343,0-4.25,1.907-4.25,4.25v24c0,2.343,1.907,4.25,4.25,4.25h24 c2.344,0,4.25-1.907,4.25-4.25v-24C34.474,5.855,32.567,3.948,30.224,3.948z M25.286,2.75c0-0.689,0.525-1.25,1.17-1.25 c0.646,0,1.17,0.561,1.17,1.25v4.896c0,0.689-0.524,1.25-1.17,1.25c-0.645,0-1.17-0.561-1.17-1.25V2.75z M17.206,2.75 c0-0.689,0.525-1.25,1.17-1.25s1.17,0.561,1.17,1.25v4.896c0,0.689-0.525,1.25-1.17,1.25s-1.17-0.561-1.17-1.25V2.75z M9.125,2.75 c0-0.689,0.525-1.25,1.17-1.25s1.17,0.561,1.17,1.25v4.896c0,0.689-0.525,1.25-1.17,1.25s-1.17-0.561-1.17-1.25V2.75z M31.974,32.198c0,0.965-0.785,1.75-1.75,1.75h-24c-0.965,0-1.75-0.785-1.75-1.75v-22h27.5V32.198z" />
                            <rect
                              x="6.724"
                              y="14.626"
                              width="4.595"
                              height="4.089"
                            />
                            <rect
                              x="12.857"
                              y="14.626"
                              width="4.596"
                              height="4.089"
                            />
                            <rect
                              x="18.995"
                              y="14.626"
                              width="4.595"
                              height="4.089"
                            />
                            <rect
                              x="25.128"
                              y="14.626"
                              width="4.596"
                              height="4.089"
                            />
                            <rect
                              x="6.724"
                              y="20.084"
                              width="4.595"
                              height="4.086"
                            />
                            <rect
                              x="12.857"
                              y="20.084"
                              width="4.596"
                              height="4.086"
                            />
                            <rect
                              x="18.995"
                              y="20.084"
                              width="4.595"
                              height="4.086"
                            />
                            <rect
                              x="25.128"
                              y="20.084"
                              width="4.596"
                              height="4.086"
                            />
                            <rect
                              x="6.724"
                              y="25.54"
                              width="4.595"
                              height="4.086"
                            />
                            <rect
                              x="12.857"
                              y="25.54"
                              width="4.596"
                              height="4.086"
                            />
                            <rect
                              x="18.995"
                              y="25.54"
                              width="4.595"
                              height="4.086"
                            />
                            <rect
                              x="25.128"
                              y="25.54"
                              width="4.596"
                              height="4.086"
                            />
                          </svg>
                          {event.date}
                        </div>
                      </div>
                      <div className="description">{event.description}</div>
                      <div className="event--categories">
                        {event.categories.map((category, sIndex) => (
                          <span key={sIndex}>{category}</span>
                        ))}
                      </div>
                    </div>
                    <div className="buttons">
                      <a href="{event.eventLink}">Event Link</a>
                      <a href="{event.registerLink}">Registration Link</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="footer">
          Crafted with <span className="heart">♥</span> in Karachi, Pakistan
        </div>
      </div>
    );
  }
}

export default App;
