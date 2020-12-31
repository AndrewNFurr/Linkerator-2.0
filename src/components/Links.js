import React, { useState } from 'react';


const Links = ({
    linkList,
    setSearch,
    tagList
}) => {
    return <div>
        <form>

        </form>
        <table>
            <tr>
                <th>URL</th>
                <th>Click Count</th>
                <th>Comment</th>
                <th>Tags</th>
                <th>Created</th>
            </tr>
                {
                    linkList.map(_link => {
                        return <tr>
                                <td><a href={_link.link}>{_link.link}</a></td>
                                <td>{_link.clickcount}</td>
                                <td>{_link.comment}</td>
                                <td>{_link.tags ? _link.tags.map(tag => {
                                    return <p onClick={() =>
                                        setSearch(tag.tag)
                                    }>{tag.tag}</p>
                                }) : "None"}</td>
                                <td>{_link.dateCreated}</td>
                             </tr>
                    })
                }
        </table>
    </div>
}

export default Links;