import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import React, { Component } from 'react'; // React import 수정
import { Paper ,Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
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
});

const customers = [{
  'id': 1,
  'image': 'https://picsum.photos/64/64/?seed=1',
  'name': '홍길동',
  'birthday': '961222',
  'gender': '남자',
  'job': '대학생'
},
{
  'id': 2,
  'image': 'https://picsum.photos/64/64/?seed=2',
  'name': '이길동',
  'birthday': '961222',
  'gender': '남자',
  'job': '대학생'
},
{
  'id': 3,
  'image': 'https://picsum.photos/64/64/?seed=3',
  'name': '차길동',
  'birthday': '961222',
  'gender': '남자',
  'job': '대학생'
}]

class App extends Component {
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
        {
          customers.map((c) => {
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
          })
        }
        </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
