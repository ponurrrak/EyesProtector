import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.stateDefaults = {
      isStarted: false,
      isWorkingTime: false,
      timeToChange: 0,
      timer: null,
    };
    this.timeBase = 20;
    this.state = this.stateDefaults;
  }

  convertTimeToString(seconds) {
    const timeRemaining = new Date(seconds * 1000);
    return timeRemaining.toISOString().split('T')[1].split('.')[0].split(':').slice(1,3).join(':');
  }

  tickTimer() {
    const { timeToChange } = this.state;
    if(timeToChange) {
      this.setState({
        ...this.state,
        timeToChange: timeToChange - 1,
      });
    } else {
      new Audio('./sounds/bell.wav').play();
      this.runApp();
    }
  }

  runApp() {
    const { isWorkingTime, timeToChange, timer } = this.state;
    this.setState({
      isStarted: true,
      isWorkingTime: !isWorkingTime,
      timeToChange: isWorkingTime ? this.timeBase : this.timeBase * 60,
      timer: timer ? timer : setInterval(() => this.tickTimer(), 1000),
    });
  }

  stopApp() {
    clearInterval(this.state.timer);
    this.setState(this.stateDefaults);
  }

  closeApp() {
    window.close();
  }

  render() {
    const { isStarted, isWorkingTime, timeToChange } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {!isStarted &&
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        }
        {isStarted &&
          <div>
            {isWorkingTime ?
              <img src="images/Work.png" />
              :
              <img src="images/Rest.png" />
            }
            <div className="timer">
              {this.convertTimeToString(timeToChange)}
            </div>
          </div>
        }
        {!isStarted ?
          <button className="btn" onClick={() => this.runApp()}>Start</button>
          :
          <button className="btn" onClick={() => this.stopApp()}>Stop</button>
        }
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
