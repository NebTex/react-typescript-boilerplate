import * as React from 'react';
import { IService, IUser } from '../../../models/interface';
import { Container, Row, Form, FormGroup, Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import ServicesList from './ServicesList/ServicesList';
import Fuse = require('fuse.js');
let styles = require('./ServicesPanel.scss');

export interface IServicesPanelProps {
  services: IService[];
  user: IUser;
}

interface IServicesPanelState {
  dropdownOpen: boolean;
  searchValue: string;
  activeRole: string;
}

export default class ServicesPanel extends React.Component<IServicesPanelProps, IServicesPanelState>{
  state = {
    dropdownOpen: false,
    searchValue: '',
    activeRole: 'All'
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  selectRole = (role:string) => {
    this.setState({
      activeRole: role
    });
  }

  getRolesDropdown = () => {
    let roles:string[] = [];
    this.props.services.forEach( service => {
      service.roles.forEach( role => {
        if(roles.indexOf(role) === -1){
          roles.push(role);
        }
      });
    });

    roles.sort(function(a, b){
      if(a.toLowerCase() < b.toLowerCase()){
        return -1;
      }else {
        return 1;
      }
    });

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.activeRole}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {this.selectRole('All')}}>{'All'}</DropdownItem>
          <DropdownItem divider />
          {roles.map((role, index) => {
            return <DropdownItem key={index} onClick={() => {this.selectRole(role)}}>{role}</DropdownItem>
          })}
        </DropdownMenu>
      </Dropdown>
    );
  }

  searchOnChange = (evt:any) => {
    this.setState({
      searchValue: evt.target.value
    });
  }

  getServices = () => {
    let services = this.props.services;

    // Active Filter
    if(this.state.activeRole !== 'All'){
      services = services.filter((service) => {
        return service.roles.indexOf(this.state.activeRole) > -1;
      });
    }

    // Apply search criteria
    if(this.state.searchValue !== ''){
      var options = {
        keys: ['name', 'long_description', 'short_description']
      };

      var f = new Fuse<IService>(services, options);;
      services = f.search(this.state.searchValue);
    }

    return services;
  }

  render(){
    let rolesDropdown = this.getRolesDropdown(),
        services = this.getServices();

    return (
      <Container>
        <Row>
          <Form onSubmit={(evt:any) => {evt.preventDefault()}}>
            <FormGroup>
              <Input type="test" placeholder="Search" onChange={this.searchOnChange}/>
            </FormGroup>
          </Form>
          {rolesDropdown}
        </Row>
        <Row>
          <ServicesList services={services} user={this.props.user}/>
        </Row>
      </Container>
    );
  }
}