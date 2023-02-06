import React from 'react'
import { useParams } from 'react-router-dom'


const ProjectItem = ({item}) => {
    return (
        <tr>
            <td>
                {item.name}
            </td>  
            <td>
                {item.repo_link}
            </td>
             <td>
                {item.user.user_name}
            </td>
        </tr>
    )
}

const UserProjectList = ({items}) => {

    let {user_name} = useParams();
    let filtered_items = items.filter((item) => item.user.user_name === user_name)
    return (
        <table>
            <th>
                Name
            </th>
            <th>
                Repo_link
            </th>
            <th>
                Username
            </th>
                {filtered_items.map((item) => <ProjectItem item={item} />)}
        </table>
    )
}

export default UserProjectList