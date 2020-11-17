import React, { Component } from "react";
import Comment from "./CardComment";

export default class Comments extends Component {
    state = {
        comments: [],
        isFetching: true
    };

    async fetchData(url) {
        const response = await fetch(url);
        let data = await response.json();
        return data;
    }

    componentDidMount() {
        const url = "https://jsonplaceholder.typicode.com/posts/1/comments";
        let data = this.fetchData(url);
        data.then(comments => {
            let commentList = comments.slice(0, 10);
            this.setState(
                {
                    comments: commentList,
                    isFetching: false
                },
                () => console.log("New State", this.state.comments)
            );
        });
    }

    render() {
        const { comments, isFetching } = this.state;
        return isFetching ? "Loading..." : <Comment comments={comments} />;
    }
}

// const Comments = (props) => {
//     const {data}= props
//     // function cmts(){
//     //     var result = [];
//     //     for (const i in data) {
//     //         result.push(data[i])   
//     //     }
//     //     console.log("cmt", typeof(result))
//     //     return result;
//     // }
//     return (
//         <div>
//             <Comment data={data}/>
//         </div>
//     );
// };

// export default Comments;