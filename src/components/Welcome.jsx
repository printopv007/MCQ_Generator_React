import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import imagebg from '../images/imagebg.png'; 

function Welcome() {
  return (
    <div className="welcome-container">
      <section className="section-a">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="content">
                <h1>Welcome to MyExam Portal.</h1>
                <p>
                  By clicking below you will receive the instructions for following the Multiple Choice Question exam.We wish you all the best.
                </p>
                <Link to="/ins">
                  <Button variant="success">Proceed </Button>
                </Link>
              </div>
            </div>
            <div className="col-md-6 i">
              <img className='img-fluid'
                style={{ maxWidth: '100%'}}
                src={imagebg}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Welcome;
