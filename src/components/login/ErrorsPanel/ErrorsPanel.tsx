import * as React from 'react';
import { Card } from 'reactstrap';
let styles = require('./ErrorsPanel.scss');

export default class ErrorsPanel extends React.Component<{}, {}>{
  render(){
    return <Card className={styles.container}/>
  }
}