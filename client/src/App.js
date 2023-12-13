import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import React, { Component } from 'react'; // React import 수정
import { CircularProgress,Paper ,Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { withStyles } from '@mui/styles';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const styles = (theme) => ({
  root:{
    width: '100%',
    minWidth: 1080
  },
  menu:{
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper:{
    marginLeft: 18,
    marginRight: 18
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

  constructor(props){
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword: ''
    }
  }
  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword: ''
    });
    
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }
  callApi= async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }
  progress = ()=>{
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }  
  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name && c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <Customer 
        key={c.id} 
        stateRefresh={this.stateRefresh} 
        id={c.id} 
        image={c.image} 
        name={c.name} 
        birthday={c.birthday} 
        gender={c.gender} 
        job={c.job} /> 
      });
    }
    const { classes } = this.props;
    const cellList = ["번호", "프로필 이미지","이름","생년월일","성별","직업","설정"];
    return (
      <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            고객 관리 시스템
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="검색하기"
              inputProps={{ 'aria-label': 'search' }}
              name="searchKeyword"
              value={this.state.searchKeyword}
              onChange={this.handleValueChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
    <Paper className={classes.paper}>
    <div className={classes.menu}>
    <CustomerAdd stateRefresh={this.stateRefresh} />
    </div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {cellList.map(c => {
                return <TableCell className={classes.tableHead}>{c}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
        {this.state.customers ? 
          filteredComponents(this.state.customers) :
          <TableRow>
              <TableCell colSpan="7" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
              </TableCell>
            </TableRow>
            }
        </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);
