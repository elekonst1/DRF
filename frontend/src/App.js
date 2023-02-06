import React from 'react';
//import logo from './logo.svg';
import './App.css';
import UserList from './components/User';
import axios from 'axios'
import ProjectList from './components/project';
import TodoList from './components/todo';
import UserProjectList from './components/UserProject';
import {HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom'

const NotFound404 = ({location}) => {
  return (
    <div> 
      <h1>Page on `{location.pathname}` not found</h1>
    </div>
  )
}


class App extends React.Component {

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



/*class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }
  }
*/

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
        <HashRouter>
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
            </ul>
          </nav>
          <Switch>
            <Route exact path='/' component={() => <UserList users={this.state.users} />} />
            <Route exact path='/projects' component={() => <ProjectList items={this.state.projects}/>} />
            <Route exact path='/todos' component={() => <TodoList items={this.state.todos}/>} />
            <Route exact path='/user/:use.user_name' component={() => <UserProjectList items={this.state.projects} />} />
            <Redirect from='/users' to='/' />
            <Route component={NotFound404}/>
          </Switch>
        </HashRouter>
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


