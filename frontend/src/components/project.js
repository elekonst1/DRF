import React from 'react'


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

const ProjectList = ({items}) => {
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
                {items.map((item) => <ProjectItem item={item} />)}
        </table>
    )
}

export default ProjectList