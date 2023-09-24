import { useRef } from "react";

import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { Col, Container, Input, Label, Row ,Form} from "reactstrap";




const Contact = () => {
  const form = useRef();

  return (
    <>
      
        <Container className="mt-3">
            <Row>
                <Col  md={5} className=" pt-3">

             
        <h2>Contact Us</h2>
    
          <Form ref={form}>
            
              <Label>Name</Label>
              <Input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <Label>Email</Label>
              <Input
                type="email"
                name="user_email"
                placeholder="abc@xyz.com"
                required
              />
              <Label>Subject</Label>
              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <Label>Message</Label>
            <br />

              <textarea name="message" cols="68" rows="3"></textarea>
              <br />
              <button className="--btn --btn-primary">Send Message</button>
           
          </Form>
          </Col>
          
            <Col md={7} className="mt-5 ps-5">
          <div >
            <div >
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via </p>
              <div >
                <span>
                  <FaPhoneAlt />
                  <p>+234 567 891 0431</p>
                </span>
                <span>
                  <FaEnvelope />
                <p>Support@BulletinBoard.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Bangalore, Karnataka</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@Twitter</p>
                </span>
              </div>
            </div>
          </div>
      </Col>
          </Row>
        </Container>
      
    </>
  );
};


export default Contact