import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import React, { Component } from 'react'; // React import 수정
import { CircularProgress,Paper ,Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { withStyles } from '@mui/styles';

const styles = (theme) => ({
  root:{
    width: '100%',
    marginTop: 24,
    overflowX: 'auto'
  },
  table:{
    minWidth: 1080,
  },
  progress:{
   margin: 12, 
  }
});

/* 
  1) constructor()
  2) componentWillMount()
  3) render()
  4) componentDidMount()


  props or state => shouldComponentUpdate()
*/

class App extends Component {
  state = {
    customers: [],
    completed: []
  }
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }
  progress = ()=>{
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        {this.state.customers ? this.state.customers.map((c) => {
            return(
              <Customer
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                />
            )
          }) :
          <TableRow>
              <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
              </TableCell>
            </TableRow>}
        </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
