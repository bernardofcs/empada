import React from 'react';
import { Row, Col, Slider, Slide, Icon, Card, CardTitle} from 'react-materialize';
import '../styles/App.css';

function HomePage (props) {
  return (
    <div className='align'>
      
      <Slider>
        <Slide
          src="http://integratedfacilitationservices.com/wp-content/uploads/2016/02/event-planningand-management-1024x683.jpg">
        </Slide>
        <Slide
          src="http://www.citylife.sg/wp-content/uploads/2013/07/Event-Management-Banner.jpg"
          placement="left">
        </Slide>
        <Slide
          src="http://www.instituteshub.com/wp-content/uploads/2016/02/12b0e6d63e.jpg"
          placement="right">
        </Slide>
      </Slider>

      <br/>
      <div className="divider"></div>
      <br/>
      <br/>
      <br/>
      <br/>
      <Row>
        <Col s={10} className='offset-s1'>
        <h4>Worry No Longer, The Solution Is Here</h4>
          <br/>
          Stay up to date on the your contractors progress in <b>real time</b> with the live notifications and an innovative timeline. This helps improve communication and accountability all from the same seamless framework. 
        </Col>
      </Row>
      <br/>
      <br/>
      <br/>
      <div className="divider"></div> 
      <br/>
      
      <Row>
        <Col s={12} className='icons'>
        <h4>What We Bring To The Table</h4>
        </Col>
      </Row>
      <Row>
        <Col s={12} m={6} className='icons'>
          <Icon className="big-icons">person_pin</Icon>
          <br/>
          A team of four young developers...
        </Col>
        <Col s={12} m={6} className='icons'>
          <Icon className="big-icons">business</Icon>
          <br/>
          interested in learning about your business... 
        </Col>
      </Row>
      <Row>
        <Col s={12} m={6} className='icons'>
          <Icon className="big-icons">trending_up</Icon>
          <br/>
          who are dedicated to your continued success...
        </Col>
        <Col s={12} m={6}>
          <Icon className="big-icons">web</Icon>
          <br/>
          <p className='icons'>and have a whole 2 months of web experience to back us up.</p>
        </Col>
      </Row>
      <br/>
      <div className="divider"></div>
      <br/>
      <br/>
      <br/>

      <Row>
        <Col s={12} m={6}>
          <Card className='pictures' header={<CardTitle reveal image={"Event-Management-Banner.jpg"} waves='light'/>}
            title="Stand Out"
            reveal={<p>A perfect way to minimize your time checking in on your contractors.</p>}>
          </Card>
        </Col>
        <Col s={12} m={6}>
          <Card className='pictures' header={<CardTitle reveal image={"concert.jpg"} waves='light'/>}
            title="Enjoy"
            reveal={<p>A perfect way to help keep you keep your clients happy.</p>}>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col s={12} m={6}>
          <Card className='pictures' header={<CardTitle reveal image={"event-planning-and-management.jpg"} waves='light'/>}
            title="Perfect For All Types Of Occasions"
            reveal={<p>Perfect for all kinds of events.</p>}>
          </Card>
        </Col>
        <Col s={12} m={6}>
          <Card className='pictures' header={<CardTitle reveal image={"mic.jpg"} waves='light'/>}
            title="Sit Back and Relax"
            reveal={<p>Let your voice be heard, without having to speak.</p>}>
          </Card>
        </Col>
      </Row>
      
    </div>
  );
}

export default HomePage;
