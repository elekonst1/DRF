import React from 'react'


const TodoItem = ({item}) => {
    return (
        <tr>
            <td>
                {item.project.name}
            </td>  
            <td>
                {item.text}
            </td>
             <td>
                {item.user.user_name}
            </td>
        </tr>
    )
}

const TodoList = ({items}) => {
    return (
        <table>
            <th>
                Project_name
            </th>
            <th>
                Text
            </th>
            <th>
                Username
            </th>
                {items.map((item) => <TodoItem item={item} />)}
        </table>
    )
}

export default TodoList