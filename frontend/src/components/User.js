import React from 'react'
import {Link} from 'react-router-dom'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                <Link to={`user/${user.user_name}`}>{user.user_name}</Link>
            </td>  
            <td>
                {user.first_name}
            </td>
             <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table>
            <th>
                Username
            </th>
            <th>
                First name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Email
            </th>
            <tbody>
            {users.map((user) => <UserItem user={user} />)}    
            </tbody>           
        </table>
    )
}

export default UserList