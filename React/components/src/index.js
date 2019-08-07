import React from 'react';
import ReactDOM from 'react-dom';
import CommentDetail from './CommentDetail';
import ApprovalCard from './ApprovalCard';


const App = () =>{
    return(
        <div className="ui container comments">
            <ApprovalCard>
                <CommentDetail 
                    author="Sam" 
                    text="Nice comment!!" 
                    date="Today at 6:00 pm"
                />
            </ApprovalCard>
            <ApprovalCard>
                <CommentDetail 
                    author="Dam" 
                    text="Cool!!!!!" 
                    date="yesterday at 5:00 pm"
                />
            </ApprovalCard>
            <ApprovalCard>
                <CommentDetail 
                    author="Pan" 
                    text=" alrighty!" 
                    date=" yesterday at 10:00 am"
                />
            </ApprovalCard>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

