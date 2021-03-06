import * as React from 'react';
import { Card, CardBlock } from 'reactstrap';
let styles = require('./SessionCounter.scss');

const HOUR = 3600000;
const MINUTE = 60000;
const SECOND = 1000;

export interface ISessionCounterProps {
  expiresAt: number;
}

interface ISessionCounterState {
  hours:number;
  minutes:number;
  seconds:number;
}

let counterInterval:any;

export default class SessionCounter extends React.Component<ISessionCounterProps, ISessionCounterState>{
  state = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  componentDidMount(){
    counterInterval = setInterval(() => {
      let time = this.props.expiresAt - Date.now(),
          expired = time < 0 ? true : false;

      let seconds = Math.floor((time / SECOND) % 60);
      let minutes = Math.floor((time / MINUTE) % 60);
      let hours = Math.floor((time / HOUR));

      if (expired){
        clearInterval(counterInterval);
        this.setState({
          hours: 0,
          minutes: 0,
          seconds: 0
        })
      }else {
        this.setState({
          hours: hours,
          minutes: minutes,
          seconds: seconds
        });
      }
    }, 1000);
  };

  componentWillUnmount(){
    clearInterval(counterInterval);
  }

  getDisplayComponent = () => {
    return (
      <div>
        <div className={styles.displayItem}>
          <div>{this.state.hours}</div>
          <div>Hours</div>
        </div>
        <div className={styles.displayItem}>
          <div>{this.state.minutes}</div>
          <div>Minutes</div>
        </div>
        <div className={styles.displayItem}>
          <div>{this.state.seconds}</div>
          <div>Seconds</div>
        </div>
      </div>
    )
  };

  render(){
    let display = this.getDisplayComponent();

    return (
      <Card>
        <CardBlock>
          <p>Your session will expire in :</p>
          {display}
        </CardBlock>
      </Card>
    );
  }
}