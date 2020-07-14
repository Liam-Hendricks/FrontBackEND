import React from 'react';
import{Table,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';




function Items(props){
    
    
    
    const Projects=props.data;
    const mapper = Projects.map((data)=>
            <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td><a href={data.URL}>{data.URL}</a></td>
                <td><Link to='/Edit'><Button variant='primary' onClick={()=>props.updateHandler(data.id)}>Edit</Button></Link></td>
                <td><Button variant='danger' onClick={() =>props.eventHandler(data.id)}>X</Button></td>
                
            </tr>
        );
    
        
        return(
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Project Name</th>
                <th>Description</th>
                <th>URL</th>
               
              </tr>
            </thead>
            <tbody>
              {mapper}
            </tbody>

          </Table>

        );
    

}

export default Items;