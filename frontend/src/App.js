import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User';
import axios from 'axios'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }
  }


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
      <div>
        <UserList users={this.state.users} />
      </div>  
    )
  }
}
export default App;


