import React, { Component } from 'react';
import { Row, Col, Slider, Slide, Icon, Card, CardTitle, MediaBox } from 'react-materialize';
import '../styles/App.css';

class HomePage extends Component {
  render() {
    return (
      <div>
        <MediaBox src="concert.jpg" caption="A demo media box1" width="100%"/>
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
            Stay up to date on the your contractors progress in <strong>real time</strong> with the live notifications and an innovative timeline. This helps improve communication and accountability all at once. 
          </Col>
        </Row>
        <br/>
        <br/>
        <br/>
        <div className="divider"></div>
        <br/>
        
        <Row>
          <Col s={12}>
          <h4>What We Bring To The Table</h4>
          </Col>
        </Row>
        <Row>
          <Col s={12} m={6}>
            <Icon className="big-icons">person_pin</Icon>
            <br/>
            A team of four young developers...
          </Col>
          <Col s={12} m={6}>
            <Icon className="big-icons">business</Icon>
            <br/>
            interested in learning about your business... 
          </Col>
        </Row>
        <Row>
          <Col s={12} m={6}>
            <Icon className="big-icons">trending_up</Icon>
            <br/>
            who are dedicated to your continued success...
          </Col>
          <Col s={12} m={6} >
            <Icon className="big-icons">web</Icon>
            <br/>
            and have a whole 2 months of web experience to back us up.
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
              title="Card Title"
              reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
              <p><a href="#">This is a link</a></p>
            </Card>
          </Col>
          <Col s={12} m={6}>
            <Card className='pictures' header={<CardTitle reveal image={"concert.jpg"} waves='light'/>}
              title="Card Title"
              reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
              <p><a href="#">This is a link</a></p>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col s={12} m={6}>
            <Card className='pictures' header={<CardTitle reveal image={"event-planning-and-management.jpg"} waves='light'/>}
              title="Card Title"
              reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
              <p><a href="#">This is a link</a></p>
            </Card>
          </Col>
          <Col s={12} m={6}>
            <Card className='pictures' header={<CardTitle reveal image={"mic.jpg"} waves='light'/>}
              title="Card Title"
              reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
              <p><a href="#">This is a link</a></p>
            </Card>
          </Col>
        </Row>
        
      </div>
    );
  }
}

export default HomePage;
