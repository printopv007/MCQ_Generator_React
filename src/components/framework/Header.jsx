import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
function Header() {
  return (
  
    <>
    
<Navbar className="bg-body-tertiary" >
        <div style={{float:'left',marginLeft:'10px'}}>
         <Navbar.Brand>
         <Link to='/' style={{textDecoration:'none',color: 'rgb(37, 37, 37)'}} >MyExam Portal</Link> 
          </Navbar.Brand>
        </div>
      </Navbar>
      <br />
</>
  );
}

export default Header;


