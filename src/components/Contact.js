import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
// src="https://media-exp1.licdn.com/dms/image/C4D03AQH8QMpuoe4-eA/profile-displayphoto-shrink_800_800/0/1619055413769?e=1634169600&v=beta&t=paXw7R-GR7_K7vejvjSFEY9Xpd7S8RiuXHPto7_8_rE"
// src="https://media-exp1.licdn.com/dms/image/C4E03AQHrc43Yi3-Ieg/profile-displayphoto-shrink_800_800/0/1624500989518?e=1634169600&v=beta&t=fPxljv-38zi4KTNX335sdOD5zZ65lLL0TMyZ1S3A9xg"
const Contact = () => {
    return (
        <>
        <Container style={{
            padding:'30px'
        }}>
            <Row>
                <Col>
                <Card style={{ 
                    width: '24rem',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                    }}>
                        <Card.Img variant="top" src="https://media-exp1.licdn.com/dms/image/C5103AQEaZKFgGkelkA/profile-displayphoto-shrink_800_800/0/1517075767469?e=1634169600&v=beta&t=aXC88c4arZDCKc6Ru_hDf5QnZPGSIfiRJnEPJhVyqyA" />
                        <Card.Body>
                            <Card.Title style={{ borderBottom: '1px solid blue', color: '#344143', fontSize: '2rem'}}>
                                Andrea van Ginneken
                            </Card.Title>
                            <Card.Text style={{ color: '#344143', fontWeight: 'bold', fontStyle:'italic'}}>Lead Album Curator</Card.Text>
                            <Card.Text style={{ color: '#344143'}}><strong>Favorite Artist: </strong>Britney Spears</Card.Text>
                            <Row>
                                <Col>
                                    <Card.Link style={{marginLeft:'4rem'}} href="https://github.com/andreavanginneken" target="_blank">Github</Card.Link>
                                </Col>
                                <Col>
                                    <Card.Link style={{marginRight:'4rem'}} href="https://www.linkedin.com/in/andreavanginneken/" target="_blank">LinkedIn</Card.Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                <Card style={{ 
                    width: '24rem',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                    }}>
                        <Card.Img variant="top" src="https://media-exp1.licdn.com/dms/image/C4E03AQG4B6288kjQuA/profile-displayphoto-shrink_800_800/0/1565466614274?e=1634169600&v=beta&t=7gvnLwUxQHehQMlG2-sAVlmr3-pGxPeLwuqnhjsS-yI" />
                        <Card.Body>
                            <Card.Title style={{ borderBottom: '1px solid blue', color: '#344143', fontSize: '2rem'}}>Burk Manson</Card.Title>
                            <Card.Text style={{ color: '#344143', fontWeight: 'bold', fontStyle:'italic'}}>Creative Director</Card.Text>
                            <Card.Text style={{ color: '#344143'}}><strong>Favorite Artist: </strong>Britney Spears</Card.Text>
                            <Row>
                                <Col>
                                    <Card.Link style={{marginLeft:'4rem'}} href="https://github.com/burk96" target="_blank">Github</Card.Link>
                                </Col>
                                <Col>
                                    <Card.Link style={{marginRight:'4rem'}} href="https://www.linkedin.com/in/iamburk/" target="_blank">LinkedIn</Card.Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col>
                <Card style={{ 
                    width: '24rem',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                    }}>
                        <Card.Img variant="top" src="https://media-exp1.licdn.com/dms/image/C4D03AQH8QMpuoe4-eA/profile-displayphoto-shrink_800_800/0/1619055413769?e=1634169600&v=beta&t=paXw7R-GR7_K7vejvjSFEY9Xpd7S8RiuXHPto7_8_rE" />
                        <Card.Body>
                            <Card.Title style={{ borderBottom: '1px solid blue', color: '#344143', fontSize: '2rem'}}>
                                Esteban Ordonez
                            </Card.Title>
                            <Card.Text style={{ color: '#344143', fontWeight: 'bold', fontStyle:'italic'}}>Chief Financial Officer</Card.Text>
                            <Card.Text style={{ color: '#344143'}}><strong>Favorite Artist: </strong>Britney Spears</Card.Text>
                            <Row>
                                <Col>
                                    <Card.Link style={{marginLeft:'4rem'}} href="https://github.com/banchito" target="_blank">Github</Card.Link>
                                </Col>
                                <Col>
                                    <Card.Link style={{marginRight:'4rem'}} href="https://www.linkedin.com/in/banchito/" target="_blank">LinkedIn</Card.Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                <Card style={{ 
                    width: '24rem',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                    }}>
                        <Card.Img variant="top" src="https://media-exp1.licdn.com/dms/image/C4E03AQEOQ2X4OtvdXg/profile-displayphoto-shrink_800_800/0/1628647814181?e=1634169600&v=beta&t=xShqGpDm67FZyvY0ZZWa7Izheb6RpRz83RvMHRRGPEw" />
                        <Card.Body>
                            <Card.Title style={{ borderBottom: '1px solid blue', color: '#344143', fontSize: '2rem'}}>Graig Mantle</Card.Title>
                            <Card.Text style={{ color: '#344143', fontWeight: 'bold', fontStyle:'italic'}}>Bass Guitarist</Card.Text>
                            <Card.Text style={{ color: '#344143'}}><strong>Favorite Band: </strong>Metallica</Card.Text>
                            <Row>
                                <Col>
                                    <Card.Link style={{marginLeft:'4rem'}} href="https://github.com/rgmantle" target="_blank">Github</Card.Link>
                                </Col>
                                <Col>
                                    <Card.Link style={{marginRight:'4rem'}} href="https://www.linkedin.com/in/gmantle/" target="_blank">LinkedIn</Card.Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>           
        </>

    );
}

export default Contact