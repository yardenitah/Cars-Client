// client/src/screens/AboutScreen.js
import React from 'react';
import { Container } from 'react-bootstrap';

const AboutScreen = () => {
  return (
    <Container>
      <h1>About Us</h1>
      <p>Our names:</p>
      <ul>
        <li>Yehuda Harush</li>
        <li>Liav Huli</li>
        <li>Matan Ofri</li>
        <li>Tamir Refael</li>
        <li>Sagi Lidani</li>
        <li>Yarden Itah</li>
      </ul>
      <p>Our web:</p>
      <p>
        A platform that connects vehicle enthusiasts and people interested in
        the automotive world. Users can share photos of vehicles, discuss
        repairs and upgrades, receive maintenance tips, and organize meetings
        and events in the automotive field. Any user will be able to post
        reviews on spare parts, recommend garages, and share travel
        experiences.
      </p>
    </Container>
  );
};

export default AboutScreen;
