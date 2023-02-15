import React from 'react';
//import logo from './logo.svg';
import './App.css';
import UserList from './components/User';
import axios from 'axios'
import ProjectList from './components/project';
import TodoList from './components/todo';
import UserProjectList from './components/UserProject';
import {Route, Link, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import LoginForm from './components/Auth';
import Cookies from 'universal-cookie'



const NotFound404 = ({location}) => {
  return (
    <div> 
      <h1>Page on `{location.pathname}` not found</h1>
    </div>
  )
}


/*class App extends React.Component {

  constructor(props) {
    super(props)

    const user1 = {user_name: 'fedy', first_name: 'Фёдор', last_name: 'Достоевский', email: '1821@gmail.com'}
    const user2 = {user_name: 'Sany', first_name: 'Александр', last_name: 'Грин', email: '1880@gmail.com'}

    const users = [user1, user2]

    const project1 = {name: 'Car rental', repo_link: 'https://github.com/elekonst1/DRF/pull/1', user: user1}
    const project2 = {name: 'Car sharing', repo_link: 'https://github.com/elekonst1/DRF/pull/2', user: user2}
    const projects = [project1, project2]

    const todo1 = {project: project1, text: 'blablabla', user: user1}
    const todo2 = {project: project1, text: 'hi', user: user2}
    const todos = [todo1, todo2]


    this.state = {
      'users': users,
      'projects': projects,
      'todos': todos
    }
  }
*/


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      'users': [],
      'projects': [],
      'todos': [],
      'token': ''
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    localStorage.setItem('token', token)
    this.setState(({'token': token}, () => this.load_data()))
  }

  is_authenticated() {
    return this.state.token !== ''
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    //const token = localStorage.getItem('token')
    this.setState({'token': token}, () => this.load_data())
  }
  get_token(login, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: login, password: password})
      .then(response => {
        this.set_token(response.data['token'])
      }).catch(error => alert('Wrong password'))
    }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json',
    }
    if (this.is_authenticated())
    {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

/*  load_data() {
    axios.get('http://127.0.0.1:8000/api/users/')
      .then(response => {
        this.setState({users: response.data})
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/project/')
      .then(response => {
        this.setState({projects: response.data})
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todo/')
      .then(response => {
        this.setState({todos: response.data})
      }).catch(error => console.log(error))
  }
*/

  load_data() {
    const headers = this.get_headers
    axios.get('http://127.0.0.1:8000/api/users', {headers})
      .then(response => {
        const users = response.data
          this.setState(
            {
              'users': users['results']
            }
          )
      }).catch(error => console.log(error)) 

    axios.get('http://127.0.0.1:8000/api/project', {headers})
      .then(response => {
        const projects = response.data
          this.setState(
            {
              'projects': projects['results']
            }
          )
      }).catch(error => console.log(error)) 
      
    axios.get('http://127.0.0.1:8000/api/todo', {headers})
      .then(response => {
        const todos = response.data
          this.setState(
            {
              'todos': todos['results']
            }
          )
      }).catch(error => console.log(error))


  }



  componentDidMount() {
    this.get_token_from_storage()
  }



/*
componentDidMount() {
  axios.get('http://127.0.0.1:8000/api/users')
    .then(response => {
      const users = response.data
        this.setState(
          {
            'users': users
          }
        )
    }).catch(error => console.log(error))
}
*/
/*componentDidMount() {
    const users = [
      {
        'user_name': 'fedy',
        'first_name': 'Фёдор',
        'last_name': 'Достоевский',
        'email': '1821@gmail.com'
      },
      {
        'user_name': 'Sany',
        'first_name': 'Александр',
        'last_name': 'Грин',
        'email': '1880@gmail.com'
      },
    ]
    this.setState(
      {
        'users': users
      }
    )
  }
*/

  render () {
    return (
      <div className='App'>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to='/'>Users</Link>
              </li>
              <li>
                <Link to='/projects'>Projects</Link>
              </li>
              <li>
                <Link to='/todos'>Todos</Link>
              </li>
              <li>
                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Lo gin</Link>}
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path='/' component={() => <UserList users={this.state.users} />} />
            <Route exact path='/projects' component={() => <ProjectList items={this.state.projects}/>} />
            <Route exact path='/todos' component={() => <TodoList items={this.state.todos}/>} />
            <Route exact path='/login' component={() => <LoginForm get_token={(login, password) => this.get_token(login, password)}/>} />
            <Route exact path='/user/:use.user_name' component={() => <UserProjectList items={this.state.projects} />} />
            <Redirect from='/users' to='/' />
            <Route component={NotFound404}/>
          </Switch>
        </BrowserRouter>
      </div>  
    )
  }
}
export default App;





/*

  render () {
    return (
      <div className='App'>
        <UserList users={this.state.users} />
        <ProjectList items={this.state.projects} />
        <TodoList items={this.state.todos} />
      </div>  
    )
  }
}
export default App;
*/


